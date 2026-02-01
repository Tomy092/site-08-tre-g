document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     MENU MOBILE
     =========================== */
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

  const albums = {
    cucina: [
      "immagini/galleria/lavori/cucine-su-misura/cucina-(1).webp",
      "immagini/galleria/lavori/cucine-su-misura/cucina-(2).webp",
      "immagini/galleria/lavori/cucine-su-misura/cucina-(3).webp",
      "immagini/galleria/lavori/cucine-su-misura/cucina-(4).webp"
    ],
    bagno: [
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(1).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(2).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(3).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(4).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(5).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(6).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(7).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(8).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(9).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(10).webp",
      "immagini/galleria/lavori/mobili-per-bagno/bagno-(11).webp"
    ],
    porte: [
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(1).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(2).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(3).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(4).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(5).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(6).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(7).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(8).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(9).webp",
      "immagini/galleria/lavori/restauro-porte-e-finestre/porte-persiane-(10).webp"
    ],
    armadio: [
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(1).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(2).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(3).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(4).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(5).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(6).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(7).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(8).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(9).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(10).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(11).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(12).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(13).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(14).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(15).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(16).webp",
      "immagini/galleria/lavori/armadi-e-scaffali/armadio-(17).webp"
    ],
  };

  const albumTitles = {
    cucina: "Cucine su misura in legno",
    bagno: "Mobili bagno in legno",
    porte: "Restauro porte e persiane",
    armadio: "Armadi e scaffalature su misura",
  };

  const modal = document.getElementById("album-modal");
  const modalImage = document.getElementById("album-modal-image");
  const modalTitle = document.getElementById("album-modal-title");
  const modalCounter = document.getElementById("album-modal-counter");
  const btnClose = document.getElementById("album-close");
  const btnPrev = document.getElementById("album-prev");
  const btnNext = document.getElementById("album-next");
  const backdrop = document.getElementById("album-modal-backdrop");
  const navbar = document.querySelector(".navbar");

  let currentAlbumKey = null;
  let currentIndex = 0;

  function openAlbum(albumKey) {
    const images = albums[albumKey];
    if (!images || images.length === 0) return;

    currentAlbumKey = albumKey;
    currentIndex = 0;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    navbar?.classList.add("hidden");

    modalTitle.textContent = albumTitles[albumKey] || "Album TRE G";
    updateModalImage();
  }

  function closeAlbum() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    navbar?.classList.remove("hidden");
  }

  function updateModalImage() {
    const images = albums[currentAlbumKey];
    if (!images) return;

    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    modalImage.src = images[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  /* ===========================
   SWIPE MOBILE / TABLET
   =========================== */

let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  // soglia minima per evitare tocchi accidentali
  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance < 0) {
    // swipe sinistra → avanti
    currentIndex++;
  } else {
    // swipe destra → indietro
    currentIndex--;
  }

  updateModalImage();
}

modal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.album;
      if (key) openAlbum(key);
    });
  });

  btnClose?.addEventListener("click", closeAlbum);
  backdrop?.addEventListener("click", closeAlbum);

  btnPrev?.addEventListener("click", () => {
    currentIndex--;
    updateModalImage();
  });

  btnNext?.addEventListener("click", () => {
    currentIndex++;
    updateModalImage();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeAlbum();
    }
  });

  /* ===========================
     NAVBAR SCROLL
     =========================== */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });
});
