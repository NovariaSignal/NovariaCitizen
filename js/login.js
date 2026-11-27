import { loadUsers, saveCurrentUser } from "./users.js";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const users = loadUsers();

    const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);
    if (!user)  {
        message.textContent = "Mauvais Identifiant";
        message.style.color = "red";
        return;
    }

    saveCurrentUser(user);
    window.location.href = "../index.html";
});    

