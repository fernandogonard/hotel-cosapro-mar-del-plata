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
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");
  navLinks.classList.toggle("active");
  
  // Actualizar aria-expanded
  const isOpen = navLinks.classList.contains("active");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

/* ================= EVENT LISTENERS ================= */
document.addEventListener("DOMContentLoaded", () => {
  // Nav Toggle
  const navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  // Cerrar menú al hacer click en un enlace
  const navLinks = document.getElementById("navLinks");
  const navAnchors = navLinks?.querySelectorAll("a");
  navAnchors?.forEach(anchor => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Botones WhatsApp
  const whatsAppButtons = [
    document.getElementById("navWhatsApp"),
    document.getElementById("heroCTA"),
    document.getElementById("ctaWhatsApp"),
    ...document.querySelectorAll(".btn-consult")
  ];

  whatsAppButtons.forEach(button => {
    if (button) {
      button.addEventListener("click", (e) => {
        // Evento de Analytics (si está configurado)
        try { if (window.gtag) gtag('event', 'click_whatsapp', { 'event_category': 'engagement', 'event_label': button.id || 'btn-whatsapp' }); } catch(e){}
        openWhatsApp(e);
      });
    }
  });

  // Logo clickeable
  const logoLink = document.querySelector(".nav-brand a");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Cerrar menú móvil si está abierto
      const navLinks = document.getElementById("navLinks");
      if (navLinks?.classList.contains("active")) {
        navLinks.classList.remove("active");
        document.getElementById("navToggle").setAttribute("aria-expanded", "false");
      }
    });
  }
});