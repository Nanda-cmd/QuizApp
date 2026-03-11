async function loadDashboard(){

const res = await fetch("http://localhost:5000/history")

const data = await res.json()

let totalScore=0
let totalQuestions=0

data.forEach(q=>{
totalScore+=q.score
totalQuestions+=q.total
})

let accuracy=0

if(totalQuestions>0){
accuracy=Math.round((totalScore/totalQuestions)*100)
}

document.getElementById("attempts").innerText=data.length
document.getElementById("avgScore").innerText=accuracy+"%"

}