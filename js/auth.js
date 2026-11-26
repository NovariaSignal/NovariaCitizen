const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// reload a page restored by the Back button, so it shows the right login state
window.addEventListener("pageshow", (event) => {
    if (event.persisted) window.location.reload();
});

if (currentUser) {
    // logged-in users don't need the login and signup pages
    if (document.querySelector("#login-form, #signup-form")) {
        window.location.replace("profile.html");
    }

    const firstName = currentUser.name?.split(" ")[0];
    const bottomLink = document.querySelector(".mobile-nav a:last-child");
    const profileUrl = bottomLink.getAttribute("href");
    const profileLink = `<a href="${profileUrl}"><i class="fa-regular fa-user"></i> Mon profil</a>`;
    const logoutText = '<i class="fa-solid fa-right-from-bracket"></i> Déconnexion';

    // 1. mobile bottom bar: the first name replaces "Profil"
    if (firstName) bottomLink.querySelector("span").textContent = firstName;

    // 2. desktop header: a dropdown replaces "Connexion"
    document.querySelector(".login-link").outerHTML = `
        <details class="user-dropdown">
            <summary class="user-toggle"><span></span> <i class="fa-solid fa-chevron-down"></i></summary>
            <div class="user-menu">${profileLink} <button class="logout">${logoutText}</button></div>
        </details>`;
    const dropdown = document.querySelector(".user-dropdown");
    // textContent, so a name typed by a user is never read as HTML
    dropdown.querySelector("span").textContent = `Salut ${firstName || "Mon compte"} !`;

    // 3. ☰ menu: "Mon profil" and "Déconnexion" replace "Connexion"
    // href$= means "ends with", so it matches "login.html" and "pages/login.html"
    document.querySelector('.header-menu a[href$="login.html"]').outerHTML =
        `${profileLink} <a href="#" class="logout">${logoutText}</a>`;

    // both logout buttons
    document.querySelectorAll(".logout").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.reload();
        });
    });

    // close the dropdown on an outside click or the Escape key
    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) dropdown.open = false;
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") dropdown.open = false;
    });
}
