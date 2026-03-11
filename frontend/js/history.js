async function loadHistory(){

const res = await fetch("http://localhost:5000/history")

const data = await res.json()

const container=document.getElementById("history")

data.forEach(item=>{

const div=document.createElement("div")

div.innerHTML=
"Topic: "+item.topic+
" | Score: "+item.score+"/"+item.total+
" | Date: "+item.date

container.appendChild(div)

})

}