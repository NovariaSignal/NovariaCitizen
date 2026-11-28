
const reports = JSON.parse(localStorage.getItem("reports")) || [];
const reportList = document.getElementById("report-list");

const categoryIcones = {
    "Voirie": { icon: "fa-road", style: "road" },
    "Propreté": { icon: "fa-broom", style: "cleanliness" },
    "Éclairage": { icon: "fa-lightbulb", style: "lighting" },
    "Autre": { icon: "fa-circle-exclamation", style: "other" }
};

const userId = JSON.parse(localStorage.getItem("currentUser"))?.id;

// initialize confirmations for old reports
reports.forEach((report) => {
    if (!Array.isArray(report.confirmedBy)) {
        report.confirmedBy = [];
    }

    report.confirmations = report.confirmedBy.length;
});

localStorage.setItem("reports", JSON.stringify(reports));

const shownReports = (reportList.hasAttribute("data-mine")
    ? reports.filter((report) => report.userId && report.userId === userId)
    : reports).reverse();

shownReports.forEach((report) => {

    const categoryIcone = categoryIcones[report.category] || categoryIcones["Autre"];

    const card = document.createElement("li");
    card.classList.add("report-card", "category-" + categoryIcone.style);

    const title = document.createElement("h3");
    title.textContent = report.title;
    title.classList.add("report-title");

    const author = document.createElement("p");
    author.textContent = `Signalé par ${report.userName}`;
    author.classList.add("report-author");

    const category = document.createElement("p");
    category.classList.add("report-category");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", categoryIcone.icon);
    category.appendChild(icon);

    const badge = document.createElement("span");
    badge.textContent = report.category || "Autre";
    badge.classList.add("report-badge");

    const description = document.createElement("p");
    description.textContent = report.description;
    description.classList.add("report-description");

    const location = document.createElement("p");
    location.textContent = report.location;
    location.classList.add("report-location");

    const status = document.createElement("p");
    status.textContent = report.status || "En attente de traitement";
    status.classList.add("report-status");

    const confirmer = document.createElement("button");

    confirmer.classList.add("confirm-button");

    const dejaConfirme = userId && report.confirmedBy.includes(userId);

    confirmer.classList.toggle("confirmed", !!dejaConfirme);

    // the author cannot confirm their own report
    if (report.userId === userId) {
        confirmer.disabled = true;
    }

    confirmer.textContent = dejaConfirme ? "Confirmé" : "Confirmer";

    const confirmations = document.createElement("p");
    confirmations.textContent = report.confirmations + " confirmations";
    confirmations.classList.add("report-confirmations");

    confirmer.addEventListener("click", () => {

        if (!userId) {
            window.location.href = "../pages/login.html";
            return;
        }

        const index = report.confirmedBy.indexOf(userId);

        if (index === -1) {
            report.confirmedBy.push(userId);
        }
        else {
            report.confirmedBy.splice(index, 1);
        }

        report.confirmations = report.confirmedBy.length;

        const dejaConfirme = report.confirmedBy.includes(userId);

        confirmer.textContent = dejaConfirme ? "Confirmé" : "Confirmer";

        confirmer.classList.toggle("confirmed", dejaConfirme);

        confirmations.textContent = report.confirmations + " confirmations";

        localStorage.setItem("reports", JSON.stringify(reports));

    });

    card.appendChild(category);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(badge);
    card.appendChild(location);
    card.appendChild(status);
    card.appendChild(description);

    if (report.image) {
        const image = document.createElement("img");
        image.src = report.image;
        image.alt = report.title;
        image.classList.add("report-image");
        card.appendChild(image);
    }

    card.appendChild(confirmations);
    card.appendChild(confirmer);

    reportList.appendChild(card);

});

const reportSearch = document.getElementById("report-search");

reportSearch?.addEventListener("input", () => {

    const search = reportSearch.value.toLowerCase();
    const cards = document.querySelectorAll(".report-card");

    cards.forEach((card) => {

        const title = card.querySelector(".report-title").textContent.toLowerCase();

        if (title.includes(search)) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }

    });

});

const categoryFilter = document.getElementById("category-filter");

categoryFilter?.addEventListener("change", () => {

    const category = categoryFilter.value;
    const cards = document.querySelectorAll(".report-card");

    cards.forEach((card) => {

        const badge = card.querySelector(".report-badge").textContent;

        if (category === "" || badge === category) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }

    });

});
