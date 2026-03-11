function startVoiceInput(){

const recognition = new webkitSpeechRecognition()

recognition.lang="en-US"

recognition.onresult=function(event){

const text=event.results[0][0].transcript

document.getElementById("voiceAnswer").innerText=text

}

recognition.start()

}