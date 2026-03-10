const express=require("express")
const cors=require("cors")
const mysql=require("mysql2")

const app=express()

app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
host:"localhost",
user:"root",
password:"nanda",
database:"quizapp"
})

app.post("/saveQuiz",(req,res)=>{

const {topic,score,total}=req.body

db.query(
"INSERT INTO quiz_attempts(topic,score,total) VALUES (?,?,?)",
[topic,score,total],
(err,result)=>{
if(err) throw err
res.json({status:"saved"})
}
)

})

app.get("/history",(req,res)=>{

db.query("SELECT * FROM quiz_attempts",(err,result)=>{
if(err) throw err
res.json(result)
})

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})