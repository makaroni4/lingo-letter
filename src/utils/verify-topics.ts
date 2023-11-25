import OpenAI from 'openai';

export const verifyTopics = async ({ apiKey, letter, topics, emailLanguage }: { apiKey: string | undefined, letter: string, topics: string[], emailLanguage: string }) => {
  if (!apiKey) {
    alert("Please, set Open AI API key")
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  const topicsChatCompletion = await openai.chat.completions.create({
    messages: [{
      role: 'user',
      content: `
      I have a ${emailLanguage} letter here between ''' symbols:

      '''${letter}'''


      Are the following topics directly covered in the letter: ${topics.join(', ')}? Rate each topic on the following scale:

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

  return JSON.parse(topicsResponseMessage.content || "{}")
}
