// ========== SCRIPT DE OPTIMIZACIÓN ADICIONAL ==========

// Service Worker para caché avanzado (opcional - implementar en producción)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Critical Resource Hints
function addCriticalResourceHints() {
  // Preload next likely images
  const hints = [
    { href: 'foto3.jpg', as: 'image' },
    { href: 'foto4.jpeg', as: 'image' },
    { href: 'videoinvitacion.mp4', as: 'video' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = hint.href;
    link.as = hint.as;
    document.head.appendChild(link);
  });
}

// Connection Quality Detection
function detectConnectionQuality() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      // Disable videos and heavy animations for slow connections
      document.body.classList.add('low-bandwidth');
      console.log('Low bandwidth detected - optimizing experience');
    }
  }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  detectConnectionQuality();
  
  // Add resource hints after initial load
  setTimeout(() => {
    addCriticalResourceHints();
  }, 2000);
});

// Monitor Performance
function logPerformanceMetrics() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Performance Metrics:');
        console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
        console.log('Load Complete:', perfData.loadEventEnd - perfData.loadEventStart);
        console.log('Total Load Time:', perfData.loadEventEnd - perfData.fetchStart);
      }, 0);
    });
  }
}