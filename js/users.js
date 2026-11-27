// the only place that reads and writes accounts, so a database can replace localStorage later

export function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // accounts created before ids existed get one here
    if (users.some((u) => !u.id)) {
        users.forEach((u) => (u.id ||= crypto.randomUUID()));
        saveUsers(users);
    }

    return users;
}

export function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

export function saveCurrentUser({ id, name, email }) {
    // never keep the password in the session
    localStorage.setItem("currentUser", JSON.stringify({ id, name, email }));
}
