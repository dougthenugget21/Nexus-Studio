const div_leaderboard = document.getElementById("div_leaderboard");
getBySessionID();

async function getBySessionID() {
    try {
        const response = await fetch(`https://nexus-studio-ipn8.onrender.com/sessionhistory/leaderboard/score/`)
        //const response = await fetch(`http://localhost:3000/sessionhistory/leaderboard/score/`)
        const leaderboard_score = await response.json();
        //console.log(leaderboard_score)
        if (leaderboard_score.error) {
            showNoDataMessage("No student data available yet.");
            return;
        }

        console.log(leaderboard_score)
        displayLeaderboard(leaderboard_score)
    }
    catch(e) {

    }
}

function displayLeaderboard(leaderboard_score) {
    let output = "";
    output = output + `<p class="rounded-circle leaderboard-avatar" alt="leader 1"> ${leaderboard_score[0].first_name} ${leaderboard_score[0].surname} <p>`;
    if (leaderboard_score.length >= 1 ) {
        output = output + `<p class="rounded-circle leaderboard-avatar" alt="leader 2"> ${leaderboard_score[1].first_name} ${leaderboard_score[1].surname} <p>`;
    }
    if (leaderboard_score.length >= 2 ) {
        output = output + `<p class="rounded-circle leaderboard-avatar" alt="leader 3"> ${leaderboard_score[2].first_name} ${leaderboard_score[2].surname} <p>`;
    }
    //console.log(output)
    div_leaderboard.innerHTML = output;
}