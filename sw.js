const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = '/offline.html';

// 1. Install: Save the offline page to the browser cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(OFFLINE_URL);
    })
  );
});

// 2. Fetch: Intercept network requests
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If fetch fails (offline), return the cached offline page
        return caches.match(OFFLINE_URL);
      })
    );
  }
});
