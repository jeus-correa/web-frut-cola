/**
 * FRUTAD SpA — Formulario de contacto
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const mensajeField = document.getElementById('mensaje');
  const charCount = document.getElementById('charCount');

  const fields = {
    nombre: document.getElementById('nombre'),
    email: document.getElementById('email'),
    telefono: document.getElementById('telefono'),
    asunto: document.getElementById('asunto'),
    mensaje: mensajeField,
    privacidad: document.getElementById('privacidad')
  };

  // Contador de caracteres
  mensajeField?.addEventListener('input', () => {
    if (charCount) charCount.textContent = mensajeField.value.length;
  });

  // Limpiar errores al escribir
  Object.values(fields).forEach((field) => {
    field?.addEventListener('input', () => clearFieldError(field));
    field?.addEventListener('change', () => clearFieldError(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Honeypot — bots
    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot?.value) return;

    // Rate limiting
    const rateCheck = Security.checkRateLimit(
      'contact_form',
      FRUTAD_CONFIG.maxFormSubmissions,
      FRUTAD_CONFIG.formCooldownMs
    );

    if (!rateCheck.allowed) {
      showStatus(`Demasiados intentos. Espera ${rateCheck.waitSec} segundos antes de reintentar.`, 'error');
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    hideStatus();

    const payload = buildPayload();

    try {
      const response = await sendForm(payload);

      if (response.ok) {
        Security.recordRateLimit('contact_form');
        const msg = isFormspreeConfigured()
          ? '¡Mensaje enviado con éxito! Te contactaremos pronto.'
          : 'Se abrió tu cliente de correo. Envía el mensaje para completar la consulta.';
        showStatus(msg, 'success');
        form.reset();
        if (charCount) charCount.textContent = '0';
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error al enviar el formulario');
      }
    } catch (err) {
      showStatus(
        'No se pudo enviar el mensaje. Escríbenos directamente a frutadspa@gmail.com o por WhatsApp.',
        'error'
      );
      console.error('[Contact Form]', err.message);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  function validateForm() {
    let valid = true;

    const nombre = Security.sanitizeInput(fields.nombre?.value || '', 100);
    if (!Security.isValidName(nombre)) {
      setFieldError('nombre', 'Ingresa un nombre válido (mínimo 2 caracteres).');
      valid = false;
    }

    const email = Security.sanitizeInput(fields.email?.value || '', 254);
    if (!Security.isValidEmail(email)) {
      setFieldError('email', 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    const telefono = Security.sanitizeInput(fields.telefono?.value || '', 20);
    if (!Security.isValidPhone(telefono)) {
      setFieldError('telefono', 'Ingresa un teléfono válido.');
      valid = false;
    }

    if (!fields.asunto?.value) {
      setFieldError('asunto', 'Selecciona un tipo de consulta.');
      valid = false;
    }

    const mensaje = Security.sanitizeInput(fields.mensaje?.value || '', 2000);
    if (mensaje.length < 10) {
      setFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres.');
      valid = false;
    }

    if (!fields.privacidad?.checked) {
      setFieldError('privacidad', 'Debes aceptar el uso de tus datos.');
      valid = false;
    }

    return valid;
  }

  function buildPayload() {
    const asuntoLabels = {
      cotizacion: 'Cotización de productos',
      exportacion: 'Exportación internacional',
      mayorista: 'Compra mayorista',
      disponibilidad: 'Consulta de disponibilidad',
      otro: 'Otro'
    };

    const productoLabels = {
      citricos: 'Cítricos',
      uvas: 'Uvas de mesa',
      'manzanas-peras': 'Manzanas y peras',
      'frutas-tropicales': 'Frutas tropicales',
      mix: 'Varios / mix exportación'
    };

    const asuntoKey = fields.asunto?.value || '';
    const productoKey = document.getElementById('producto')?.value || '';

    return {
      name: Security.sanitizeInput(fields.nombre?.value || '', 100),
      email: Security.sanitizeInput(fields.email?.value || '', 254),
      phone: Security.sanitizeInput(fields.telefono?.value || '', 20),
      subject: `[FRUTAD Web] ${asuntoLabels[asuntoKey] || asuntoKey}`,
      product: productoLabels[productoKey] || 'No especificado',
      message: Security.sanitizeInput(fields.mensaje?.value || '', 2000),
      _replyto: Security.sanitizeInput(fields.email?.value || '', 254),
      _subject: `[FRUTAD Web] ${asuntoLabels[asuntoKey] || 'Consulta'}`,
      _template: 'table'
    };
  }

  function isFormspreeConfigured() {
    const endpoint = FRUTAD_CONFIG.formspreeEndpoint || '';
    return endpoint.length > 0 && !endpoint.includes('YOUR_FORM_ID');
  }

  async function sendForm(payload) {
    if (!isFormspreeConfigured()) {
      // Fallback mailto cuando Formspree aún no está configurado
      const body = encodeURIComponent(
        `Nombre: ${payload.name}\nEmail: ${payload.email}\nTeléfono: ${payload.phone || 'No indicado'}\nProducto: ${payload.product}\n\n${payload.message}`
      );
      window.location.href = `mailto:${FRUTAD_CONFIG.email}?subject=${encodeURIComponent(payload.subject)}&body=${body}`;
      return { ok: true };
    }

    const endpoint = FRUTAD_CONFIG.formspreeEndpoint;

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject,
        product: payload.product,
        message: payload.message,
        _replyto: payload._replyto,
        _subject: payload._subject
      })
    });
  }

  function setFieldError(fieldId, message) {
    const field = fields[fieldId] || document.getElementById(fieldId);
    const errorEl = document.getElementById(`error-${fieldId}`);
    field?.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(field) {
    if (!field?.id) return;
    field.classList.remove('error');
    const errorEl = document.getElementById(`error-${field.id}`);
    if (errorEl) errorEl.textContent = '';
  }

  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status show ${type}`;
  }

  function hideStatus() {
    formStatus?.classList.remove('show', 'success', 'error');
  }
});
