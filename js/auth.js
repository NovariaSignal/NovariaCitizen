const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// A logged-in user has no use for the login and signup pages
if (currentUser && document.querySelector("#login-form, #signup-form")) {
    window.location.replace("profile.html");
}

// Reload a page restored by the Back button, so it never shows an old login state
window.addEventListener("pageshow", (event) => {
    if (event.persisted) window.location.reload();
});

function logout(event) {
    event.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.reload();
}

// Header (desktop): replace "Connexion" with the name and a dropdown
function showUserDropdown(loginLink, profileUrl) {
    const firstName = currentUser.name?.split(" ")[0] || "Mon compte";

    const dropdown = document.createElement("details");
    dropdown.className = "user-dropdown";
    dropdown.innerHTML = `
        <summary class="user-toggle">
            <span></span>
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </summary>
        <div class="user-menu">
            <a><i class="fa-regular fa-user" aria-hidden="true"></i> Mon profil</a>
            <button type="button">
                <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Déconnexion
            </button>
        </div>
    `;

    // textContent, so a name typed by a user is never read as HTML
    dropdown.querySelector("span").textContent = `Salut ${firstName} !`;
    dropdown.querySelector("a").href = profileUrl;
    dropdown.querySelector("button").addEventListener("click", logout);
    loginLink.replaceWith(dropdown);

    // close the dropdown on an outside click or the Escape key
    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) dropdown.open = false;
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") dropdown.open = false;
    });
}

// Hamburger menu (the only one visible on mobile): "Mon profil" and "Déconnexion"
function updateMenu(menuLink, profileUrl) {
    menuLink.href = profileUrl;
    menuLink.innerHTML = '<i class="fa-regular fa-user"></i> Mon profil';

    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Déconnexion';
    logoutLink.addEventListener("click", logout);
    menuLink.after(logoutLink);
}

if (currentUser) {
    // Bottom bar (mobile): show the first name instead of "Profil"
    const profileLabel = document.querySelector('.mobile-nav a[href$="profile.html"] span');
    const mobileName = currentUser.name?.split(" ")[0];
    if (profileLabel && mobileName) profileLabel.textContent = mobileName;

    // href$= means "ends with", so it matches "login.html" and "pages/login.html"
    const menuLink = document.querySelector('.header-menu a[href$="login.html"]');
    if (menuLink) {
        // same folder as the login page, whatever page we are on
        const profileUrl = menuLink.getAttribute("href").replace("login.html", "profile.html");
        const loginLink = document.querySelector(".login-link");

        if (loginLink) showUserDropdown(loginLink, profileUrl);
        updateMenu(menuLink, profileUrl);
    }
}
