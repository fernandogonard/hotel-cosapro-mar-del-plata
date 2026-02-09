/* =========================================================
   SCROLL REVEAL – OPTIMIZADO CON INTERSECTION OBSERVER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => {
      section.classList.add("reveal");
      observer.observe(section);
    });
  } else {
    // Fallback muy liviano (navegadores viejos)
    sections.forEach(section => section.classList.add("visible"));
  }


  /* =========================================================
     NAV MOBILE
     ========================================================= */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const toggleMenu = () => {
    if (!navLinks || !navToggle) return;

    navLinks.classList.toggle("active");
    navToggle.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("active") ? "true" : "false"
    );
  };

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  // Cerrar menú al hacer click en un enlace
  navLinks?.querySelectorAll("a").forEach(anchor => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });


  /* =========================================================
     WHATSAPP
     ========================================================= */

  const openWhatsApp = () => {
    const phone = "5492235033585";
    const message = encodeURIComponent(
      "Hola, soy asistente al Congreso Provincial de Salud 2026 y quiero consultar disponibilidad…"
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank",
      "noopener"
    );
  };

  const whatsAppButtons = [
    document.getElementById("navWhatsApp"),
    document.getElementById("heroCTA"),
    document.getElementById("ctaWhatsApp"),
    ...document.querySelectorAll(".btn-consult")
  ];

  whatsAppButtons.forEach(button => {
    if (!button) return;

    button.addEventListener("click", () => {
      // Analytics (no bloqueante)
      if (window.gtag) {
        try {
          gtag("event", "click_whatsapp", {
            event_category: "engagement",
            event_label: button.id || "btn-whatsapp"
          });
        } catch (_) {}
      }

      openWhatsApp();
    });
  });


  /* =========================================================
     LOGO – SCROLL TO TOP
     ========================================================= */

  const logoLink = document.querySelector(".nav-brand a");

  if (logoLink) {
    logoLink.addEventListener("click", e => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      if (navLinks?.classList.contains("active")) {
        navLinks.classList.remove("active");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    });
  }
});
