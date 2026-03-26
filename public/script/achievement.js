const div_achievement = document.getElementById("div-achievement");
const achievement_base_time = 80; //For Quick Thinker calculation
const on_fire_base_score = 80; //For On Fire calculation
const perfectionist_score = 95; //For Perfectionist score calculation
const que_per_quiz = 5;

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const student_id = localStorage.getItem("student_id");
        if (student_id) {
            getBySessionID(student_id);
            getLeaderBoardData();
            getDetailsByCategoryIDStudentID(student_id);
        }
});

//Achievements
async function getBySessionID(student_id) {
    try {
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/sessionhistory/student/${student_id}`)
        //const response = await fetch(`http://localhost:3000/sessionhistory/student/${student_id}`)
        const sessionhistory = await response.json();
        if (sessionhistory.error) {
            //console.log("error in getBySessionID")
            showNoDataMessage("No achievements yet. Keep trying!");
            return;
        }
        displayAchievements(sessionhistory)
    }
    catch(e) {

    }
}

function showNoDataMessage(message){
    console.log("showNoDataMessage" + message)
    div_achievement.innerHTML = `<div class="achievement_empty">
            <p>${message}</p>
        </div>`;
}

function convertTimeToSeconds(time) {
    let parts = time.split(":");
    let hours = Number(parts[0]);
    let minutes = Number(parts[1]);
    let seconds = Number(parts[2]);
    return (hours * 3600) + (minutes * 60) + seconds;
}

//display HTML
function displayAchievements(sess_history) {
    let result = calculateAchievements(sess_history);
    let output = "";
    console.log(result)
    if (result.quickThinker) {
        output = output + `<p class="mb-4 fw-lighter fs-3 pt-5 px-5">Quick Thinker 🧠</p>`;
    }

    if (result.onFire) {
        output += `<p class="mb-4 fw-lighter fs-3 px-5">On Fire 🔥</p>`;
    }

    if (result.perfectionist) {
        output += `<p class="mb-4 fw-lighter fs-3 px-5">Perfectionist 🎯</p>`;
    }

    if (!result.quickThinker && !result.onFire && !result.perfectionist) {
        output += `<p class="mb-4 pt-5 fw-lighter fs-3 px-5">No achievements yet. Keep trying!</p>`;
    }

    div_achievement.innerHTML = output;
}

// Calculate achievements
function calculateAchievements(sess_history) {

    let quickThinker = false;
    let onFire = false;
    let perfectionist = false;

    sess_history.sort(function(a, b) {
        return new Date(a.test_date) - new Date(b.test_date);
    });

    let latestQuiz = sess_history[sess_history.length - 1];

    //Quick Thinker
    if (sess_history.length >= 3) {

        let totalPreviousTime = 0;

        for (let i = 0; i < sess_history.length - 1; i++) {
            let time = sess_history[i].time_taken;
            let seconds = convertTimeToSeconds(time);
            totalPreviousTime = totalPreviousTime + seconds;
        }

        let averageTime = totalPreviousTime / (sess_history.length - 1);
        //console.log("average time:" + averageTime)

        let latestTime = convertTimeToSeconds(latestQuiz.time_taken);
        //console.log("latest time:" + latestTime)

        if (latestTime <= averageTime * (achievement_base_time/100)) {
            quickThinker = true;
        }
    }

    //On fire
    if (sess_history.length >= 3) {
        let count = 0;

        for (let i = sess_history.length - 3; i < sess_history.length; i++) {
            let score = Number(sess_history[i].score);

            if (score >= on_fire_base_score) {
                count = count + 1;
            }
        }

        if (count === 3) {
            onFire = true;
        }
    }

    //Perfectionist
    let totalScore = 0;
    for (let i = 0; i < sess_history.length; i++) {
        totalScore = totalScore + Number(sess_history[i].score);
    }

    let averageScore = totalScore / sess_history.length;

    if (averageScore >= perfectionist_score) {
        perfectionist = true;
    }

    return {
        quickThinker: quickThinker,
        onFire: onFire,
        perfectionist: perfectionist
    };
}

//Leaderboard
async function getLeaderBoardData() {
    try {
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/sessionhistory/leaderboard/score/`)
        //const response = await fetch(`http://localhost:3000/sessionhistory/leaderboard/score/`)
        const leaderboard_score = await response.json();
        //console.log(leaderboard_score)
        if (leaderboard_score.error) {
            showNoDataMessage("No student data available yet.");
            return;
        }
        //console.log(leaderboard_score)
        displayLeaderboard(leaderboard_score)
    }
    catch(e) {

    }
}

function displayLeaderboard(leaderboard_score) {
    let output = "";
    //console.log(leaderboard_score.length)
    output = output + `<p class="rounded-circle leaderboard-avatar text-center pt-4 fw-medium fst-italic leaderboard-profile"> ${leaderboard_score[0].first_name.charAt(0).toUpperCase()}${leaderboard_score[0].surname.charAt(0).toUpperCase()} <p>`;
    if (leaderboard_score.length > 1 ) {
        output = output + `<p class="rounded-circle leaderboard-avatar text-center pt-4 fw-medium fst-italic leaderboard-profile"> ${leaderboard_score[1].first_name.charAt(0).toUpperCase()}${leaderboard_score[1].surname.charAt(0).toUpperCase()} <p>`;
    }
    if (leaderboard_score.length > 2 ) {
        output = output + `<p class="rounded-circle leaderboard-avatar text-center pt-4 fw-medium fst-italic leaderboard-profile"> ${leaderboard_score[2].first_name.charAt(0).toUpperCase()}${leaderboard_score[2].surname.charAt(0).toUpperCase()} <p>`;
    }
    //console.log(output)
    div_leaderboard.innerHTML = output;
}

//Track your progress
async function getDetailsByCategoryIDStudentID(student_id) {
    //let category_id = 1;
    try {
        for (let i=1; i < 4; i++) {
            const response = await fetch(`https://nexus-studio-ipn8.onrender.com/sessionhistory/category?student_id=${student_id}&category_id=${i}`)
            //const response = await fetch(`http://localhost:3000/sessionhistory/category?student_id=${student_id}&category_id=${i}`)
            const sessionhistory = await response.json();
            if (sessionhistory.error) {
                //console.log(sessionhistory.error)
                if (i == 1) {
                    document.getElementById("div_categor1_score").innerText = "No progress yet. Keep trying!";
                }
                else if (i == 2) {
                    document.getElementById("div_categor2_score").innerText = "No progress yet. Keep trying!";
                }
                else { 
                    document.getElementById("div_categor3_score").innerText = "No progress yet. Keep trying!";
                }                
            } else {
                if (i == 1) {
                    document.getElementById("div_categor1_score").innerText = parseInt((que_per_quiz * sessionhistory.score) / 100) + " / " + que_per_quiz;
                }
                else if (i == 2) {
                    document.getElementById("div_categor2_score").innerText = parseInt((que_per_quiz * sessionhistory.score) / 100) + " / " + que_per_quiz;
                }
                else { 
                    document.getElementById("div_categor3_score").innerText = parseInt((que_per_quiz * sessionhistory.score) / 100) + " / " + que_per_quiz;
                }
            }
        }
    }
    catch(e) {

    }
}