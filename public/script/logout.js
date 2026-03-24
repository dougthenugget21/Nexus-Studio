document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('first_name')
    window.location.replace('./login.html')
})