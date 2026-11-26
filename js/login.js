const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user)  {
        message.textContent = "Mauvais Identifiant";
        message.style.color = "red";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify({ email: user.email }));
    window.location.href = "../index.html";
});    

