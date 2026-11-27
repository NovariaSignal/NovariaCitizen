function updateStats() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("total-reports").textContent =
        reports.length.toLocaleString("fr-FR");

    document.getElementById("total-citizens").textContent =
        users.length.toLocaleString("fr-FR");
}

updateStats();

window.addEventListener("statsUpdated", updateStats);


const latestReports = document.getElementById("latest-reports");

const categoryIcons = {
    "Voirie": {
        icon: "fa-road",
        style: ""
    },
    "Propreté": {
        icon: "fa-trash-can",
        style: "green"
    },
    "Éclairage": {
        icon: "fa-lightbulb",
        style: "yellow"
    },
    "Autre": {
        icon: "fa-circle-exclamation",
        style: "purple"
    }
};

function getTimeAgo(date) {
    if (!date) return "Date inconnue";

    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);

    if (minutes < 0) return "À l'instant";
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `Il y a ${hours} h`;

    const days = Math.floor(hours / 24);

    return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
}

function displayLatestReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    latestReports.innerHTML = "";

    const lastThree = reports
        .map((report, index) => ({ report, index }))
        .sort((a, b) => {
            const dateA = new Date(a.report.createdAt || 0).getTime();
            const dateB = new Date(b.report.createdAt || 0).getTime();

            return dateB - dateA || b.index - a.index;
        })
        .slice(0, 3);

    if (lastThree.length === 0) {
        latestReports.textContent = "Aucun signalement pour le moment.";
        return;
    }

    lastThree.forEach(({ report }) => {
        const category = categoryIcons[report.category] || categoryIcons["Autre"];

        const article = document.createElement("article");
        article.classList.add("mini-report");

        const iconContainer = document.createElement("span");
        iconContainer.classList.add("category-icon");

        if (category.style) {
            iconContainer.classList.add(category.style);
        }

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", category.icon);
        iconContainer.appendChild(icon);

        const content = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = report.title;

        const details = document.createElement("small");

        const locationIcon = document.createElement("i");
        locationIcon.classList.add("fa-solid", "fa-location-dot");

        details.appendChild(locationIcon);
        details.appendChild(
            document.createTextNode(
                ` ${report.location || "Localisation inconnue"} · ${getTimeAgo(report.createdAt)}`
            )
        );

        content.appendChild(title);
        content.appendChild(details);

        const statusDot = document.createElement("span");
        statusDot.classList.add("status-dot");

        article.appendChild(iconContainer);
        article.appendChild(content);
        article.appendChild(statusDot);

        latestReports.appendChild(article);
    });
}

displayLatestReports();

window.addEventListener("storage", displayLatestReports);

window.addEventListener("statsUpdated", displayLatestReports);