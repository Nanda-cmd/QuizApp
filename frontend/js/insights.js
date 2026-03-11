async function generateInsights(topic,score,total){

const API_KEY="YOUR_GEMINI_API_KEY"

const prompt=`
Student scored ${score}/${total} in ${topic}.
Suggest topics they should revise based on incorrect answers.
`

const response=await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="+API_KEY,
{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
contents:[{parts:[{text:prompt}]}]
})
}
)

const data=await response.json()

const insight=data.candidates[0].content.parts[0].text

document.getElementById("insights").innerText=insight

}