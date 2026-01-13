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

/* ===========================
   GALLERIA ALBUM
   =========================== */

// QUI inserisci tutte le immagini che vuoi per ogni album
const albums = {
  cucina: [
    "Immagini/Galleria/Lavori/Cucine su misura/Cucina-1.webp",
    "Immagini/Galleria/Lavori/Cucine su misura/Cucina-2.webp",
    "Immagini/Galleria/Lavori/Cucine su misura/Cucina-3.webp"
    // aggiungi altre...
  ],
  bagno: [
    "Immagini/Galleria/Lavori/mobili-per-bagno/bagno-1noBG.webp",
    "Immagini/Galleria/Lavori/mobili-per-bagno/bagno-2noBG.webp",
    "Immagini/Galleria/Lavori/mobili-per-bagno/bagno-3.webp",
    "Immagini/Galleria/Lavori/mobili-per-bagno/bagno-4.webp",
    "Immagini/Galleria/Lavori/mobili-per-bagno/bagno-5.webp",
    "Immagini/Galleria/Lavori/mobili-per-bagno/bagno-6.webp"
  ],
  porte: [
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-1.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-2.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-3.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-4.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-5.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-6.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-7.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-8.webp",
    "Immagini/Galleria/Lavori/Restauro porte e persiane/Porte-persiane-9.webp"
  ],
  armadio: [
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-1.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-2.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-3.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-4.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-5.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-6.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-7.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-8.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-9.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-10.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-11.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-12.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-13.webp",
    "Immagini/Galleria/Lavori/Armadi e scaffali/Armadio-14.webp"
  ]
};

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

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // blocca lo scroll sotto

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

  // ciclare le immagini
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  const src = images[currentIndex];
  modalImage.src = src;
  modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// listener sulle copertine album
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const albumKey = item.getAttribute("data-album");
    if (!albumKey) return;
    openAlbum(albumKey, 0);
  });
});

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
