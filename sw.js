const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&display=swap',
  'https://unpkg.com/feather-icons'
];

// Install Event
self.addEventListener('install', (event) => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  // Claim all clients immediately so the new SW takes control
  event.waitUntil(clients.claim());
  
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin or extension requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    // Network First strategy
    fetch(event.request)
      .then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone the response and update the cache with the latest version
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      })
      .catch(() => {
        // If network fails (e.g., offline), fallback to the cached version
        return caches.match(event.request);
      })
  );
});
