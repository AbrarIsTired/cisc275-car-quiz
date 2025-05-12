import OpenAI from 'openai';

export async function callOpenAI_API(message: string, instructions?: string) {
    if (!instructions) {
      instructions = "Find the ideal career for the user based on a summary of their preferences and skills."
    }
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
                        Do not restate the user's reponses.
                        Start your response with a ## header of the Top Career, followed by a list of 
                        - Career Description (include a summary of the user's responses and describe why the career fits)
                        - Projected salary range (include the expected demand)
                        - Required education level (include the majors that would be a good fit for the career)
                        - Required skillsets (include a list of soft skills and hard skills)`
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
