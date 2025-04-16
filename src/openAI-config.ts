import OpenAI from 'openai';

/* 
CREATE A ".env" FILE IN YOUR ROOT DIRECTORY AND PUT 

    REACT_APP_OPENAI_API_KEY=sk-xxxxyourapikeyxxxxxxxxxxxxxxxxx

whatever our api key was in it (no quotation marks)
and then put ".env" somewhere in .gitignore to banish it to local forever
*/ 
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY ?? "";
const client = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true})


// Gets response from openAI
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

// WIP for when we want to handle errors for invalid user-inputed/localstorage API key 
async function getOpenAI_API(key: string): Promise<OpenAI | undefined>{
    let client;
    try {
        client = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});
        if (!client) {
        throw new Error("other error")
        }
    } catch (error: any) {
        // 401 error is invalid api key 
        console.error("invalid api key")
    }
    return client
}
