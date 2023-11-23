import './App.css';
import { useAppStore } from './store';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { splitIntoSentences } from './utils/split-into-sentences';
import diff from 'fast-diff'

function App() {
  const {
    openAIAPIKey, setOpenAIAPIKey,
    letter, setLetter,
    incomingEmail, setIncomingEmail,
    responseTopics, setResponseTopics
  } = useAppStore();

  const [apiKeySubmitted, setApiKeySubmitted] = useState(false)
  const [originalSentences, setOriginalSentences] = useState<string[]>([])
  const [verifiedSentences, setVerifiedSentences] = useState<string[]>([])
  const [topicsVerification, setTopicsVerification] = useState<{[name: string]: { grade: number, comment: string}}>({})

  const openai = new OpenAI({
    apiKey: openAIAPIKey,
    dangerouslyAllowBrowser: true
  });

  const generateIncomingEmail = async () => {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: "user",
        content: `Forget everything that we've discussed before. We're starting from scratch.

        You're a teacher. You're teaching writing E-mails in German.

        Give me the 8-10 sentences informal E-mail and a list of 4 topics I should cover on in my response. E-mail and topics must be in German. Make sure the author of the emails asks 2 or 3 question to which I'll need to write answers. Make sure you're using a real human name for author and recepient names.

        Use the JSON format for email and topics like so:

        {
          "email: "",
          "topics": [""]
        }`
      }],
      model: 'gpt-3.5-turbo',
    });

    const responseMessage = chatCompletion.choices[0].message

    // TODO: retry in case the message isn't a JSON with email/topics fields
    return JSON.parse(responseMessage.content || "{}")
  }

  const highlightedOriginalSentence = (original: string, corrected: string): { __html: string } => {
    const sentenceDiff = diff(original, corrected);
    const sentence = sentenceDiff.filter(d => d[0] === 0 || d[0] === -1).map(d => {
      const className = d[1] !== "\n" && d[0] === -1 ? "bg-red-300 mistake-highlight" : ""
      return `<span class="${className}">${d[1].replace("\n", "<br>")}</span>`
    }).join("")

    return {
      __html: sentence
    }
  }

  const highlightedFixedSentence = (original: string, corrected: string): { __html: string } => {
    const sentenceDiff = diff(original, corrected);
    const sentence = sentenceDiff.filter(d => d[0] === 0 || d[0] === 1).map(d => {
      const className = d[0] === 1 ? "bg-red-300 mistake-highlight" : ""
      return `<span class="${className}">${d[1].replace("\n", "<br>")}</span>`
    }).join("")

    return {
      __html: sentence
    }
  }

  useEffect(() => {
    if(openAIAPIKey) {
      setApiKeySubmitted(true)

      if (!incomingEmail) {
        generateIncomingEmail().then(response => {
          setIncomingEmail(response.email)
          setResponseTopics(response.topics)
        })
      }
    }
  }, [])

  const handleApiKeySubmit = () => {
    setApiKeySubmitted(true)
  }

  const handleRestart = async () => {
    const result = window.confirm("Are you sure you want to clear your text?");

    if (result) {
      setLetter("")
      setOriginalSentences([])
      setVerifiedSentences([])
      setIncomingEmail("")
      setResponseTopics([])
      setTopicsVerification({})

      const { email, topics } = await generateIncomingEmail()

      setIncomingEmail(email)
      setResponseTopics(topics)
    }
  }

  const handleFormSubmit = async () => {
    if(!letter) {
      console.log("--> empty handleFormSubmit")
      return;
    }

    setOriginalSentences([])
    setVerifiedSentences([])
    setTopicsVerification({})

    setOriginalSentences(splitIntoSentences(letter))

    // Correct email

    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: 'user',
        content: `
          Fix German grammar in the following text. Respond only with corrected text. Keep original line break symbols. If a sentence in the submission is grammatically correct, leave it as is:

          ${letter}
        `
      }],
      model: 'gpt-3.5-turbo',
    });

    const responseMessage = chatCompletion.choices[0].message
    const fixedSentences = splitIntoSentences(responseMessage.content || "")

    setVerifiedSentences(fixedSentences)

    // Ask for topics

    const topicsChatCompletion = await openai.chat.completions.create({
      messages: [{
        role: 'user',
        content: `
        I have a German letter here between ''' symbols:

        '''${letter}'''


        Are the following topics directly covered in the letter: ${responseTopics.join(', ')}? Rate each topic on the following scale:

        0 – not covered at all.
        1 - the topic is briefly mentioned in the letter.
        2 - there're at least one sentence with 2 parts in the letter about the topic. There're also 1-2 not so complex sentences around the topic.

        Respond in the JSON format and comment on what could I have done better for each topic:

        {
          TOPIC: {
            grade: 0/1/2,
            comment: ""
          }
        }
      `
      }],
      model: 'gpt-3.5-turbo',
    });

    const topicsResponseMessage = topicsChatCompletion.choices[0].message
    setTopicsVerification(JSON.parse(topicsResponseMessage.content || "{}"))
  }

  const topicGradeBgColor = (grade: number | undefined): string => {
    let className = "py-1 px-3 rounded-xl "
    if (grade === 0) {
      className += "bg-red-300"
    } else if (grade === 1) {
      className += "bg-amber-300"
    } else if (grade === 2) {
      className += "bg-emerald-400"
    }

    return className
  }
  return (
    <div className="App py-24 px-12">
      {apiKeySubmitted && (
        <div>
          <button
            className="py-2 px-4 bg-indigo-500 text-white rounded-md fixed right-4 top-4"
            onClick={() => setApiKeySubmitted(false)}>Reset API token</button>
        </div>
      )}

      {!apiKeySubmitted && (
        <div>
          <input
            onChange={(e) => setOpenAIAPIKey(e.target.value) }
            type="text" />

          <button
            className="py-2 px-4 bg-indigo-500 text-white rounded-md"
            onClick={handleApiKeySubmit}>SUBMIT</button>
        </div>
      )}

      <div className='incoming-email mb-12'>
        { incomingEmail }
      </div>

      <div className='mb-12'>
        { responseTopics.map((topic, index) => {
          return (
            <div key={topic}>
              {index + 1}. { topic }
            </div>
          )
        }) }
      </div>

      <div className='mb-12'>
        <textarea
          className="p-4 text-base w-full border-2 border-indigo-500 radius-4 rounded-md	"
          value={letter}
          onChange={(e) => setLetter(e.target.value) }
          name="" id="" cols={30} rows={10}></textarea>

        <button
          className="py-2 px-4 bg-indigo-500 text-white rounded-md mr-4"
          onClick={handleFormSubmit}>SUBMIT</button>
        <button
          className="py-2 px-4 bg-indigo-500 text-white rounded-md"
          onClick={handleRestart}>RESTART</button>
      </div>

      { verifiedSentences.length > 0 && (
        <div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div><h3 className="text-left text-2xl">Original sentence</h3></div>
            <div><h3 className="text-left text-2xl">Corrected sentence</h3></div>
          </div>

          { verifiedSentences.map((verifiedSentence, index) => (
            <div
              key={`original-sentence-${originalSentences[index]}`}
              className='grid grid-cols-2 gap-4 mb-4'>
              <div
                className='text-left w-50'
                dangerouslySetInnerHTML={highlightedOriginalSentence(originalSentences[index], verifiedSentence)} ></div>

              <div>
                <div
                  className='text-left w-50 corrected-sentence'
                  dangerouslySetInnerHTML={highlightedFixedSentence(originalSentences[index], verifiedSentence)} ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      { Object.keys(topicsVerification).length > 0 && (
        <div
          className='grid grid-cols-2 gap-4 mb-4'>
          <div className="text-left">
            <h3 className="text-xl mb-4">
              Topics coverage
            </h3>

            <div>
              { Object.keys(topicsVerification).length > 0 && responseTopics.map((topic) => {
                return (
                  <div
                    className='mb-4'
                    key={topic}>
                    <strong className={topicGradeBgColor(topicsVerification[topic]?.grade)}>{ topic }</strong> { topicsVerification[topic]?.comment }
                  </div>
                )
              }) }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
