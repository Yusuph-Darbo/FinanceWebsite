document.addEventListener("DOMContentLoaded", function () {
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

