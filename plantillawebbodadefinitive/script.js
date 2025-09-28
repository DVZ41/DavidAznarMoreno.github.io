// Elementos
const overlay = document.getElementById('overlay');
const btnAcceder = document.getElementById('btnAcceder');
const contenido = document.getElementById('contenido');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;

// Al hacer clic en "Acceder a la invitación"
btnAcceder.addEventListener('click', () => {
  overlay.style.display = 'none';
  contenido.classList.remove('oculto');
  
  // Reproducir música automáticamente al acceder
  // Usar setTimeout para asegurar que el DOM esté listo
  setTimeout(() => {
    bgMusic.play().then(() => {
      isPlaying = true;
      updateMusicButton();
      console.log('Música iniciada automáticamente');
    }).catch((error) => {
      console.log('Música no se pudo reproducir automáticamente:', error);
      console.log('El usuario debe interactuar primero (políticas del navegador)');
      isPlaying = false;
      updateMusicButton();
    });
  }, 100);
});

// Control de música
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
  } else {
    bgMusic.play().then(() => {
      isPlaying = true;
    }).catch(() => {
      console.log('No se pudo reproducir la música');
    });
  }
  updateMusicButton();
});

// Actualizar el botón de música
function updateMusicButton() {
  if (isPlaying) {
    musicIcon.textContent = '🎵';
    musicToggle.classList.remove('paused');
    musicToggle.title = 'Pausar música';
  } else {
    musicIcon.textContent = '🔇';
    musicToggle.classList.add('paused');
    musicToggle.title = 'Reproducir música';
  }
}

// Inicializar el botón
updateMusicButton();

// ========== OPTIMIZACIONES DE RENDIMIENTO ==========

// Lazy Loading de imágenes
const lazyImages = document.querySelectorAll('.lazy-image');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy-image');
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
}, {
  root: null,
  rootMargin: '50px', // Cargar 50px antes de que sea visible
  threshold: 0.1
});

// Inicializar lazy loading después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  lazyImages.forEach(img => imageObserver.observe(img));
});

// Optimizar cuenta regresiva con requestAnimationFrame
let countdownRAF = null;

// Cuenta regresiva
function updateCountdown() {
  // Fecha de la boda: 11 de Julio de 2026 a las 20:15
  const weddingDate = new Date('2026-07-11T20:15:00').getTime();
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  } else {
    // Si ya pasó la fecha
    document.getElementById('days').textContent = 0;
    document.getElementById('hours').textContent = 0;
    document.getElementById('minutes').textContent = 0;
    document.getElementById('seconds').textContent = 0;
  }
}

// Inicializar cuenta regresiva
updateCountdown();
// Actualizar cada segundo con requestAnimationFrame para mejor rendimiento
function animateCountdown() {
  updateCountdown();
  countdownRAF = requestAnimationFrame(() => {
    setTimeout(animateCountdown, 1000);
  });
}
animateCountdown();

// Optimizar animaciones con requestAnimationFrame
function optimizeAnimations() {
  // Usar will-change para elementos que se van a animar
  const animatedElements = document.querySelectorAll('section, .hero-typewriter, .footer p');
  animatedElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
  });
}

// Debounce para optimizar scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Animaciones suaves al hacer scroll - OPTIMIZADO
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

// Crear observer para animaciones de entrada
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      
      // Animaciones especiales para ciertos elementos
      if (entry.target.classList.contains('galeria')) {
        animateGalleryImages(entry.target);
      }
      
      if (entry.target.classList.contains('info')) {
        animateInfoBlocks(entry.target);
      }
    }
  });
}, observerOptions);

// Observar todas las secciones - OPTIMIZADO
document.addEventListener('DOMContentLoaded', () => {
  // Lazy loading ya inicializado arriba
  
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Optimizar animaciones
  optimizeAnimations();
  
  // Precarga inteligente de recursos críticos
  preloadCriticalResources();
});

// Animación especial para galería
function animateGalleryImages(gallery) {
  const images = gallery.querySelectorAll('.fotos img');
  images.forEach((img, index) => {
    setTimeout(() => {
      img.classList.add('image-reveal');
    }, index * 150);
  });
}

// Efecto de máquina de escribir para banner y footer
function typeWriter(element, text, speed = 100) {
  element.innerHTML = '';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1);
      i++;
      setTimeout(type, speed);
    } else {
      // Pausa antes de borrar
      setTimeout(() => {
        eraseText(element, text, speed);
      }, 3000);
    }
  }
  
  type();
}

function eraseText(element, originalText, speed) {
  const currentText = element.innerHTML;
  let length = currentText.length;
  
  function erase() {
    if (length > 0) {
      element.innerHTML = currentText.substring(0, length - 1);
      length--;
      setTimeout(erase, speed / 2);
    } else {
      // Pausa antes de escribir de nuevo
      setTimeout(() => {
        typeWriter(element, originalText, speed);
      }, 1000);
    }
  }
  
  erase();
}

// Inicializar animaciones de texto
document.addEventListener('DOMContentLoaded', () => {
  const bannerElement = document.getElementById('texto-banner');
  const footerElement = document.getElementById('texto-footer');
  const heroElement = document.getElementById('texto-hero');
  
  const bannerText = 'Acompáñanos en el día más importante de nuestra vida';
  const footerText = '¡Gracias por acompañarnos y compartir con nosotros este momento tan importante y especial en nuestras vidas!';
  const heroText = '¡NOS CASAMOS!';
  
  // Iniciar animaciones con diferentes velocidades
  if (heroElement) {
    setTimeout(() => {
      typeWriter(heroElement, heroText, 150);
    }, 500);
  }
  
  if (bannerElement) {
    setTimeout(() => {
      typeWriter(bannerElement, bannerText, 120);
    }, 1000);
  }
  
  if (footerElement) {
    setTimeout(() => {
      typeWriter(footerElement, footerText.toUpperCase(), 100);
    }, 2000);
  }
});

// Animación especial para bloques de info
function animateInfoBlocks(infoSection) {
  const blocks = infoSection.querySelectorAll('.bloque');
  blocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.add('block-slide');
    }, index * 200);
  });
}

// Precarga inteligente de recursos críticos
function preloadCriticalResources() {
  // Precargar solo las imágenes que se verán pronto
  const criticalImages = ['foto1.jpg', 'foto2.jpg'];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // NO precargar audio - puede interferir con reproducción automática
  // El audio se carga cuando el usuario hace click en "Acceder"
}

// Variables para el scroll del header
let lastScrollTop = 0;
let scrollThreshold = 10; // Píxeles mínimos de scroll para activar

// Optimizar scroll con throttling - solo cambia opacidad
const optimizedScroll = debounce(() => {
  const header = document.querySelector('.header');
  const currentScroll = window.pageYOffset;
  
  // Solo actuar si hay un scroll significativo
  if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
    
    if (currentScroll > 50) {
      // Al hacer scroll, aumentar la opacidad del fondo
      header.classList.add('header-scrolled');
    } else {
      // En la parte superior, mantener opacidad original
      header.classList.remove('header-scrolled');
    }
    
    lastScrollTop = currentScroll;
  }
}, 15);

// Event listener optimizado para el scroll
window.addEventListener('scroll', optimizedScroll, { passive: true });

// Efecto sutil de parallax solo para la imagen hero (desactivado para evitar problemas)
// window.addEventListener('scroll', () => {
//   const heroImg = document.querySelector('.hero-img');
//   const scrolled = window.pageYOffset;
//   const heroSection = document.querySelector('.hero');
//   
//   if (heroImg && heroSection && scrolled < heroSection.offsetHeight) {
//     const parallaxSpeed = 0.3;
//     heroImg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
//   }
// });

// Variables para la navegación de imágenes
let currentImageIndex = 0;
let galleryImages = [];

// Funciones para el modal de imágenes (lightbox)
function openModal(imgElement) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const modalCaption = document.getElementById('modalCaption');
  
  // Obtener todas las imágenes de la galería
  galleryImages = document.querySelectorAll('.fotos img');
  
  // Encontrar el índice de la imagen clicada
  currentImageIndex = Array.from(galleryImages).indexOf(imgElement);
  
  modal.style.display = 'block';
  
  // Mostrar imagen y ocultar video
  modalImg.style.display = 'block';
  modalVideo.style.display = 'none';
  modalVideo.pause(); // Pausar video si estaba reproduciéndose
  
  modalImg.src = imgElement.src;
  modalCaption.textContent = imgElement.alt;
  
  // Prevenir scroll del body cuando el modal está abierto
  document.body.style.overflow = 'hidden';
  
  // Añadir event listener para cerrar con ESC y navegar con flechas
  document.addEventListener('keydown', handleKeyPress);
  
  // Actualizar visibilidad de flechas
  updateArrowsVisibility();
}

// Función específica para abrir video en modal
function openVideoModal() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const modalCaption = document.getElementById('modalCaption');
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');
  
  modal.style.display = 'block';
  
  // Mostrar video y ocultar imagen
  modalImg.style.display = 'none';
  modalVideo.style.display = 'block';
  
  // Configurar el video
  modalVideo.src = 'videoinvitacion.mp4';
  modalCaption.textContent = 'Video de invitación';
  
  // Pausar música de fondo si está reproduciéndose
  if (isPlaying && bgMusic) {
    bgMusic.pause();
    // Guardar el estado para reanudar después
    window.musicWasPausedForVideo = true;
  } else {
    window.musicWasPausedForVideo = false;
  }
  
  // Reproducir video automáticamente
  modalVideo.play().catch((error) => {
    console.log('No se pudo reproducir el video automáticamente:', error);
  });
  
  // Ocultar flechas de navegación para video
  prevArrow.style.display = 'none';
  nextArrow.style.display = 'none';
  
  // Prevenir scroll del body cuando el modal está abierto
  document.body.style.overflow = 'hidden';
  
  // Añadir event listener para cerrar con ESC
  document.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  const modalVideo = document.getElementById('modalVideo');
  
  modal.style.display = 'none';
  
  // Pausar video si estaba reproduciéndose
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0; // Reiniciar video
  }
  
  // Reanudar música de fondo si estaba reproduciéndose antes del video
  if (window.musicWasPausedForVideo && bgMusic) {
    bgMusic.play().then(() => {
      console.log('Música reanudada después del video');
    }).catch((error) => {
      console.log('No se pudo reanudar la música:', error);
    });
    // Limpiar la variable
    window.musicWasPausedForVideo = false;
  }
  
  // Restaurar scroll del body
  document.body.style.overflow = 'auto';
  
  // Remover event listener del ESC
  document.removeEventListener('keydown', handleKeyPress);
}

function previousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateModalImage();
  }
}

function nextImage() {
  if (currentImageIndex < galleryImages.length - 1) {
    currentImageIndex++;
    updateModalImage();
  }
}

function updateModalImage() {
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  
  modalImg.src = galleryImages[currentImageIndex].src;
  modalCaption.textContent = galleryImages[currentImageIndex].alt;
  
  updateArrowsVisibility();
}

function updateArrowsVisibility() {
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');
  
  // Ocultar flecha anterior si estamos en la primera imagen
  prevArrow.style.display = currentImageIndex === 0 ? 'none' : 'flex';
  
  // Ocultar flecha siguiente si estamos en la última imagen
  nextArrow.style.display = currentImageIndex === galleryImages.length - 1 ? 'none' : 'flex';
}

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowLeft') {
    previousImage();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  }
}

// Prevenir que el modal se cierre al hacer clic en la imagen o las flechas
document.addEventListener('DOMContentLoaded', () => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
  
  // También prevenir el cierre al hacer clic en las flechas
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-arrow')) {
      event.stopPropagation();
    }
  });
});

// ========== FUNCIONALIDADES SOCIALES ==========

// Configuración para compartir
const weddingData = {
  hashtag: '#DavidYLaura2026',
  title: 'David y Laura se casan',
  description: '¡Acompáñanos en el día más importante de nuestras vidas! 11 de Julio de 2026',
  url: window.location.href,
  image: window.location.origin + '/hero.jpg'
};

// Copiar hashtag al portapapeles
function copyHashtag() {
  const hashtag = weddingData.hashtag;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(hashtag).then(() => {
      showToast('¡Hashtag copiado! ' + hashtag);
    }).catch(() => {
      fallbackCopyTextToClipboard(hashtag);
    });
  } else {
    fallbackCopyTextToClipboard(hashtag);
  }
}

// Fallback para copiar texto (navegadores antiguos)
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('¡Hashtag copiado! ' + text);
    } else {
      showToast('No se pudo copiar. Cópialo manualmente: ' + text);
    }
  } catch (err) {
    showToast('Copia manualmente: ' + text);
  }
  
  document.body.removeChild(textArea);
}

// Compartir en WhatsApp
function shareOnWhatsApp() {
  const message = `${weddingData.title}\n\n${weddingData.description}\n\n${weddingData.hashtag}\n\n${weddingData.url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  showToast('¡Compartiendo en WhatsApp!');
}

// Compartir en Facebook
function shareOnFacebook() {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(weddingData.url)}&quote=${encodeURIComponent(weddingData.description + ' ' + weddingData.hashtag)}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');
  showToast('¡Compartiendo en Facebook!');
}

// Compartir en Twitter
function shareOnTwitter() {
  const tweetText = `${weddingData.description} ${weddingData.hashtag}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(weddingData.url)}`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
  showToast('¡Compartiendo en Twitter!');
}

// "Compartir" en Instagram (realmente abre Instagram)
function shareOnInstagram() {
  const instagramUrl = 'https://www.instagram.com/';
  window.open(instagramUrl, '_blank');
  showToast(`¡Recuerda usar ${weddingData.hashtag} en Instagram!`);
}

// Sistema de notificaciones toast
function showToast(message) {
  // Remover toast anterior si existe
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Crear nuevo toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Estilos inline para el toast
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(160, 130, 109, 0.95);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 10000;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
    max-width: 300px;
    text-align: center;
    line-height: 1.4;
  `;
  
  // Añadir animaciones CSS
  if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
      
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    if (toast && toast.parentNode) {
      toast.remove();
    }
  }, 3000);
}
