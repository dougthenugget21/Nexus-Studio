const params = new URLSearchParams(window.location.search);
const category_id = params.get("category");
quizQuestionByCategoryFetch(category_id);

if (category_id) {
    quizQuestionByCategoryFetch(category_id);
} else {
    allQuestionFetch();
}


/*const cat_2 = document.getElementById("cat_2");
cat_2.addEventListener("click", quizQuestionByCategoryFetch(2))

const cat_3 = document.getElementById("cat_3");
cat_3.addEventListener("click", quizQuestionByCategoryFetch(3))

const cat_4 = document.getElementById("cat_4");
cat_4.addEventListener("click", allQuestionFetch(4))*/

// Function to fetch quiz questions by category from api 
async function quizQuestionByCategoryFetch(category_id){
    try{
        console.log("hi");
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizQuestions/category/:${category_id}`)
        const questionArray = await response.json()
        document.getElementById("question").innerText = questionArray[0].question
        document.getElementById("option_1").innerText = questionArray[0].option_1
        document.getElementById("option_2").innerText = questionArray[0].option_2
        document.getElementById("option_3").innerText = questionArray[0].option_3
        document.getElementById("option_4").innerText = questionArray[0].option_4
        const correct_answer = questionArray[0].answer; 1, 2, 3, 4
        return questionArray
    } catch(err){
        console.log("Error fetching questions: ", err);
    }
}

// Function to fetch 5 random quiz questions
async function allQuestionFetch(){
    try{
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizquestions/`)
        const questionArry = await response.json()
        return questionArry
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
console.log( randomQuestions() )
console.log(quizQuestionByCategoryFetch(1));