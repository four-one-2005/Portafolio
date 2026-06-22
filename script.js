// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Animaciones (AOS)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 2. Lógica del Menú de Navegación (Sticky & Mobile)
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Efecto Scroll Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle Menú Móvil
    menuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
        
        if (isActive) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
            menuToggle.querySelector('i').classList.replace('bx-x', 'bx-menu');
        });
    });

    // 3. Efecto Cursor Glow
    const cursorGlow = document.getElementById('cursor-glow');
    let isMouseMoving = false;
    let isHoveringImage = false;

    // Detectar hover en la imagen para apagar el glow
    const heroImage = document.querySelector('.hero-image-container');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            isHoveringImage = true;
            cursorGlow.style.opacity = '0';
        });
        heroImage.addEventListener('mouseleave', () => {
            isHoveringImage = false;
            cursorGlow.style.opacity = '1';
        });
    }

    // Seguir el cursor
    document.addEventListener('mousemove', (e) => {
        // En móviles o al hacer hover en la imagen, evitamos el glow
        if (window.innerWidth <= 768 || isHoveringImage) return;

        if (!isMouseMoving) {
            cursorGlow.style.opacity = '1';
            isMouseMoving = true;
        }
        
        requestAnimationFrame(() => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    });

    // Ocultar si el ratón sale de la ventana
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
        isMouseMoving = false;
    });

    // ─────────────────────────────────────────────────────────────────
    // 4. Formulario de Contacto — Netlify Forms (versión completa)
    // ─────────────────────────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {

        // ── Regex de email robusto (RFC 5322 simplificado) ──
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // ── Rate limiting mejorado (SECURITY PATCH — Auditoría 2026-06-21) ──
        // NOTA: Esta protección es client-side únicamente. La defensa real
        // contra spam masivo se configura en netlify.toml (Spam Filters + Headers).
        const RATE_LIMIT_MS  = 60000;  // 60 segundos entre envíos
        const MAX_HOURLY     = 5;      // Máximo 5 envíos por hora
        const STORAGE_KEY    = 'contact_rate_data';

        function getRateData() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                return raw ? JSON.parse(raw) : { lastSubmit: 0, hourlyCount: 0, hourStart: Date.now() };
            } catch { return { lastSubmit: 0, hourlyCount: 0, hourStart: Date.now() }; }
        }

        function saveRateData(data) {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* storage lleno */ }
        }

        // Alias para compatibilidad con el código de envío existente
        let lastSubmitTime = getRateData().lastSubmit;

        // ── Sanitización básica (evita XSS en mensajes de éxito) ──
        function sanitize(str) {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        // ── Validación individual de un campo ──
        function validateField(field) {
            const value = field.value.trim();
            const errorEl = document.getElementById(`${field.id}-error`);
            let errorMsg = '';

            if (!value) {
                errorMsg = 'Este campo es obligatorio.';
            } else if (field.id === 'name' && value.length < 2) {
                errorMsg = 'El nombre debe tener al menos 2 caracteres.';
            } else if (field.id === 'email' && !EMAIL_REGEX.test(value)) {
                errorMsg = 'Ingresa un correo electrónico válido.';
            } else if (field.id === 'message' && value.length < 10) {
                errorMsg = `El mensaje es muy corto (${value.length}/10 caracteres mínimo).`;
            }

            if (errorMsg) {
                field.classList.add('input-error');
                field.setAttribute('aria-invalid', 'true');
                if (errorEl) errorEl.textContent = errorMsg;
                return false;
            } else {
                field.classList.remove('input-error');
                field.setAttribute('aria-invalid', 'false');
                if (errorEl) errorEl.textContent = '';
                return true;
            }
        }

        // ── Validación en blur (al salir de cada campo) ──
        const fields = contactForm.querySelectorAll('input:not([type="hidden"]):not([name="bot-field"]), textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            // Limpiar error mientras el usuario escribe (después del primer intento)
            field.addEventListener('input', () => {
                if (field.classList.contains('input-error')) {
                    validateField(field);
                }
            });
        });

        // ── Contador de caracteres del textarea ──
        const messageField = document.getElementById('message');
        const charCounter  = document.getElementById('char-counter');
        const MAX_CHARS    = 500;

        if (messageField && charCounter) {
            messageField.addEventListener('input', () => {
                const len = messageField.value.length;
                charCounter.textContent = `${len} / ${MAX_CHARS}`;
                charCounter.classList.toggle('char-counter--warning', len >= MAX_CHARS * 0.9);
            });
        }

        // ── Envío del formulario ──
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // ── Rate limiting mejorado (client-side) ──
            const now      = Date.now();
            const rateData = getRateData();

            // Resetear contador horario si ya pasó 1 hora
            if (now - rateData.hourStart > 3600000) {
                rateData.hourlyCount = 0;
                rateData.hourStart   = now;
            }

            if (now - rateData.lastSubmit < RATE_LIMIT_MS) {
                const segsLeft = Math.ceil((RATE_LIMIT_MS - (now - rateData.lastSubmit)) / 1000);
                showFormMessage('error', `Por favor espera ${segsLeft} segundos antes de enviar otro mensaje.`);
                return;
            }

            if (rateData.hourlyCount >= MAX_HOURLY) {
                showFormMessage('error', 'Has alcanzado el límite de envíos por hora. Inténtalo más tarde.');
                return;
            }

            // Validar todos los campos y recoger los inválidos
            const fieldsToValidate = [
                document.getElementById('name'),
                document.getElementById('email'),
                document.getElementById('message')
            ];
            const invalidFields = fieldsToValidate.filter(f => !validateField(f));

            if (invalidFields.length > 0) {
                // Hacer foco en el primer campo inválido (accesibilidad + UX)
                invalidFields[0].focus();
                showFormMessage('error', 'Por favor corrige los errores antes de enviar.');
                return;
            }

            // UI: estado de carga
            const btnSubmit   = document.getElementById('btn-submit');
            const originalHTML = btnSubmit.innerHTML;
            btnSubmit.innerHTML = 'Enviando... <i class="bx bx-loader-alt bx-spin"></i>';
            btnSubmit.disabled  = true;

            // Netlify Forms: POST a '/' con body URL-encoded
            const formData    = new FormData(contactForm);
            formData.append("form-name", "contacto");
            const encodedData = new URLSearchParams(formData).toString();

            fetch('/', {
                method:  'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body:    encodedData
            })
            .then(response => {
                if (response.ok) {
                    // ✅ Éxito real — Netlify confirmó la recepción
                    // Actualizar rate data en localStorage
                    const updatedRate = getRateData();
                    updatedRate.lastSubmit  = Date.now();
                    updatedRate.hourlyCount = (updatedRate.hourlyCount || 0) + 1;
                    if (Date.now() - updatedRate.hourStart > 3600000) {
                        updatedRate.hourlyCount = 1;
                        updatedRate.hourStart   = Date.now();
                    }
                    saveRateData(updatedRate);
                    lastSubmitTime = updatedRate.lastSubmit;

                    const safeName = sanitize(document.getElementById('name').value.trim());
                    showFormMessage('success', `¡Gracias, ${safeName}! Tu mensaje fue enviado. Te responderé pronto. 🚀`);
                    contactForm.reset();
                    if (charCounter) charCounter.textContent = `0 / ${MAX_CHARS}`;
                } else {
                    showFormMessage('error', `Error del servidor (${response.status}). Inténtalo de nuevo.`);
                }
            })
            .catch(() => {
                showFormMessage('error', 'Sin conexión a internet. Verifica tu red e inténtalo de nuevo.');
            })
            .finally(() => {
                btnSubmit.innerHTML = originalHTML;
                btnSubmit.disabled  = false;
            });
        });
    }

    // 5. Active Nav Link on Scroll (IntersectionObserver)
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Fallback manual para resaltar 'Inicio' al subir del todo
    window.addEventListener('scroll', () => {
        if (window.scrollY < 50) {
            navItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('href') === '#inicio');
            });
        }
    });

    // ── Muestra mensaje de estado global en el formulario ──
    function showFormMessage(type, text) {
        const statusEl = document.getElementById('form-status');
        if (!statusEl) return;

        statusEl.textContent = text;
        statusEl.className   = `form-status form-status--${type}`;

        // Auto-limpiar después de 7 segundos
        clearTimeout(statusEl._timer);
        statusEl._timer = setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className   = '';
        }, 7000);
    }

});
