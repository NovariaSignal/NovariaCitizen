const reports = JSON.parse(localStorage.getItem("reports")) || [];
const reportList = document.getElementById("report-list");
const categoryIcones = {
    "Voirie": { icon: "fa-road", style: "road" },
    "Propreté": { icon: "fa-broom", style: "cleanliness" },
    "Éclairage": { icon: "fa-lightbulb", style: "lighting" },
    "Autre": { icon: "fa-circle-exclamation", style: "other" }
};

// the profile page marks its list with "data-mine" to show only your own reports
const userId = JSON.parse(localStorage.getItem("currentUser"))?.id;
const shownReports = reportList.hasAttribute("data-mine")
    ? reports.filter((report) => report.userId && report.userId === userId)
    : reports;

shownReports.forEach((report) => {

    const categoryIcone = categoryIcones[report.category] || categoryIcones["Autre"];

    const card = document.createElement("li");
    card.classList.add("report-card", "category-" + categoryIcone.style);

    const title = document.createElement("h3");
    title.textContent = report.title;
    title.classList.add("report-title");

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
    confirmer.classList.toggle("confirmed", report.isConfirmed === true);

    if (report.isConfirmed === true) {
        confirmer.textContent = "Confirmé";
    }
    else {
        confirmer.textContent = "Confirmer";
    }

    const confirmations = document.createElement("p");
    confirmations.textContent = report.confirmations + " confirmations";
    confirmations.classList.add("report-confirmations");

    confirmer.addEventListener("click", () => {
        if (report.isConfirmed === false) {
            report.isConfirmed = true;
            report.confirmations++;
            confirmer.textContent = "Confirmé";
        }
        else {
            report.isConfirmed = false;
            report.confirmations--;
            confirmer.textContent = "Confirmer";
        }
        confirmer.classList.toggle("confirmed", report.isConfirmed === true);
        confirmations.textContent = report.confirmations + " confirmations";
        localStorage.setItem("reports", JSON.stringify(reports));
    });
    card.appendChild(category);
    card.appendChild(title);
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

// "?." because the profile page has no search box or filter
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