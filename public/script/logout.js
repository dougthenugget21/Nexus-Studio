const token = localStorage.getItem("token");
const loginlogout = document.getElementById('login-logout');
if (token) {
    loginlogout.innerText = "Sign Out"
    loginlogout.addEventListener('click', () => {
        localStorage.clear()
        window.location.replace('./index.html')
    })
}
else {
    loginlogout.innerText = "Sign In"
    loginlogout.addEventListener('click', () => {
        window.location.assign('./login.html')
    })

}
