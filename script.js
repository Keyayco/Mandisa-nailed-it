const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function setMenuOpen(isOpen) {
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  menuButton?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(
  ".intro-copy, .intro-detail, .section-heading, .service-item, .gallery-card, .booking-inner, .contact-item",
);

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}