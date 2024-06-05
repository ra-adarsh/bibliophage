import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function generateQuestions(textInput) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = 
    `${textInput} With reference to above text generate 10 MCQ questions with 4 options and 
    one correct answer, and return it as an array of JavaScript objects where each 
    question has an "id" having unique id, "questionText" of string type which contains 
    questions, and an array of option objects, where each option object contains 
    "optionText" which contains the option and a boolean key "isCorrect" which will 
    be set to true if the option is correct else set to false. And remember to put keys also
    in double quotes, and return only the array in square brackets and no other text.`
    const result = await model.generateContent(prompt);
    const response = await result.response;

    let text = response.text();
    if (text.startsWith("```")) {
        text = text.split("```")[1];
    }

    if (text.startsWith("javascript")) {
        text = text.split("javascript")[1];
    }
    
    const questionArray = JSON.parse(text);

    return questionArray;
}