const API_KEY = 'AIzaSyCDUOMqOWmLLV2v7h_1yQfm9oNdIdrOHnU'

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const promp = prompt

  const result = await model.generateContent(promp);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default run;