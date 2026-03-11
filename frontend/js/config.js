function startQuiz(){

const topic=document.getElementById("topic").value
const count=document.getElementById("count").value
const difficulty=document.getElementById("difficulty").value
const time=document.getElementById("time").value

const config={
topic,
count,
difficulty,
time
}

localStorage.setItem("quizConfig",JSON.stringify(config))

window.location="quiz.html"

}