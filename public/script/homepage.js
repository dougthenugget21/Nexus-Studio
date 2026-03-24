
const progress_section = document.getElementById("progress");
const achievements_section = document.getElementById("achievements");

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
    } else {
        profileName.textContent = "Account";
        progress_section.style.display='none';
        achievements_section.style.display='none';
    }


});