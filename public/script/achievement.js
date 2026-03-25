const div_achievement = document.getElementById("div-achievement");
const achievement_base_score = 80; //For Quick Thinker calculation
const on_fire_base_score = 90; //For On Fire calculation
const perfectionist_score = 95; //For Perfectionist score calculation

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const student_id = localStorage.getItem("student_id");
        if (student_id) {
            console.log(student_id)
            getBySessionID(student_id);
        }
});

async function getBySessionID(student_id) {
    try {
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/sessionhistory/student/${student_id}`)
        //const response = await fetch(`http://localhost:3000/sessionhistory/student/${student_id}`)
        const sessionhistory = await response.json();
        //console.log(sessionhistory)
        if (sessionhistory.error) {
            showNoDataMessage("No achievements yet. Keep trying!");
            return;
        }
        displayAchievements(sessionhistory)
    }
    catch(e) {

    }
}

function showNoDataMessage(message){
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
        output = output + "<p>Quick Thinker 🧠</p>";
    }

    if (result.onFire) {
        output += "<p>On Fire 🔥</p>";
    }

    if (result.perfectionist) {
        output += "<p>Perfectionist 🎯</p>";
    }

    if (!result.quickThinker && !result.onFire && !result.perfectionist) {
        output += "<p>No achievements yet. Keep trying!</p>";
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

        if (latestTime <= averageTime * (achievement_base_score/100)) {
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