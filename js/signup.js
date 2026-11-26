const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("signup-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((u) => u.email === email);

    if (exists) {
        message.textContent = "Identifiants existant";
        message.style.color = "red";
        return;
    } else {
        users.push({ name: name, email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "./login.html";
    }
})