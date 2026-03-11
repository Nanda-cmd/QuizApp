// quiz.js

let questions = []
let currentIndex = 0
let score = 0
let selectedAnswer = null
let timerInterval = null

// initialize quiz
async function initQuiz(){

const config = JSON.parse(localStorage.getItem("quizConfig"))

if(!config){
alert("Quiz configuration missing")
window.location="index.html"
return
}

try{

const data = await generateQuestions(
config.topic,
config.count,
config.difficulty
)

questions = data.questions

localStorage.setItem("lastTopic",config.topic)

startTimer(config.time * 60)

showQuestion()

}catch(err){

console.error(err)

alert("Failed to generate quiz")

}

}

// display question
function showQuestion(){

selectedAnswer = null

const questionObj = questions[currentIndex]

const questionDiv = document.getElementById("question")
const optionsDiv = document.getElementById("options")

questionDiv.innerText =
"Q"+(currentIndex+1)+": "+questionObj.question

optionsDiv.innerHTML = ""

questionObj.options.forEach(option=>{

const btn = document.createElement("button")

btn.innerText = option

btn.style.display="block"
btn.style.margin="10px 0"
btn.style.padding="10px"

btn.onclick=function(){

selectedAnswer = option

if(option === questionObj.correct){
score++
}

}

optionsDiv.appendChild(btn)

})

}

// next question
function nextQuestion(){

if(selectedAnswer === null){
alert("Please select an answer")
return
}

currentIndex++

if(currentIndex < questions.length){

showQuestion()

}else{

finishQuiz()

}

}

// timer
function startTimer(seconds){

let time = seconds

const timerDiv = document.getElementById("timer")

timerInterval = setInterval(()=>{

timerDiv.innerText = "Time: " + time + " sec"

time--

if(time < 0){

clearInterval(timerInterval)

finishQuiz()

}

},1000)

}

// finish quiz
function finishQuiz(){

clearInterval(timerInterval)

const topic = localStorage.getItem("lastTopic")

localStorage.setItem("lastScore",score)
localStorage.setItem("lastTotal",questions.length)

// send result to backend

fetch("http://localhost:5000/saveQuiz",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
topic:topic,
score:score,
total:questions.length
})

})
.then(res=>res.json())
.then(data=>{
console.log("Result saved:",data)
})
.catch(err=>{
console.log("Database save error:",err)
})

// go to result page
window.location="result.html"

}