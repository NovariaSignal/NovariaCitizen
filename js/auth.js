// Login / signup behaviour: show-hide password, strength meter, inline errors.
(function () {
  var form = document.querySelector(".auth-form");
  if (!form) return;

  function field(el) {
    return el.closest(".field");
  }

  function validate(el) {
    var f = field(el);
    if (!f) return;
    f.classList.toggle("field--invalid", !el.validity.valid);
  }

  // Show / hide password
  document.querySelectorAll(".toggle-pw").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = btn.closest(".input").querySelector("input");
      var show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-label", show ? "Masquer le mot de passe" : "Afficher le mot de passe");
      btn.querySelector("i").className = show ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
    });
  });

  // Strength meter (signup only)
  var pw = form.querySelector("#password");
  var meter = form.querySelector(".strength");
  if (pw && meter) {
    pw.addEventListener("input", function () {
      var v = pw.value;
      var score = 0;
      if (v.length >= 8) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      if (v.length >= 12) score++;
      meter.dataset.level = v ? Math.max(score, 1) : 0;
    });
  }

  // Inline errors: on blur, then live once a field has been flagged
  form.querySelectorAll("input[required], input[pattern], input[type=email]").forEach(function (el) {
    el.addEventListener("blur", function () { validate(el); });
    el.addEventListener("input", function () {
      if (field(el).classList.contains("field--invalid")) validate(el);
    });
  });

  // Block submit and show errors when invalid (no custom bubbles)
  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.querySelectorAll("input").forEach(validate);
      var first = form.querySelector(".field--invalid input");
      if (first) first.focus();
    }
  });
})();
