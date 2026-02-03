/* ================= SCROLL REVEAL ================= */
const sections = document.querySelectorAll("section");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    if (section.classList.contains("visible")) return;

    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
};

// Estado inicial
sections.forEach(section => {
  section.classList.add("reveal");
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ================= WHATSAPP ================= */
function openWhatsApp() {
  const phone = "5492235033585";
  const message = encodeURIComponent(
    "Hola, soy asistente al Congreso Provincial de Salud 2026 y quiero consultar disponibilidad…"
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}


/* ================= NAV MOBILE ================= */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}