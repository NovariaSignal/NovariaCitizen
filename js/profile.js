const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    // not logged in: go to the login page (replace, so Back doesn't return here)
    window.location.replace("login.html");
} else {
    const name = currentUser.name || "Mon compte";

    document.getElementById("profile-avatar").textContent = name.charAt(0).toUpperCase();
    document.getElementById("profile-name").textContent = name;
    document.getElementById("profile-email").textContent = currentUser.email || "";

    document.getElementById("logout-button").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.replace("login.html");
    });

    // the page content stays hidden until we know someone is logged in
    document.getElementById("profile").hidden = false;
}
