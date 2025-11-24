document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const headerLinks = document.querySelector(".header-links");
  const body = document.body;

  if (menuToggle && headerLinks) {
    menuToggle.addEventListener("click", function () {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      headerLinks.classList.toggle("active");
      body.classList.toggle("menu-open");

      // Prevent body scroll when menu is open
      if (!isExpanded) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link or button
    const menuLinks = headerLinks.querySelectorAll("a");
    const downloadBtn = headerLinks.querySelector(".download-btn");
    
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        headerLinks.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      });
    });

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        headerLinks.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      });
    }

    // Close menu when clicking outside (on overlay)
    document.addEventListener("click", function (e) {
      if (
        body.classList.contains("menu-open") &&
        !headerLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        menuToggle.setAttribute("aria-expanded", "false");
        headerLinks.classList.remove("active");
        body.classList.remove("menu-open");
        body.style.overflow = "";
      }
    });
  }

  // Testimonial Slider
  const slider = document.querySelector(".testimonial-slider");
  const slides = Array.from(document.querySelectorAll(".testimonial"));
  const nav = document.querySelector(".testimonial-nav");
  const buttons = nav ? Array.from(nav.querySelectorAll(".nav-btn")) : [];

  if (!slider || slides.length === 0 || !nav || buttons.length === 0) {
    return;
  }

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
    buttons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    currentIndex = index;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index") || "0", 10);
      showSlide(idx);
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute("data-index") || "0", 10);
        showSlide(idx);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (currentIndex + 1) % slides.length;
        buttons[next].focus();
        showSlide(next);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        buttons[prev].focus();
        showSlide(prev);
      }
    });
  });

  // Initialize
  showSlide(0);
});

async function loadTokenData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,tron"
  );

  const data = await response.json();

  data.forEach(coin => {
    const idMap = {
      bitcoin: "btc-card",
      ethereum: "eth-card",
      litecoin: "ltc-card",
      tron: "trx-card"
    };

    const card = document.getElementById(idMap[coin.id]);

    card.querySelector(".market-cap").textContent =
      "$" + Number(coin.market_cap).toLocaleString();

    card.querySelector(".volume").textContent =
      "$" + Number(coin.total_volume).toLocaleString();

    card.querySelector(".website").href = coin.homepage ? coin.homepage : "#";
  });
}

loadTokenData();
