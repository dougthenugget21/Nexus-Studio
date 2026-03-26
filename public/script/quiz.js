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
//get images based on cat_id:
const quizImage = document.getElementById("quiz-category-image");

function setCategoryImage(category_id) {
    if (!quizImage) return;

    if (category_id === "1") {
        quizImage.src = "./img/volcano.webp";
        quizImage.alt = "Natural Hazards";
    } else if (category_id === "2") {
        quizImage.src = "./img/human-environment.webp";
        quizImage.alt = "Human Environments";
    } else if (category_id === "3") {
        quizImage.src = "./img/physical.jpg";
        quizImage.alt = "Physical Landscape";
    } else if (category_id === "4") {
        quizImage.src = "./img/random-cat.jpg";
        quizImage.alt = "Lucky Dip";
    } else {
        quizImage.src = "./img/world.png";
        quizImage.alt = "World";
    }
}

setCategoryImage(category_id);



if (category_id) {
    quizQuestionByCategoryFetch(category_id);
} else {
    allQuestionFetch();
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

    document.getElementById("nextButton").disabled = true
    document.getElementById("nextButton").style.backgroundColor = "rgba(255,255,255,0.35)"

    document.getElementById("question").innerText = currentQuestions[currentIndex].question
    document.getElementById("option_1").innerText = currentQuestions[currentIndex].option_1
    document.getElementById("option_2").innerText = currentQuestions[currentIndex].option_2
    document.getElementById("option_3").innerText = currentQuestions[currentIndex].option_3
    document.getElementById("option_4").innerText = currentQuestions[currentIndex].option_4    

    document.getElementById("option_1").addEventListener("click", () => answerSelect(1, currentCorrectAnswer))
    document.getElementById("option_2").addEventListener("click", () => answerSelect(2, currentCorrectAnswer))
    document.getElementById("option_3").addEventListener("click", () => answerSelect(3, currentCorrectAnswer))
    document.getElementById("option_4").addEventListener("click", () => answerSelect(4, currentCorrectAnswer))
}

function answerSelect(theirAns, correctAns) {

    if(theirAns === correctAns){
        document.getElementById(`option_${theirAns}`).style.backgroundColor = "lime"
        score++
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
    await console.log(randomQuestions);
    return randomQuestions
}

async function endSession(){
    alert (`Quiz Complete! Final Question Reached.`);
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    const date = new Date().toISOString()
    console.log(date);
    try{
        const response = await fetch("https://nexus-studio-ipn8.onrender.com/sessionhistory/", {
            method: "POST",
            body: {
                student_id: localStorage.getItem("student_id"),
                category_id: category_id,
                total_attempts: 1,
                score: (score*20),
                time_taken: Math.floor(timeTaken*0.001),
                test_date: date
            }})
        const data = response.json()
        console.log(data);
        return data
    }catch(err){
        console.log("Error", err);
    }

    //window.location.assign("homepage.html")
}