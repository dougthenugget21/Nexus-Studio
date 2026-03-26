let currentQuestions = [];
let currentIndex = 0;
let currentCorrectAnswer
let answered

const params = new URLSearchParams(window.location.search);
const category_id = params.get("category");


if (category_id) {
    quizQuestionByCategoryFetch(category_id);
} else {
    allQuestionFetch();
}

// Function to fetch quiz questions by category from api 
async function quizQuestionByCategoryFetch(category_id){
    try{
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizQuestions/category/${category_id}`)
        const questionArray = await response.json()
        currentQuestions = questionArray

        puttingQuestionsOnThePage(questionArray, currentIndex)
    } catch(err){
        console.log("Error fetching questions: ", err);
    }
}

function puttingQuestionsOnThePage(currentQuestions, currentIndex){
    let currentCorrectAnswer = currentQuestions[currentIndex].answer

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

function answerSelect(theirAns, correctAns){
    console.log("current correct ans is", correctAns);
    console.log("User anser is", theirAns);

    if(theirAns === correctAns){
        console.log("Correct!");
    } else {
        console.log("Incorrect!");
    }

    document.getElementById("option_1").removeEventListener("click", () => answerSelect())
    document.getElementById("option_2").removeEventListener("click", () => answerSelect())
    document.getElementById("option_3").removeEventListener("click", () => answerSelect())
    document.getElementById("option_4").removeEventListener("click", () => answerSelect())

}



// Next button handler
document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++
        puttingQuestionsOnThePage(currentQuestions, currentIndex)
    } else {
        alert (`Quiz Complete! Final Question Reached.`);
        window.location.assign("homepage.html")
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