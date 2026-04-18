const CACHE_NAME = 'zoraiz-offline-v1';
const OFFLINE_URL = '/offline.html';

// 1. Install: Only cache the offline page
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(OFFLINE_URL);
    })
  );
});

// 2. Fetch: Intercept failures and show the offline page
self.addEventListener('fetch', (event) => {
  // We only care about page navigation (loading a new page)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // This catch triggers if the network is down
        return caches.match(OFFLINE_URL);
      })
    );
  }
});

// 3. Activate: Clean up old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
