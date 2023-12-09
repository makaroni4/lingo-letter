import OpenAI from "openai"

export const verifyEmailSubmission = async ({
  apiKey,
  letter,
  emailLanguage
}: {
  apiKey: string | undefined
  letter: string
  emailLanguage: string
}) => {
  if (!apiKey) {
    alert("Please, set Open AI API key")
    return
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  })

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        Fix ${emailLanguage} grammar in the following text. Respond only with corrected text. Keep original line break symbols. If a sentence in the submission is grammatically correct, leave it as is:

        ${letter}
      `
      }
    ],
    model: "gpt-3.5-turbo"
  })

  const responseMessage = chatCompletion.choices[0].message

  return responseMessage.content || ""
}
