/**
 * main.js - Lógica centralizada para Turismo Gualeguay
 * Maneja animaciones, navegación, validaciones y componentes dinámicos.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ANIMACIONES AL HACER SCROLL ---
    // Identificamos los elementos que queremos animar
    const selectorsToAnimate = '.card, .grid-2col, .gallery figure, .hero, section h2, .photo-static, .artista-card, .historia-card, form';
    const elements = document.querySelectorAll(selectorsToAnimate);

    // Les añadimos la clase base de animación si no la tienen
    elements.forEach(el => el.classList.add('animar'));

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejamos de observar una vez animado para optimizar
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => animationObserver.observe(el));


    // --- 2. NAVBAR Y 3. BOTÓN VOLVER ARRIBA (EVENTO SCROLL) ---
    const header = document.querySelector('.mi-header-flex');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Navbar: Cambio de estilo tras 50px de scroll
        if (header) {
            if (scrollPos > 50) {
                header.classList.add('navbar-scrolled');
            } else {
                header.classList.remove('navbar-scrolled');
            }
        }

        // Botón Volver Arriba: Visibilidad tras 400px de scroll
        if (backToTopBtn) {
            if (scrollPos > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // Acción de click para el botón (Scroll suave al inicio)
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // --- 4. VALIDACIÓN DE FORMULARIO DE CONTACTO ---
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Usamos la validación nativa de Bootstrap
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                // Simulación de envío exitoso
                e.preventDefault();
                // Notificamos a Clarity del evento de conversión
                if (typeof clarity === "function") {
                    clarity("event", "contacto_enviado");
                }
                alert('¡esta pagina aun esta en contruccion, disculpe!');
                // Reiniciamos el formulario
                form.reset();
                form.classList.remove('was-validated');
            }
            form.classList.add('was-validated');
        }, false);
    });


    // --- 5. CONTROL DEL CARRUSEL (PAUSA/REANUDAR) ---
    const carouselEl = document.getElementById('carruselGualeguay');
    if (carouselEl && typeof bootstrap !== 'undefined') {
        // Obtenemos o creamos la instancia de Bootstrap
        const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
            pause: 'hover', // Configuración nativa
            interval: 5000
        });

        // Aseguramos la pausa manual por si los data-attributes fallan
        carouselEl.addEventListener('mouseenter', () => {
            carousel.pause();
        });
        carouselEl.addEventListener('mouseleave', () => {
            carousel.cycle();
        });
    }


    // --- 6. FILTRO DE GÉNEROS MUSICALES (GRILLA) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const genreGroups = document.querySelectorAll('.genre-group');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Actualizar estado del botón
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filtrar grupos
                genreGroups.forEach(group => {
                    const genre = group.getAttribute('data-genre');
                    if (filter === 'all' || genre === filter) {
                        group.style.display = 'block';
                    } else {
                        group.style.display = 'none';
                    }
                });
            });
        });
    }
});