import { loadUsers, saveUsers, saveCurrentUser } from "./users.js";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = loadUsers();

// match on the id; a session opened before ids existed only has the email
const user = users.find((u) =>
    currentUser?.id ? u.id === currentUser.id : u.email.toLowerCase() === currentUser?.email?.toLowerCase()
);

if (!user) {
    // not logged in, or the account no longer exists
    localStorage.removeItem("currentUser");
    window.location.replace("login.html");
} else {
    saveCurrentUser(user);

    const form = document.getElementById("edit-profile-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("edit-profile-message");

    nameInput.value = user.name;
    emailInput.value = user.email;

    const showError = (text) => {
        message.textContent = text;
        message.style.color = "red";
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // "required" accepts a name made only of spaces, so check after trimming
        if (!name) {
            showError("Veuillez saisir votre nom.");
            return;
        }

        // the email is the login, so no other account may use it
        if (users.some((u) => u.id !== user.id && u.email.toLowerCase() === email)) {
            showError("Cette adresse e-mail est déjà utilisée.");
            return;
        }

        user.name = name;
        user.email = email;
        // an empty field keeps the current password
        if (password) user.password = password;

        saveUsers(users);
        saveCurrentUser(user);
        window.location.href = "profile.html";
    });

    // the page content stays hidden until we know someone is logged in
    document.getElementById("edit-profile").hidden = false;
}
