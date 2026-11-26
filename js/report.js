
const reports = JSON.parse(localStorage.getItem("reports")) || [];

const form = document.getElementById("report-form");
const descriptionInput = document.getElementById("description");
const characterCount = document.getElementById("count");

const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("image-preview");
const previewImg = document.getElementById("preview-img");
const removeImage = document.getElementById("remove-image");

function updateCharacterCount() {
    characterCount.textContent = descriptionInput.value.length;
}

descriptionInput.addEventListener("input", updateCharacterCount);
updateCharacterCount();

imageInput.addEventListener("change", () => {

    const image = imageInput.files[0];

    if (image) {
        const reader = new FileReader();

        reader.onload = function() {
            previewImg.src = reader.result;
            imagePreview.hidden = false;
        };

        reader.readAsDataURL(image);
    }

});

removeImage.addEventListener("click", () => {

    imageInput.value = "";
    previewImg.src = "";
    imagePreview.hidden = true;

});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const image = imageInput.files[0];

    const report = {
        title,
        category,
        description,
        location,
        image: null,
        confirmations: 0,
        isConfirmed: false,
        status: "En attente"

    };

    function saveReport() {
        reports.push(report);

        localStorage.setItem("reports", JSON.stringify(reports));

        console.log(reports);

        form.reset();
        updateCharacterCount();

        imagePreview.hidden = true;
        previewImg.src = "";
    }

    if (image) {

        const reader = new FileReader();

        reader.onload = function() {
            report.image = reader.result;
            saveReport();
        };

        reader.readAsDataURL(image);

    } else {
        saveReport();
    }

});
