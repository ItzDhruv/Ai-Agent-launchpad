
// src/utils/geminiApi.ts
export const callGemini = async (text: string): Promise<string> => {
    const apiKey = "AIzaSyC43-eU63b5zuI7ZsOrcJGoDtKMr2VzMjU"; // Replace with your real Gemini API key
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
  
    const payload = {
      contents: [
        {
          parts: [{ text }],
        },
      ],
    };
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    const data = await response.json();
  
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response from Gemini.";
  };
  