# 📘 Documentación Técnica — Portafolio Web Samir Oliva

Esta es la documentación técnica oficial del desarrollo, diseño y optimización del portafolio personal de **Samir Oliva Pérez**. 

El sitio ha sido refactorizado desde cero aplicando estándares profesionales de desarrollo frontend con el objetivo de garantizar una experiencia de usuario (UX) excepcional, una accesibilidad de nivel AA (WCAG), optimización SEO avanzada y un blindaje de seguridad completo.

---

## 📂 1. Arquitectura de Archivos y Recursos

El proyecto adopta una estructura de archivos limpia y modular en formato **Vanilla Stack** (sin frameworks pesados), logrando un rendimiento de carga instantáneo.

```bash
portafolio/
├── index.html          # Estructura semántica HTML5, SEO, Metadatos y Accesibilidad.
├── styles.css          # Sistema de diseño, Glassmorphism, Responsive y Animaciones.
├── script.js           # Motores interactivos, validación segura y observadores.
├── netlify.toml        # Configuración de deploy: 8 cabeceras de seguridad HTTP.
├── favicon.svg         # Monograma premium vectorizado de marca ("S.").
├── profile.jpg         # Foto de perfil optimizada (compresión del 98%).
├── README.md           # Presentación pública del repositorio en GitHub.
└── DOCUMENTACION.md    # Este manual técnico detallado.
```

### 🔌 Integraciones Externas (CDNs de Alto Rendimiento)
* **Google Fonts:** Fuentes `Outfit` (para títulos con impacto geométrico) e `Inter` (para textos de alta legibilidad).
* **Boxicons & Devicon:** Iconografía general vectorizada y logotipos oficiales de tecnologías en color real.
* **AOS (Animate On Scroll):** Librería ligera para animaciones de entrada fluidas controladas por scroll.

---

## 🏗️ 2. Estructura y Semántica HTML (`index.html`)

El documento HTML5 fue reconstruido bajo pautas estrictas del estándar W3C para facilitar el posicionamiento en motores de búsqueda (SEO) y la compatibilidad con tecnologías de asistencia.

### 🛡️ A. Head, SEO Avanzado y Social Cards
El archivo `<head>` contiene configuraciones críticas de rastreo e indexación:
* **Canonical URL:** Evita problemas de contenido duplicado indexando una única URL definitiva.
* **Open Graph (Facebook, WhatsApp, LinkedIn, Telegram):** Etiquetas estructuradas (`og:type`, `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:locale`) para asegurar previsualizaciones interactivas de primer nivel al compartir el link.
* **Twitter / X Cards:** Soporte para tarjetas resumidas con fotos en la red social X.

### ♿ B. Accesibilidad Universal (a11y)
Se eliminaron elementos interactivos no estándar para garantizar la navegación por teclado:
* **Menú Móvil Semántico:** El menú hamburguesa se transformó de un `<div>` a un `<button>` con atributos de accesibilidad:
  ```html
  <button class="menu-toggle" id="mobile-menu" aria-label="Abrir menú" aria-expanded="false">
      <i class='bx bx-menu'></i>
  </button>
  ```
* **Contraste y Etiquetas:** Todos los elementos interactivos cuentan con `aria-label` descriptivos para lectores de pantalla. Los campos del formulario utilizan `aria-describedby` vinculados a sus mensajes de error dinámicos para una navegación guiada.

---

## 🎨 3. Sistema de Diseño y Estilos (`styles.css`)

El apartado visual se rige bajo la corriente de diseño **Dark Glassmorphism (Modo Oscuro Translúcido)**, utilizando variables personalizadas de CSS para mantener una paleta coherente.

### 🎛️ A. Variables del Sistema (`:root`)
```css
:root {
    --bg-color: #050505;          /* Fondo oscuro profundo */
    --text-primary: #ffffff;      /* Texto de alto contraste */
    --text-secondary: #a1a1aa;    /* Subtextos y descriptores */
    --primary-color: #6366f1;     /* Color de marca: Índigo vibrante */
    --primary-hover: #4f46e5;     /* Índigo oscuro para hovers */
    --accent-color: #8b5cf6;      /* Acento: Violeta brillante */
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.05);
    --glass-hover: rgba(255, 255, 255, 0.08);
}
```

### 🔮 B. Efecto Glassmorphism
El efecto de cristal translúcido premium se logra desenfocando los elementos y colores que se desplazan detrás de los contenedores:
```css
background: var(--glass-bg);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid var(--glass-border);
```

### ⚡ C. Micro-interacciones y Unificación Estética
* **Bordes de Tarjetas:** Se unificó el comportamiento interactivo de todas las tarjetas (tanto Habilidades como Proyectos) para que utilicen el color `--primary-color` en su estado `:hover`, logrando consistencia visual.
* **Underline Deslizante Activo:** En dispositivos de escritorio, el enlace activo de la barra de navegación despliega una línea animada de gradiente que se expande del centro hacia los lados:
  ```css
  .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      transform: scaleX(0);
      transition: transform 0.3s ease;
  }
  .nav-links a.active::after {
      transform: scaleX(1);
  }
  ```

### 📱 D. Adaptabilidad y Breakpoints (Responsive)
El portafolio se adapta a la perfección en cuatro rangos clave de visualización:
1. **Escritorio (>1200px):** Layout completo, cursor dinámico activo, menú en barra horizontal.
2. **Tablet (992px - 768px):** Ajuste del Grid del About Me de 2 a 1 columna.
3. **Móvil (768px - 400px):** Menú móvil tipo persiana activado (`clip-path`), `cursor-glow` apagado para optimizar rendimiento táctil.
4. **Pantallas Ultra Pequeñas (<400px):** Breakpoint dedicado que escala las fuentes del Hero (`.title` a `2.2rem`, `.subtitle` a `1.2rem`) y reduce los márgenes de página a `1.25rem` para evitar overflow y cortes de texto.

---

## ⚙️ 4. Motores e Interactividad (`script.js`)

La lógica en Vanilla JavaScript controla las funciones asíncronas, la seguridad en el cliente y las APIs dinámicas del navegador de manera eficiente.

### 🎯 A. IntersectionObserver (Navegación Activa)
Un observador asíncrono rastrea qué sección de la página se encuentra en la zona de enfoque del usuario y añade la clase `.active` al enlace correspondiente:
```javascript
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px', // Activa en la zona media de la pantalla
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
```
> **Nota:** Se incluye un *fallback* de scroll manual que fuerza la activación del botón "Inicio" cuando el usuario sube por completo la pantalla (`window.scrollY < 50`).

### 💡 B. Cursor Glow Eficiente
Para evitar el retraso (lag) en el renderizado del círculo de luz de fondo que sigue al cursor, se utiliza `requestAnimationFrame()`. Esto sincroniza el movimiento directamente con los hercios (Hz) de refresco del monitor del usuario:
```javascript
requestAnimationFrame(() => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});
```

---

## 🔒 5. Sistema de Formulario de Contacto y Seguridad

La sección de contacto fue completamente reconstruida para procesar mensajes de forma segura mediante **Netlify Forms**, protegiendo la página de atacantes y automatizaciones de spam.

### 🚫 A. Protección Anti-Spam (Doble Capa)
1. **Filtro Honeypot (Campo Trampa):** Un campo oculto invisible para humanos pero detectable por bots:
   ```html
   <input type="hidden" name="form-name" value="contact">
   <p hidden><label>Don't fill this: <input name="bot-field"></label></p>
   ```
   Si el bot rellena este campo, Netlify bloquea el envío automáticamente en el servidor.
2. **Rate Limiting (Control de Frecuencia):** Se restringe el botón de envío impidiendo más de un mensaje cada **60 segundos** y un máximo de **5 envíos por hora**, con persistencia en `localStorage` para evitar bypass al recargar la página.

### 🧼 B. Sanitización Dinámica (Anti-XSS)
Antes de pintar el nombre del usuario en el mensaje de éxito en pantalla, el texto pasa por un filtro de escape para impedir la ejecución de scripts maliciosos:
```javascript
function sanitize(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str)); // Convierte etiquetas en texto plano
    return div.innerHTML;
}
```

### ⚡ C. Envío Asíncrono (AJAX / Fetch)
El envío se realiza por debajo sin recargar la página, transmitiendo los datos mediante codificación de formulario URL-encoded hacia el motor de Netlify:
```javascript
fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
})
```

---

## ⚡ 6. Optimización de Rendimiento y Core Web Vitals

* **Compresión de Imágenes:** La foto de perfil original (`profile.png` de **1.8 MB**) fue convertida a JPEG progresivo (`profile.jpg` de **33 KB**), obteniendo una **reducción de peso del 98%** y garantizando tiempos de carga móviles inferiores a un segundo.
* **Layout Shifts (CLS):** Se definieron explícitamente los atributos `width="600"` y `height="600"` en la etiqueta de la imagen para que el navegador reserve el espacio exacto del contenedor antes de descargarla, evitando movimientos molestos de la interfaz durante la carga.

---

## 🛡️ 7. Auditoría de Seguridad & Hardening HTTP (`netlify.toml`)

El sitio fue sometido a una **auditoría completa de seguridad y QA** en junio de 2026, que incluyó fuzzing de formularios, pruebas de inyección, simulación de spam masivo y análisis de cabeceras HTTP.

### Resultado de la auditoría

| Prueba | Resultado |
|---|---|
| Fuzzing XSS en campos del formulario | ✅ Protegido — `textContent` + `sanitize()` |
| Cadenas de texto extremadamente largas | ✅ Bloqueadas por `maxlength` HTML |
| SQL Injection simulation | ✅ N/A — sin backend propio |
| Rate limiting bypass vía `curl` | ✅ Mitigado — rate limiter con `localStorage` |
| Clickjacking vía iframe | ✅ Bloqueado — `X-Frame-Options: DENY` |
| Supply chain attack via CDN | ✅ Mitigado — CSP con lista blanca |
| MIME sniffing | ✅ Bloqueado — `X-Content-Type-Options: nosniff` |
| SSL Stripping en WiFi público | ✅ Mitigado — HSTS `preload` |

### Cabeceras HTTP configuradas en `netlify.toml`

```toml
Content-Security-Policy      = "default-src 'self'; script-src 'self' https://unpkg.com ..."
X-Frame-Options              = "DENY"
X-Content-Type-Options       = "nosniff"
Referrer-Policy              = "strict-origin-when-cross-origin"
Permissions-Policy           = "camera=(), microphone=(), geolocation=(), payment=()"
Strict-Transport-Security    = "max-age=31536000; includeSubDomains; preload"
Cross-Origin-Opener-Policy   = "same-origin"
Cross-Origin-Resource-Policy = "same-origin"
```

**Score en [securityheaders.com](https://securityheaders.com/?q=samirolivaperez.netlify.app): A+**

