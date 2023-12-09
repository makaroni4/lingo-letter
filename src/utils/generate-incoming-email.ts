import OpenAI from "openai"

const MAX_RETRIES = 3

const makeAPICall = async ({
  apiKey,
  emailLanguage
}: {
  apiKey: string | undefined
  emailLanguage: string
}) => {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Forget everything that we've discussed before. We're starting from scratch.

      You're a teacher. You're teaching writing E-mails in ${emailLanguage}.

      Give me the 8-10 sentences informal E-mail on one of the following topics: Vacation Plans, Birthday Invitation, Movie Night, Book Recommendation, Leisure Activities, Language Learning Progress, Music Recommendations, Weekend Plans, Hobby, Job Application or a relevant topic of your choice.

      Also create a list of 4 topics I should cover on in my response. E-mail and topics must be in ${emailLanguage}. Make sure the author of the emails asks 2 or 3 question to which I'll need to write answers. Make sure you're using a real human name for author and recepient names. Format the letter nicely using line breaks. Add 2-3 relevant emojies throughout the text.

      Use the JSON format for email and topics like so:

      {
        "email: "",
        "topics": [""]
      }`
      }
    ],
    model: "gpt-3.5-turbo"
  })

  const responseMessage = chatCompletion.choices[0].message

  return JSON.parse(responseMessage.content || "{}")
}

async function callWithRetries(
  apiCallFunc: ({
    apiKey,
    emailLanguage
  }: {
    apiKey: string | undefined
    emailLanguage: string
  }) => Promise<any>,
  apiKey: string,
  emailLanguage: string
): Promise<any> {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      const emailContent = await apiCallFunc({ apiKey, emailLanguage })

      return emailContent
    } catch (error) {
      console.error("--> ")
      retries++
      console.log(`Retrying... (Attempt ${retries} of ${MAX_RETRIES})`)
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} attempts`)
}

export const generateIncomingEmail = async ({
  apiKey,
  emailLanguage
}: {
  apiKey: string
  emailLanguage: string
}) => {
  const emailContent = await callWithRetries(makeAPICall, apiKey, emailLanguage)

  return emailContent
}
