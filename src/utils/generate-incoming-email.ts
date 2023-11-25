import OpenAI from 'openai';

export const generateIncomingEmail = async ({ apiKey, emailLanguage }: { apiKey: string | undefined, emailLanguage: string }) => {
  if (!apiKey) {
    alert("Please, set Open AI API key")
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{
      role: "user",
      content: `Forget everything that we've discussed before. We're starting from scratch.

      You're a teacher. You're teaching writing E-mails in ${emailLanguage}.

      Give me the 8-10 sentences informal E-mail and a list of 4 topics I should cover on in my response. E-mail and topics must be in ${emailLanguage}. Make sure the author of the emails asks 2 or 3 question to which I'll need to write answers. Make sure you're using a real human name for author and recepient names.

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
