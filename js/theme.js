const savedTheme = localStorage.getItem("novaria-theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-theme-choice]");

  function changeTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("novaria-theme", theme);

    buttons.forEach(function (button) {
      const isActive = button.getAttribute("data-theme-choice") === theme;
      button.setAttribute("aria-pressed", isActive);
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      changeTheme(button.getAttribute("data-theme-choice"));
    });
  });

  changeTheme(savedTheme);
});