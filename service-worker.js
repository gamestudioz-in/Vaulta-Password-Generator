// service-worker.js

self.addEventListener('install', function(event) {
  console.log('Service Worker installed.');
});

self.addEventListener('fetch', function(event) {
  // No caching – allow network fetch
});