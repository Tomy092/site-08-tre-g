// Toggle menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Chiudi menu dopo click su link (solo mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("show");
      }
    });
  });
}
