import OpenAI from 'openai';

export async function callOpenAI_API(message: string) {
    const apiKey = localStorage.getItem("MYKEY");
    if(!apiKey){
        return "API Key is Missing or Invalid. Add an API Key from OpenAI's Secret Key section";
    }
    try {
        // Create OpenAI client inline
        const client = new OpenAI({
          apiKey: JSON.parse(apiKey),
          dangerouslyAllowBrowser: true
        });
        
        // Make the API call
        const response = await client.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user", 
              content: message
            }, 
            {
              role: "system",
              content: `Find the ideal career for the user based on a summary of their preferences and skills. 
                Then, provide detailed information for this career, including salary, demand, required skillsets, and related fields.`
            }
          ],
          temperature: 0.5,
        }); 
        return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("OpenAI API call failed:", error);
    return "Failed to get career recommendations. Please check your API key and try again.";
  }

}
/*
export async function callOpenAI_API(message: string) {
    const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{
            role: "user", 
            content: message
        }, {
            role: "system",
            content: `Find the ideal career for the user based on a summary of their preferences and skills. 
                Then, provide detailed information for this career, including salary, demand, required skillsets, and related fields.`
        }],
        temperature: 0.5,
    
    }); 
    const reply = response.choices[0]?.message?.content
    console.log(response.choices[0]?.message?.content);
    return reply;
}
*/
