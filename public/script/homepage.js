

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
    } else {
        profileName.textContent = "Hi!";
    }
});