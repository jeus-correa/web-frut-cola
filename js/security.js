/**
 * FRUTAD SpA — Utilidades de seguridad frontend
 */
const Security = (() => {
  'use strict';

  const HTML_ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"'/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
  }

  function sanitizeInput(str, maxLength = 500) {
    if (typeof str !== 'string') return '';
    return str
      .trim()
      .slice(0, maxLength)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  }

  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(email) && email.length <= 254;
  }

  function isValidPhone(phone) {
    if (!phone) return true;
    const cleaned = phone.replace(/[\s\-().+]/g, '');
    return /^[0-9]{8,15}$/.test(cleaned);
  }

  function isValidName(name) {
    return name.length >= 2 && name.length <= 100 && /^[\p{L}\s'.-]+$/u.test(name);
  }

  function buildWhatsAppUrl(number, message) {
    const safeMessage = sanitizeInput(message, 1000);
    return `https://wa.me/${number}?text=${encodeURIComponent(safeMessage)}`;
  }

  function checkRateLimit(key, maxAttempts, cooldownMs) {
    try {
      const storageKey = `frutad_rl_${key}`;
      const data = JSON.parse(sessionStorage.getItem(storageKey) || '{"count":0,"last":0}');
      const now = Date.now();

      if (now - data.last > cooldownMs) {
        data.count = 0;
      }

      if (data.count >= maxAttempts) {
        const waitSec = Math.ceil((cooldownMs - (now - data.last)) / 1000);
        return { allowed: false, waitSec: Math.max(waitSec, 1) };
      }

      return { allowed: true };
    } catch {
      return { allowed: true };
    }
  }

  function recordRateLimit(key) {
    try {
      const storageKey = `frutad_rl_${key}`;
      const data = JSON.parse(sessionStorage.getItem(storageKey) || '{"count":0,"last":0}');
      data.count += 1;
      data.last = Date.now();
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      /* sessionStorage no disponible */
    }
  }

  return {
    escapeHtml,
    sanitizeInput,
    isValidEmail,
    isValidPhone,
    isValidName,
    buildWhatsAppUrl,
    checkRateLimit,
    recordRateLimit
  };
})();
