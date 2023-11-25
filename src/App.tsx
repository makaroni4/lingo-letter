import './App.css';
import { useAppStore } from './store';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { splitIntoSentences } from './utils/split-into-sentences';
import diff from 'fast-diff'
import Settings from "./components/Settings"
import Navbar from './components/Navbar';
import { generateIncomingEmail } from './utils/generate-incoming-email';
import { verifyEmailSubmission } from './utils/verify-email-submission';
import { verifyTopics } from './utils/verify-topics';
import { useTranslation } from "react-i18next";
import WelcomeBanner from './components/WelcomeBanner';
import GithubCorner from './components/GithubCorner';
import Footer from './components/Footer';

function App() {
  const { t } = useTranslation();

  const {
    openAIAPIKey,
    letter, setLetter,
    incomingEmail, setIncomingEmail,
    responseTopics, setResponseTopics,
    settingsVisible,
    originalSentences, setOriginalSentences,
    verifiedSentences, setVerifiedSentences,
    topicsVerification, setTopicsVerification,
    userLanguage,
    emailLanguage,
    showWelcomeBanner
  } = useAppStore();

  let openai: any;

  if (openAIAPIKey) {
    openai = new OpenAI({
      apiKey: openAIAPIKey,
      dangerouslyAllowBrowser: true
    });
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
    if(openAIAPIKey && !incomingEmail) {
      generateIncomingEmail({
        apiKey: openAIAPIKey,
        emailLanguage: t(`languages.${emailLanguage}`)
      }).then(response => {
        setIncomingEmail(response.email)
        setResponseTopics(response.topics)
      })
    }
  }, [])

  const handleFormSubmit = async () => {
    if(!letter) {
      console.log("--> empty handleFormSubmit")
      return;
    }

    setOriginalSentences([])
    setVerifiedSentences([])
    setTopicsVerification({})

    setOriginalSentences(splitIntoSentences(letter))

    verifyEmailSubmission({
      apiKey: openAIAPIKey,
      letter,
      emailLanguage: t(`languages.${emailLanguage}`)
    }).then(verifiedEmail => {
      const fixedSentences = splitIntoSentences(verifiedEmail)
      setVerifiedSentences(fixedSentences)
    })

    verifyTopics({
      apiKey: openAIAPIKey,
      topics: responseTopics,
      letter,
      emailLanguage: t(`languages.${emailLanguage}`)
    }).then(verifiedTopics => {
      setTopicsVerification(verifiedTopics);
    })
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
    <div className="App">
      <GithubCorner />

      { settingsVisible && (
        <Settings />
      )}

      <Navbar />

      <div className="pb-24 px-12">
        { showWelcomeBanner && (
          <div className="mb-12">
            <WelcomeBanner />
          </div>
        ) }

        <div className='mb-12'>
          <h2 className="text-2xl font-bold mb-3">{ t("writing_test") }</h2>

          <div className="mb-4">
            { t("you_have_received_an_email") }
          </div>

          <div className="p-8 leading-8 bg-slate-100 incoming-email mb-8">
            { incomingEmail }
          </div>

          <div className="mb-5">
            { t("answer_the_email_and_cover_topics") }
          </div>

          <div className='mb-10'>
            <ul className='list-disc'>
              { responseTopics.map((topic) => {
                return (
                  <li
                    className="mb-4 last:mb-0"
                    key={topic}>
                    { topic }
                  </li>
                )
              }) }
            </ul>
          </div>

          <div>
            { t("writing_instructions") }
          </div>
        </div>


        <div className='mb-12'>
          <textarea
            className="p-4 text-base w-full border-2 border-indigo-500 radius-4 rounded-md	"
            value={letter}
            onChange={(e) => setLetter(e.target.value) }
            name="" id="" cols={30} rows={10}></textarea>

          <div className='flex justify-end'>
            <button
              className="py-2 px-4 bg-indigo-500 text-white rounded-md"
              onClick={handleFormSubmit}>{ t("submit") }</button>
          </div>
        </div>

        { verifiedSentences.length > 0 && (
          <div className="mb-16">
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div><h3 className="text-left text-2xl">{ t("original_sentences") }</h3></div>
              <div><h3 className="text-left text-2xl">{ t("fixed_sentences") }</h3></div>
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
            <div>

            </div>
            <div className="text-left">
              <h2 className="text-2xl mb-6">
                Your coverage of topics
              </h2>

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

      <Footer />
    </div>
  );
}

export default App;
