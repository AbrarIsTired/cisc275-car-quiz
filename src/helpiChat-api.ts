import OpenAI from 'openai';


const api_key = localStorage.getItem("MYKEY");

const helpiChat = new OpenAI({apiKey: api_key ?? ""});

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
    ],
    temperature: 0.5,
    
  });
  console.log(message);
  console.log(response.output_text)
  return response.output_text;
}