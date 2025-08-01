const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install the service worker
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install event triggered');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching files:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[ServiceWorker] Failed to cache during install:', error);
      })
  );
});

// Activate the service worker
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate event triggered');

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Deleting old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] Fetch request for:', event.request.url);

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('[ServiceWorker] Serving from cache:', event.request.url);
        return response;
      }

      console.warn('[ServiceWorker] Not in cache, fetching:', event.request.url);
      return fetch(event.request).catch(error => {
        console.error('[ServiceWorker] Fetch failed:', error);
        throw error;
      });
    })
  );
});