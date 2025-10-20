// Bump this version whenever you deploy to ensure clients get fresh assets
const CACHE_NAME = 'kalogo-cache-v3';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CORE_ASSETS);
      // Activate new SW immediately
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      // Take control of all open pages immediately
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Network-first for navigations (HTML) to avoid stale app shell
  const isNavigation = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    event.respondWith(
      (async () => {
        try {
          const network = await fetch(req);
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, network.clone());
          return network;
        } catch (err) {
          const cached = await caches.match(req);
          return cached || caches.match('/index.html');
        }
      })()
    );
    return;
  }

  // Cache-first for other GET requests (assets, images, etc.)
  event.respondWith(
    caches.match(req).then((cached) =>
      cached || fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return res;
      }).catch(() => cached)
    )
  );
});
