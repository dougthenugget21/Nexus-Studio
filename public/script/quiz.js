let currentQuestions = [];
let currentIndex = 0;
let currentCorrectAnswer
let score = 0
const startTime = performance.now()

const params = new URLSearchParams(window.location.search);
const category_id = params.get("category");

quizQuestionByCategoryFetch(category_id);
if (category_id == 1) {
    document.getElementById("div_Category_name").innerText = "Natural Hazards 🌋"
}
else if (category_id == 2) {
    document.getElementById("div_Category_name").innerText = "Human Environments 👣"
}
else if(category_id ==3) {
    document.getElementById("div_Category_name").innerText = "Physical Landscape 🪨"
}
else {
    document.getElementById("div_Category_name").innerText = "Lucky Dip 🔄"
}
// Function to fetch quiz questions by category from api 
async function quizQuestionByCategoryFetch(category_id){
    try{
        let response = '';
        let questionArray = [];
        if (category_id < 4 ) {
            response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizQuestions/category/${category_id}`)
            questionArray = await response.json()
        }
        else {
            //response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizquestions/`)
            questionArray = await randomQuestions()
            console.log(questionArray)
        } 
        currentQuestions = questionArray;
        puttingQuestionsOnThePage(questionArray, currentIndex)
    } catch(err){
        console.log("Error fetching questions: ", err);
    }
}

function puttingQuestionsOnThePage(currentQuestions, currentIndex){
    let currentCorrectAnswer = currentQuestions[currentIndex].answer
    //console.log(currentCorrectAnswer)
    document.getElementById("nextButton").disabled = true
    document.getElementById("nextButton").style.backgroundColor = "rgba(255,255,255,0.35)"

    document.getElementById("question").innerText = currentQuestions[currentIndex].question
    document.getElementById("option_1").innerText = currentQuestions[currentIndex].option_1
    document.getElementById("option_2").innerText = currentQuestions[currentIndex].option_2
    document.getElementById("option_3").innerText = currentQuestions[currentIndex].option_3
    document.getElementById("option_4").innerText = currentQuestions[currentIndex].option_4    

    document.getElementById("option_1").onclick = () => answerSelect(1, currentCorrectAnswer)
    document.getElementById("option_2").onclick = () => answerSelect(2, currentCorrectAnswer)
    document.getElementById("option_3").onclick = () => answerSelect(3, currentCorrectAnswer)
    document.getElementById("option_4").onclick = () => answerSelect(4, currentCorrectAnswer)
}

function answerSelect(theirAns, correctAns){

    if(Number(theirAns) === Number(correctAns)){
        document.getElementById(`option_${theirAns}`).style.backgroundColor = "lime"
        score++;
        //console.log(score)
    } else {
        document.getElementById(`option_${theirAns}`).style.backgroundColor = "red"
    }

    document.getElementById("option_1").disabled = true
    document.getElementById("option_2").disabled = true
    document.getElementById("option_3").disabled = true
    document.getElementById("option_4").disabled = true

    document.getElementById("nextButton").disabled = false
    document.getElementById("nextButton").style.backgroundColor = "#4c1d95"
}



// Next button handler
document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++
        puttingQuestionsOnThePage(currentQuestions, currentIndex)
        
        document.getElementById("option_1").disabled = false
        document.getElementById("option_2").disabled = false
        document.getElementById("option_3").disabled = false
        document.getElementById("option_4").disabled = false

        document.getElementById("option_1").style.backgroundColor = "rgba(255,255,255,0.35)"
        document.getElementById("option_2").style.backgroundColor = "rgba(255,255,255,0.35)"
        document.getElementById("option_3").style.backgroundColor = "rgba(255,255,255,0.35)"
        document.getElementById("option_4").style.backgroundColor = "rgba(255,255,255,0.35)"
    } else {
        endSession()
    }
});



// Function to fetch 5 random quiz questions
async function allQuestionFetch(){
    try{
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizquestions/`)
        const questionArray = await response.json()
        return questionArray
    } catch(err){
        console.log("Error fetching questions: ", err);
    }
}

async function randomQuestions(){
    const questionArray = await allQuestionFetch()
    const randomQuestions = []
    for (let i = 0; i < 5; i++){
        let index = Math.floor(Math.random()*questionArray.length)
        randomQuestions.push(questionArray[index])
        questionArray.splice(index, 1)
    }
    //await console.log(randomQuestions);
    return randomQuestions
}

async function endSession(){
    //alert (`Quiz Complete! Final Question Reached.`);
    document.getElementById("resultPopup").style.display = "flex";
    document.getElementById("finalScore").innerText = `Your Score: ${score} / ${currentQuestions.length}`;
    const endTime = performance.now()
    const duration = endTime - startTime;
    let seconds = Math.floor(duration / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    const timeTaken =  (hours < 10 ? "0" + hours : hours) + ":" +
           (minutes < 10 ? "0" + minutes : minutes) + ":" +
           (seconds < 10 ? "0" + seconds : seconds);

    const date = new Date().toISOString()

    try{
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_id: localStorage.getItem("student_id"),
                category_id: category_id,
                total_attempts: 1,
                score: (100 * score) / 5,
                time_taken: timeTaken,
                test_date: date
            })
        };
        const response = await fetch("https://nexus-studio-ipn8.onrender.com/sessionhistory/create", options)
        //const response = await fetch("http://localhost:3000/sessionhistory/create", options)
        const data = await response.json()
        return data
    }catch(err){
        console.log("Error", err);
    }

    //window.location.assign("homepage.html")
}

document.getElementById("okBtn").addEventListener("click", () => {
    window.location.assign("homepage.html");
});