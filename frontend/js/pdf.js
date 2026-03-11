function exportQuizPDF(questions, answers, includeAnswers){

const { jsPDF } = window.jspdf
const doc = new jsPDF()

let y = 10

questions.forEach((q,i)=>{

doc.text((i+1)+". "+q.question,10,y)
y+=10

q.options.forEach(opt=>{
doc.text("- "+opt,15,y)
y+=8
})

if(includeAnswers){

doc.text("Correct: "+q.correct,15,y)
y+=8

doc.text("Explanation: "+q.explanation,15,y)
y+=10

}

y+=5

})

doc.save("quiz.pdf")

}