/**
 * FRUTAD SpA — Configuración central
 * Modifica estos valores según tu entorno
 */
const FRUTAD_CONFIG = {
  // WhatsApp (formato internacional sin +)
  whatsapp: '56998939750',

  // Correo de contacto
  email: 'frutadspa@gmail.com',

  // Redes sociales principales
  socials: {
    facebook: 'https://www.facebook.com/people/Frutad-Spa/61559812423984/',
    instagram: 'https://www.instagram.com/frutadspa/'
  },

  // Formspree: crea cuenta gratis en https://formspree.io
  // y reemplaza YOUR_FORM_ID con tu ID de formulario
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',

  // Límite de envíos por sesión (anti-spam)
  maxFormSubmissions: 3,
  formCooldownMs: 60000,

  // Productos con enlaces WhatsApp personalizados
  products: [
    {
      id: 'citricos',
      name: 'Cítricos',
      description: 'Naranjas, limones, mandarinas y pomelos seleccionados para exportación con excelente vida útil.',
      tags: ['Exportación', 'Temporada'],
      image: 'https://lh3.googleusercontent.com/sitesv/AG8ngQXR0cwMpK0KWkpTGKqJFkusEKd8kZJrerHzUlamqBknyA3dWrSyY-AlpXgt9irwwG5Q0fDuMDBYdxnTUrexrmyOLUf6iY9x_4YvxGvSSLiArQursuHCesS1pUUIDep2ZnkucmRuyNB5AQLse-yeVtX3iHNT-COru2U5EB494ClcGoIf9kMytbGIyr7H=w800',
      whatsappMessage: 'Hola FRUTAD, quiero consultar por CÍTRICOS (naranjas, limones, mandarinas). ¿Tienen disponibilidad y cotización?'
    },
    {
      id: 'uvas',
      name: 'Uvas de mesa',
      description: 'Uvas de mesa premium con estándares internacionales de calidad, calibre y presentación.',
      tags: ['Premium', 'Mesas'],
      image: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUdPRAYyry42TxXoOBuZFXvIHGOZpwAapO7NDfnm4XtZvCvuIUUFIixKgHDVOFOiIS2wy8a9mvlrma1sfvhH_1KR7TQ0jRI8vcGRgIWvaOkXW-xpuXTMP_70lBQhxK_hQYWiZcxgLi21k7kwLGql6J6-lgLc6vZvQ3mIDmULdA_p7N3PUPnnfOCeGbk_Y0=w800',
      whatsappMessage: 'Hola FRUTAD, me interesan UVAS DE MESA para exportación. ¿Qué variedades y calibres tienen disponibles?'
    },
    {
      id: 'manzanas-peras',
      name: 'Manzanas y peras',
      description: 'Frutas de pepita de la zona central con manejo postcosecha para mercados exigentes.',
      tags: ['Pepita', 'Frío'],
      image: 'https://lh3.googleusercontent.com/sitesv/AG8ngQUme9bT8SdUWkRmjIutY3AbmVwvQwDAnKe5xWcf7rdfoeOTswZZe5VNv4lklDN2YQHcDddYeBe67r_VdYTNd2omQ_4DzL2q17AdN5KFdFh8aRTHr4N5O0CY-We-N9YqksSjGgVsuLn9nUoRvwHzWyEe-rNlbb4HLwpiOYG8Rd8id0-TdEeyGbX51OL7=w800',
      whatsappMessage: 'Hola FRUTAD, consulto por MANZANAS Y PERAS. Necesito información de stock y precios mayoristas.'
    },
    {
      id: 'frutas-tropicales',
      name: 'Frutas tropicales',
      description: 'Productos tropicales de origen latinoamericano con trazabilidad y condiciones de exportación.',
      tags: ['Latinoamérica', 'Tropicales'],
      image: 'https://lh3.googleusercontent.com/sitesv/AG8ngQWo5mpJa26rEQUIyfxzTald5jgPlvU0DWkXvnQHxFSKhpBQI_WCAR1hOJ0CGwYf05iiSjKXR0-26W7_Hych7k6slcCO5cCSH_AYlFkbo-8UMwTfqde56n3yBEOVtWB28jpz6kJ7UkxKm3YEKFIDJcatCXMx96u_p4zdjFRiB7YWN6tBo58sjwD-VEMV=w800',
      whatsappMessage: 'Hola FRUTAD, busco FRUTAS TROPICALES para importación/exportación. ¿Qué productos manejan?'
    },
    {
      id: 'exportacion-europa',
      name: 'Exportación a Europa',
      description: 'Asesoría y suministro para mercados europeos con requisitos fitosanitarios y comerciales.',
      tags: ['Europa', 'Certificaciones'],
      image: 'https://lh3.googleusercontent.com/sitesv/AG8ngQXtgJ9hoBAJZ6o5jq8bHGXPOStGVYjxENYa8rhw3SvAtgNWQGHLdUH8AaFvyAT3d9H1Dwb8i-N1AUNnfgyLgTbJ5LYuQBr8ZEB7IX9YHBxFOc3KzdEFdmwqXeBLfB6_2HAN9v5WgJqnYi0nIKba4P9tveQagze4iNn9Vd_flS6VZe9ty2PbKybtkDxPN5k=w800',
      whatsappMessage: 'Hola FRUTAD, necesito información sobre EXPORTACIÓN A EUROPA. ¿Qué productos y documentación requieren?'
    },
    {
      id: 'mayorista',
      name: 'Compra mayorista',
      description: 'Abastecimiento para distribuidores, retail y operadores logísticos con volúmenes flexibles.',
      tags: ['Mayorista', 'Distribución'],
      image: 'https://lh3.googleusercontent.com/sitesv/AG8ngQVgtv12CElQ42cIuxkkYo9Z_sQqFX7yGbadr_rKyfFrlirY8bvp3bdvP8oYS12GW72aNf2AlSpwNB2p-Xp0iqvDW_RUPe7R0hZMFi82Bz7awNlBzd3CycXdCI7tjg0_v6KBcN18b78HVUmDbsD8zVgs0UWVCYqo_Qvtd2XIkIlYBi_nZHR64cuXO8QE=w800',
      whatsappMessage: 'Hola FRUTAD, represento a un comprador MAYORISTA y necesito cotización por volumen. ¿Podemos coordinar?'
    }
  ],

  // Imágenes del carrusel (desde sitio original)
  gallery: [
    'https://lh3.googleusercontent.com/sitesv/AG8ngQXR0cwMpK0KWkpTGKqJFkusEKd8kZJrerHzUlamqBknyA3dWrSyY-AlpXgt9irwwG5Q0fDuMDBYdxnTUrexrmyOLUf6iY9x_4YvxGvSSLiArQursuHCesS1pUUIDep2ZnkucmRuyNB5AQLse-yeVtX3iHNT-COru2U5EB494ClcGoIf9kMytbGIyr7H=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUdPRAYyry42TxXoOBuZFXvIHGOZpwAapO7NDfnm4XtZvCvuIUUFIixKgHDVOFOiIS2wy8a9mvlrma1sfvhH_1KR7TQ0jRI8vcGRgIWvaOkXW-xpuXTMP_70lBQhxK_hQYWiZcxgLi21k7kwLGql6J6-lgLc6vZvQ3mIDmULdA_p7N3PUPnnfOCeGbk_Y0=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUme9bT8SdUWkRmjIutY3AbmVwvQwDAnKe5xWcf7rdfoeOTswZZe5VNv4lklDN2YQHcDddYeBe67r_VdYTNd2omQ_4DzL2q17AdN5KFdFh8aRTHr4N5O0CY-We-N9YqksSjGgVsuLn9nUoRvwHzWyEe-rNlbb4HLwpiOYG8Rd8id0-TdEeyGbX51OL7=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQWo5mpJa26rEQUIyfxzTald5jgPlvU0DWkXvnQHxFSKhpBQI_WCAR1hOJ0CGwYf05iiSjKXR0-26W7_Hych7k6slcCO5cCSH_AYlFkbo-8UMwTfqde56n3yBEOVtWB28jpz6kJ7UkxKm3YEKFIDJcatCXMx96u_p4zdjFRiB7YWN6tBo58sjwD-VEMV=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQXtgJ9hoBAJZ6o5jq8bHGXPOStGVYjxENYa8rhw3SvAtgNWQGHLdUH8AaFvyAT3d9H1Dwb8i-N1AUNnfgyLgTbJ5LYuQBr8ZEB7IX9YHBxFOc3KzdEFdmwqXeBLfB6_2HAN9v5WgJqnYi0nIKba4P9tveQagze4iNn9Vd_flS6VZe9ty2PbKybtkDxPN5k=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQVgtv12CElQ42cIuxkkYo9Z_sQqFX7yGbadr_rKyfFrlirY8bvp3bdvP8oYS12GW72aNf2AlSpwNB2p-Xp0iqvDW_RUPe7R0hZMFi82Bz7awNlBzd3CycXdCI7tjg0_v6KBcN18b78HVUmDbsD8zVgs0UWVCYqo_Qvtd2XIkIlYBi_nZHR64cuXO8QE=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQUgp2I_lL3hI7s5GvXgJ1yMXHICPY4bEf2FvXM8UJkHXkYsNN-nAbUPtx-LqVHrT8kbIeBYiN1ymcGFtoQ1_AegCpTV7pXIV9Xa-_xlnSMjYraHEwJ82Q9Zn5s17-PWy45EhGOr1IPmb7vtiv_aJ86_dZlsMJaNavYRy8icQFpw7_pV5uqkXyILorSZd8o=w1200',
    'https://lh3.googleusercontent.com/sitesv/AG8ngQWUuFj8KY6ZBUHVeBnMRhYSvpPVgRnILc7ePGmHqa2mvdRQ34ZALdRGHONJ69k4BX9DTE69dVS_5qz-E_L_ljue6arOaOi-xounwTCZbebJ88kxQcQdGl7nr3ttVgLOu-NuULnJpRdMCH7DCea8vnxswL00hRq-Qn7RKl638lPW11c5AAqQP-p8hBhT=w1200'
  ],

  // Opciones menú WhatsApp flotante
  whatsappMenu: [
    { label: 'Consulta general', message: 'Hola FRUTAD, quiero más información sobre sus servicios.' },
    { label: 'Cotización de productos', message: 'Hola FRUTAD, necesito una cotización de productos.' },
    { label: 'Exportación internacional', message: 'Hola FRUTAD, consulto por exportación internacional.' },
    { label: 'Compra mayorista', message: 'Hola FRUTAD, soy comprador mayorista y quiero coordinar.' },
    { label: 'Disponibilidad de stock', message: 'Hola FRUTAD, ¿qué productos tienen disponibles actualmente?' }
  ],

  // Ubicaciones mapa
  locations: {
    matriz: {
      title: 'Casa Matriz',
      address: 'Calle Centenario N°195, Sarmiento, Curicó, Región del Maule',
      mapUrl: 'https://maps.google.com/maps?q=Centenario+195,+Sarmiento,+Curicó,+Chile&output=embed&z=16',
      googleLink: 'https://www.google.com/maps/search/?api=1&query=Centenario+195,+Sarmiento,+Curicó'
    },
    sucursal: {
      title: 'Sucursal',
      address: 'Calle 18 de Septiembre Sitio S/N, Sarmiento, Curicó, Región del Maule',
      mapUrl: 'https://maps.google.com/maps?q=18+de+Septiembre,+Sarmiento,+Curicó,+Chile&output=embed&z=16',
      googleLink: 'https://www.google.com/maps/search/?api=1&query=18+de+Septiembre,+Sarmiento,+Curicó'
    }
  }
};

// Congelar config para evitar modificaciones en runtime
Object.freeze(FRUTAD_CONFIG);
