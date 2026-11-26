const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("signup-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    // "required" accepts a name made only of spaces, so check after trimming
    if (!name) {
        message.textContent = "Veuillez saisir votre nom.";
        message.style.color = "red";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // lowercase the saved email too, for accounts created before this fix
    const exists = users.some((u) => u.email.toLowerCase() === email);

    if (exists) {
        message.textContent = "Identifiants existant";
        message.style.color = "red";
        return;
    } else {
        users.push({ name: name, email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));


        localStorage.setItem("currentUser", JSON.stringify({ name: name, email: email }));
        window.location.href = "../index.html"; 
    }
})