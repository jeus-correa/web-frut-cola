# FRUTAD SpA — Sitio Web Corporativo

Sitio web profesional para **FRUTAD SpA**, empresa de exportación de frutas ubicada en Curicó, Región del Maule, Chile.

## Estructura del proyecto

```
empresa de frutas informativo/
├── index.html          # Página principal
├── css/
│   ├── styles.css      # Estilos principales
│   └── animations.css  # Animaciones y revelaciones
├── js/
│   ├── config.js       # Configuración (WhatsApp, productos, Formspree)
│   ├── security.js     # Sanitización y validación
│   ├── main.js         # Navegación, carrusel, productos
│   └── contact.js      # Formulario de contacto
└── assets/
    └── images/         # Carpeta para imágenes locales (opcional)
```

## Cómo ver el sitio localmente

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html`, **o** usa un servidor local:

```bash
# Con Python
python -m http.server 8080

# Con Node.js (npx)
npx serve .
```

3. Visita `http://localhost:8080`

## Configurar el formulario de contacto (Formspree)

El formulario envía correos usando [Formspree](https://formspree.io) (gratis hasta 50 envíos/mes).

1. Crea una cuenta en https://formspree.io
2. Crea un nuevo formulario con el correo `frutadspa@gmail.com`
3. Copia tu endpoint (ej: `https://formspree.io/f/abcdefgh`)
4. Edita `js/config.js` y reemplaza:

```javascript
formspreeEndpoint: 'https://formspree.io/f/TU_ID_AQUI',
```

5. Confirma el correo desde el email que te envía Formspree.

## WhatsApp

Los enlaces de WhatsApp están configurados en `js/config.js`:

- Número: `56998939750`
- Cada producto tiene un mensaje personalizado
- El botón flotante incluye un menú con consultas rápidas

## Seguridad implementada (frontend)

| Medida | Descripción |
|--------|-------------|
| Content Security Policy | Restringe scripts, estilos e iframes permitidos |
| Sanitización de inputs | Limpieza de caracteres peligrosos |
| Validación de formulario | Email, teléfono, nombre y mensaje |
| Honeypot | Campo oculto anti-bots |
| Rate limiting | Máximo 3 envíos por sesión |
| Escape HTML | Previene XSS en contenido dinámico |
| rel="noopener noreferrer" | En enlaces externos |
| prefers-reduced-motion | Respeta preferencias de accesibilidad |

## Secciones del sitio

- **Inicio** — Hero con estadísticas animadas
- **Nosotros** — Historia y valores de la empresa
- **Productos** — 6 categorías con botón WhatsApp directo
- **Galería** — Carrusel automático con touch/swipe
- **Contacto** — Formulario + datos de contacto
- **Ubicación** — Mapa interactivo (Casa Matriz / Sucursal)

## Despliegue

Sube todos los archivos a tu hosting (Netlify, Vercel, cPanel, etc.) manteniendo la estructura de carpetas.

Para usar el dominio `frutadspa.cl`, apunta el DNS de tu dominio al hosting elegido.

## Personalización

Edita `js/config.js` para cambiar:
- Productos y mensajes de WhatsApp
- Imágenes del carrusel
- Datos de contacto
- Ubicaciones del mapa

## Próximos pasos recomendados

- [ ] Configurar Formspree con tu endpoint real
- [ ] Agregar favicon personalizado en `assets/images/`
- [ ] Descargar imágenes de Google Sites a `assets/images/` para independencia
- [ ] Configurar HTTPS en el hosting
- [ ] Agregar Google Analytics (opcional)

---

© FRUTAD SpA — Curicó, Chile
