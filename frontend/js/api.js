// frontend/js/api.js

const API_KEY = "AIzaSyCs-wWTmebFix3PPnnuK2w7QnmRWERfwRY"

async function generateQuestions(topic, count, difficulty){

const prompt = `
Generate ${count} multiple choice quiz questions about ${topic}.
Difficulty: ${difficulty}.

Return ONLY valid JSON like this:

{
"questions":[
{
"question":"...",
"options":["A","B","C","D"],
"correct":"A",
"explanation":"..."
}
]
}
`

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
{
method: "POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
contents:[
{
parts:[
{ text: prompt }
]
}
]
})
}
)

const data = await response.json()

console.log("Gemini response:", data)

// check API response
if(!data.candidates){
throw new Error("Gemini API returned invalid response")
}

let text = data.candidates[0].content.parts[0].text

// remove markdown formatting if Gemini adds it
text = text.replace(/```json/g,'')
text = text.replace(/```/g,'')

// extract JSON safely
const start = text.indexOf("{")
const end = text.lastIndexOf("}") + 1

const jsonString = text.substring(start,end)

const parsed = JSON.parse(jsonString)

return parsed

}catch(error){

console.error("Quiz generation failed:",error)

alert("Failed to generate quiz")

throw error

}

}