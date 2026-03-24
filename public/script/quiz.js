// Function to fetch quiz questions by category from api 
async function quizQuestionByCategoryFetch(category_id){
    try{
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/quizquestions/categories/:${category_id}`)
        const questionArray = await response.json()
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