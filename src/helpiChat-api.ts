import OpenAI from 'openai';

const helpiChat = new OpenAI();

// const response = await helpiChat.responses.create({
//   model: "gpt-4o",
//   input: [
//     {role: "user", 
//     content: "i like to draw!!!!"
//     }, {
//       role: "developer",
//       content: "Find the ideal career for the user based on their responses, and provide information on their career."
//     }
//   ]
// });
// console.log(response.output_text)

export async function getResponse(message: string): Promise<string> {
  const response = await helpiChat.responses.create({
    model: "gpt-4o",
    input: [
      {role: "user", 
      content: message
      }, {
        role: "system",
        content: "Find the ideal career for the user based on their responses, and provide information on their career."
      }
    ]
  });
  console.log(message);
  console.log(response.output_text)
  return response.output_text;
}