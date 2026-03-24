
const progress_section = document.getElementById("progress");
const achievements_section = document.getElementById("achievements");
const href_achievements = document.getElementById("href_achievements");
const href_leaderboard = document.getElementById("href_leaderboard")

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Not logged in, so to redirect
        /*window.location.replace("login.html");*/
        //return;
    }
    const firstName = localStorage.getItem("first_name");

    const profileName = document.getElementById("profile_username");

    if (firstName) {
        profileName.textContent = `Hi, ${firstName}!`;
        progress_section.style.display='block';
        achievements_section.style.display='block';
        href_achievements.style.display='block';
        href_leaderboard.style.display='block';
    } else {
        profileName.textContent = "Account";
        progress_section.style.display='none';
        achievements_section.style.display='none';
        href_achievements.style.display='none';
        href_leaderboard.style.display='none';
    }


});