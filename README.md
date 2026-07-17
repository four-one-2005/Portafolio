<div align="center">

# 🚀 Samir Oliva Perez — Portafolio Web

**Desarrollador Backend · Estudiante de Ingeniería de Sistemas · Bolivia**

[![Deploy Status](https://img.shields.io/badge/deploy-live%20on%20netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://samirolivaperez.netlify.app)
[![Security Headers](https://img.shields.io/badge/security%20headers-A%2B-brightgreen?style=for-the-badge&logo=shield&logoColor=white)](https://securityheaders.com/?q=samirolivaperez.netlify.app)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

🌐 **[Ver sitio en vivo →](https://samirolivaperez.netlify.app)**

</div>

---

## 📌 Sobre este proyecto

Portafolio personal desarrollado en **Vanilla Stack** (HTML + CSS + JS puros, sin frameworks) con enfoque en rendimiento, accesibilidad y seguridad de producción. Diseñado con estética **Dark Glassmorphism** y animaciones fluidas controladas por scroll.

---

## ✨ Características

- 🎨 **Diseño Dark Glassmorphism** con paleta índigo/violeta y cursor glow dinámico
- 📱 **Responsive Design** — optimizado para móvil, tablet y escritorio
- ♿ **Accesibilidad WCAG AA** — navegación por teclado y lectores de pantalla
- 🔍 **SEO avanzado** — Open Graph, Twitter Cards, Canonical URL y metadatos completos
- 📬 **Formulario de contacto** seguro con Netlify Forms + honeypot anti-spam
- ⚡ **Animaciones AOS** sincronizadas con `requestAnimationFrame` para 0 lag
- 🛡️ **Cabeceras de seguridad HTTP** con puntuación A+ en securityheaders.com

---

## 🔒 Seguridad implementada

Este portafolio fue sometido a una **auditoría completa de seguridad y QA** que incluyó:

| Prueba | Resultado |
|---|---|
| Fuzzing de formulario (XSS, cadenas largas) | ✅ Protegido |
| SQL Injection simulation | ✅ N/A — sin backend propio |
| Rate limiting test (spam masivo) | ✅ Rate limiter con `localStorage` |
| Clickjacking (iframe embedding) | ✅ Bloqueado — `X-Frame-Options: DENY` |
| Supply chain attack via CDN | ✅ Mitigado con CSP estricta |
| MIME sniffing attack | ✅ `X-Content-Type-Options: nosniff` |
| SSL Stripping en redes públicas | ✅ HSTS `max-age=31536000; preload` |

### Cabeceras HTTP activas en producción

```http
Content-Security-Policy:    default-src 'self'; script-src 'self' https://unpkg.com ...
X-Frame-Options:            DENY
X-Content-Type-Options:     nosniff
Referrer-Policy:            strict-origin-when-cross-origin
Permissions-Policy:         camera=(), microphone=(), geolocation=()
Strict-Transport-Security:  max-age=31536000; includeSubDomains; preload
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

---

## 🗂️ Estructura del proyecto

```bash
portafolio/
├── index.html          # Estructura semántica HTML5, SEO y metadatos
├── styles.css          # Sistema de diseño, glassmorphism y responsive
├── script.js           # Interactividad, formulario seguro y observers
├── netlify.toml        # Config de deploy: 8 cabeceras de seguridad HTTP
├── favicon.svg         # Monograma vectorizado "S." de marca personal
├── profile.jpg         # Foto de perfil optimizada (98% compresión)
├── README.md           # Este archivo
└── DOCUMENTACION.md    # Documentación técnica detallada del proyecto
```

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| **HTML5 semántico** | Estructura, SEO, accesibilidad |
| **CSS3 Vanilla** | Glassmorphism, animaciones, responsive |
| **JavaScript ES6+** | IntersectionObserver, Fetch API, localStorage |
| **Netlify Forms** | Backend del formulario de contacto |
| **Netlify** | Hosting, HTTPS automático, CDN global |
| **AOS** | Animaciones controladas por scroll |
| **Boxicons / Devicon** | Iconografía vectorizada |
| **Google Fonts** | Inter + Outfit |

---

## ⚡ Rendimiento

- 📦 Imagen de perfil: **1.8 MB → 33 KB** (compresión del 98%)
- 🔲 Sin Layout Shifts (CLS 0) — dimensiones explícitas en imágenes
- 🚀 Tiempo de carga móvil < 1 segundo
- 🎯 Sin dependencias de Node.js ni paso de build

---

## 📫 Contacto

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samir-oliva-perez/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/four-one-2005)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/SAMIROLIVA3)

</div>

---

<div align="center">
  <sub>© 2026 Samir Oliva Perez · Santa Cruz, Bolivia</sub>
</div>
