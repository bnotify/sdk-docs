(function () {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("menuToggle");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        sidebar.classList.remove("open");
      }
    });
  }

  document.querySelectorAll(".pre-wrap").forEach(function (wrap) {
    const btn = wrap.querySelector(".copy-btn");
    const code = wrap.querySelector("pre code") || wrap.querySelector("pre");
    if (!btn || !code) return;
    btn.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(code.innerText);
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 1600);
      } catch (err) {
        btn.textContent = "Failed";
      }
    });
  });

  // Highlight current page in sidebar
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-link[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === path) {
      link.classList.add("active");
    }
  });

  // Contact form → mailto
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const platform = form.platform.value;
      const message = form.message.value.trim();
      const subject = encodeURIComponent("BNotify SDK Support — " + platform);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\nPlatform: " + platform + "\n\n" + message
      );
      window.location.href =
        "mailto:bnotify93@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
})();
