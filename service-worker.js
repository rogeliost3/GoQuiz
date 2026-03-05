const CACHE_NAME = 'aeroquiz-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './aeroquiz.png'
  // Los JSON se cargan en IndexedDB, no se cachean aquí
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});