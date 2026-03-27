const form = document.getElementById("form_signup");

const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");

const firstNameError = document.getElementById("firstName_error");
const lastNameError = document.getElementById("lastName_error");
const emailError = document.getElementById("email_error");
const passwordError = document.getElementById("password_error");
const confirmPasswordError = document.getElementById("confirmPassword_error");

const ruleLength = document.getElementById("rule_length");
const ruleLetter = document.getElementById("rule_letter");
const ruleNumber = document.getElementById("rule_number");
const ruleSpecial = document.getElementById("rule_special");

firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", () => {
    validatePassword();
    validateConfirmPassword();
});

confirmPassword.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
        !isFirstNameValid ||
        !isLastNameValid ||
        !isEmailValid ||
        !isPasswordValid ||
        !isConfirmPasswordValid
    ) {
        return;
    }

    const formData = new FormData(form);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: formData.get("first_name"),
            surname: formData.get("last_name"),
            email: formData.get("email"),
            password: formData.get("password")
        })
    };

    try {
        //const response = await fetch("http://localhost:3000/studentdata/create", options);
        const response = await fetch("https://nexus-studio-ipn8.onrender.com/studentdata/create", options);
        const data = await response.json();
        if (response.status === 201 || response.status === 200) {
            //alert("Signup successful");
            localStorage.setItem("token", data.token);
            localStorage.setItem("first_name", data.first_name);
            localStorage.setItem("surname", data.surname);
            localStorage.setItem("email", data.email);
            localStorage.setItem("student_id", data.student_id)
            window.location.assign("index.html");
        } else {
            alert(data.error || "Signup failed");
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.log(error);
    }
});


function setValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function setInvalid(input) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
}

function validateFirstName() {
    const value = firstName.value.trim();

    if (value === "") {
        firstNameError.textContent = "First name is required";
        setInvalid(firstName);
        return false;
    }

    if (value.length < 2) {
        firstNameError.textContent = "First name must be at least 2 characters";
        setInvalid(firstName);
        return false;
    }

    firstNameError.textContent = "";
    setValid(firstName);
    return true;
}

function validateLastName() {
    const value = lastName.value.trim();

    if (value === "") {
        lastNameError.textContent = "Last name is required";
        setInvalid(lastName);
        return false;
    }

    if (value.length < 2) {
        lastNameError.textContent = "Last name must be at least 2 characters";
        setInvalid(lastName);
        return false;
    }

    lastNameError.textContent = "";
    setValid(lastName);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        emailError.textContent = "Email is required";
        setInvalid(email);
        return false;
    }

    if (!emailPattern.test(value)) {
        emailError.textContent = "Please enter a valid email address";
        setInvalid(email);
        return false;
    }

    emailError.textContent = "";
    setValid(email);
    return true;
}

function updateRule(element, isValid) {
    if (isValid) {
        element.classList.add("valid-rule");
        element.classList.remove("invalid-rule");
    } else {
        element.classList.add("invalid-rule");
        element.classList.remove("valid-rule");
    }
}

function validatePassword() {
    const value = password.value;

    const hasLength = value.length >= 8;
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    updateRule(ruleLength, hasLength);
    updateRule(ruleLetter, hasLetter);
    updateRule(ruleNumber, hasNumber);
    updateRule(ruleSpecial, hasSpecial);

    if (value === "") {
        passwordError.textContent = "Password is required";
        setInvalid(password);
        return false;
    }

    if (!(hasLength && hasLetter && hasNumber && hasSpecial)) {
        passwordError.textContent = "Password does not meet the required criteria";
        setInvalid(password);
        return false;
    }

    passwordError.textContent = "";
    setValid(password);
    return true;
}

function validateConfirmPassword() {
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    if (confirmValue === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        setInvalid(confirmPassword);
        return false;
    }

    if (passwordValue !== confirmValue) {
        confirmPasswordError.textContent = "Passwords do not match";
        setInvalid(confirmPassword);
        return false;
    }

    confirmPasswordError.textContent = "";
    setValid(confirmPassword);
    return true;
}