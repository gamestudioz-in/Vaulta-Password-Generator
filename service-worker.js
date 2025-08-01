const CACHE_NAME = 'vaulta-password-generator-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon192.png',
  './icon512.png',
  // Add any other assets you want to cache offline
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      }
    )
  );
});
