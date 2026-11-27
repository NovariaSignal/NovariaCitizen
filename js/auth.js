const currentUser = JSON.parse(localStorage.getItem("currentUser"));

window.addEventListener("pageshow", (event) => {
    if (event.persisted) window.location.reload();
});

if (currentUser) {
    if (document.querySelector("#login-form, #signup-form")) {
        window.location.replace("profile.html");
    }

    const firstName = currentUser.name?.split(" ")[0];
    const bottomLink = document.querySelector(".mobile-nav a:last-child");
    const profileUrl = bottomLink.getAttribute("href");
    const profileLink = `<a href="${profileUrl}"><i class="fa-regular fa-user"></i> Mon profil</a>`;
    const logoutText = '<i class="fa-solid fa-right-from-bracket"></i> Déconnexion';

    if (firstName) bottomLink.querySelector("span").textContent = firstName;

    document.querySelector(".login-link").outerHTML = `
        <details class="user-dropdown">
            <summary class="user-toggle"><span></span> <i class="fa-solid fa-chevron-down"></i></summary>
            <div class="user-menu">${profileLink} <button class="logout">${logoutText}</button></div>
        </details>`;
    const dropdown = document.querySelector(".user-dropdown");
    dropdown.querySelector("span").textContent = `Salut ${firstName || "Mon compte"} !`;

    document.querySelector('.header-menu a[href$="login.html"]').outerHTML =
        `${profileLink} <a href="#" class="logout">${logoutText}</a>`;

    document.querySelectorAll(".logout").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.reload();
        });
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) dropdown.open = false;
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") dropdown.open = false;
    });
}
