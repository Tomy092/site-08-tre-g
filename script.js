// Toggle menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("show");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     GALLERIA ALBUM – FIX MOBILE
     =========================== */

  const albums = {
    cucina: [
      "immagini/galleria/lavori/cucine-su-misura/cucina-(1).webp",
      "immagini/galleria/lavori/cucine-su-misura/cucina-(2).webp",
      "immagini/galleria/lavori/cucine-su-misura/cucina-(3).webp",
      "immagini/galleria/lavori/cucine-su-misura/cucina-(4).webp"
    ],
    bagno: [
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(1).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(2).webp"
    ],
    porte: [
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(1).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(2).webp"
    ],
    armadio: [
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(1).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(2).webp"
    ]
  };

  const albumTitles = {
    cucina: "Cucine su misura in legno",
    bagno: "Mobili bagno in legno",
    porte: "Restauro porte e persiane",
    armadio: "Armadi e scaffalature su misura"
  };

  const modal = document.getElementById("album-modal");
  const modalImage = document.getElementById("album-modal-image");
  const modalTitle = document.getElementById("album-modal-title");
  const modalCounter = document.getElementById("album-modal-counter");
  const btnClose = document.getElementById("album-close");
  const btnPrev = document.getElementById("album-prev");
  const btnNext = document.getElementById("album-next");
  const backdrop = document.getElementById("album-modal-backdrop");

  let currentAlbum = null;
  let currentIndex = 0;

  function openAlbum(key) {
    if (!albums[key]) return;

    currentAlbum = key;
    currentIndex = 0;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalTitle.textContent = albumTitles[key];
    updateImage();
  }

  function closeAlbum() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateImage() {
    const images = albums[currentAlbum];
    if (!images) return;

    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    modalImage.src = images[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  document.querySelectorAll(".gallery-item").forEach(item => {
    const handler = () => {
      const key = item.dataset.album;
      if (key) openAlbum(key);
    };

    item.addEventListener("click", handler);
    item.addEventListener("touchstart", handler, { passive: true });
  });

  btnClose?.addEventListener("click", closeAlbum);
  backdrop?.addEventListener("click", closeAlbum);

  btnPrev?.addEventListener("click", () => {
    currentIndex--;
    updateImage();
  });

  btnNext?.addEventListener("click", () => {
    currentIndex++;
    updateImage();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAlbum();
  });

});

// Titoli leggibili per ogni album
const albumTitles = {
  cucina: "Cucine su misura in legno",
  bagno: "Mobili bagno in legno",
  porte: "Restauro porte interne",
  armadio: "Armadi e scaffalature su misura"
};

const modal = document.getElementById("album-modal");
const modalImage = document.getElementById("album-modal-image");
const modalTitle = document.getElementById("album-modal-title");
const modalCounter = document.getElementById("album-modal-counter");
const btnClose = document.getElementById("album-close");
const btnPrev = document.getElementById("album-prev");
const btnNext = document.getElementById("album-next");
const backdrop = document.getElementById("album-modal-backdrop");

let currentAlbumKey = null;
let currentIndex = 0;

function openAlbum(albumKey, startIndex = 0) {
  const images = albums[albumKey];
  if (!images || images.length === 0) return;

  currentAlbumKey = albumKey;
  currentIndex = startIndex;

  // 🔧 preload prima immagine
  const preload = new Image();
  preload.src = images[currentIndex];

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalTitle.textContent = albumTitles[albumKey] || "Album TRE G";
  updateModalImage();
}

function closeAlbum() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateModalImage() {
  const images = albums[currentAlbumKey];
  if (!images || images.length === 0) return;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  const src = images[currentIndex];

  // 🔧 FIX MOBILE: forza refresh immagine
  modalImage.style.display = "none";
  modalImage.src = "";
  
  // usa requestAnimationFrame per mobile
  requestAnimationFrame(() => {
    modalImage.src = src;
    modalImage.style.display = "block";
  });

  modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// pulsanti modale
if (btnClose) btnClose.addEventListener("click", closeAlbum);
if (backdrop) backdrop.addEventListener("click", closeAlbum);

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    currentIndex--;
    updateModalImage();
  });
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    currentIndex++;
    updateModalImage();
  });
}

// chiusura con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeAlbum();
  }
});

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
