const form = document.getElementById("form_login");
const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("email_error");
const passwordError = document.getElementById("password_error");

const ruleLength = document.getElementById("rule_length");
const ruleLetter = document.getElementById("rule_letter");
const ruleNumber = document.getElementById("rule_number");
const ruleSpecial = document.getElementById("rule_special");

email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);

const redirectPage = localStorage.getItem("redirectAfterLogin");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("https://nexus-studio-ipn8.onrender.com/studentdata/login", options);
    //const response = await fetch("http://localhost:3000/studentdata/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("surname", data.surname);
        localStorage.setItem("email", data.email);
        localStorage.setItem("student_id", data.student_id)
        //alert("Logged In")
        if (redirectPage) {
            localStorage.removeItem("redirectAfterLogin");
            window.location.href = redirectPage;
        } else {
            window.location.href = "homepage.html";
        }

      } else {
        alert(data.error);
      }
});

function validateEmail() {
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "Email is required";
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address";
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        return false;
    }

    emailError.textContent = "";
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    return true;
}

function validatePassword() {
    const passwordValue = password.value;

    if (passwordValue === "") {
        passwordError.textContent = "Password is required";
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
        return false;
    }

    passwordError.textContent = "";
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
    return true;
}

