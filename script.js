
/* =========================================
   LOS SECRETOS DEL UNIVERSO
   JavaScript principal
========================================= */

// Esperar a que cargue completamente el HTML
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MENÚ DE NAVEGACIÓN PARA CELULARES
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("open");

            // Cambiar el símbolo del botón
            if (nav.classList.contains("open")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });

        // Cerrar el menú después de seleccionar una página
        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
                menuToggle.textContent = "☰";
            });
        });
    }

    // =====================================
    // ANIMACIÓN DE TARJETAS AL DESPLAZARSE
    // =====================================

    const cards = document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        cards.forEach(function (card) {
            card.classList.add("reveal");
            observer.observe(card);
        });
    }

    // =====================================
    // AÑO AUTOMÁTICO EN EL FOOTER
    // =====================================

    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // =====================================
    // BOTÓN PARA VOLVER ARRIBA
    // =====================================

    const backToTop = document.querySelector("#back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
