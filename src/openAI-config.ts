import OpenAI from 'openai';

export async function callOpenAI_API(message: string) {
    const apiKey = localStorage.getItem("MYKEY");
    if(!apiKey){
        return "API Key is Missing or Invalid. Add an API Key from OpenAI's Secret Key section";
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
