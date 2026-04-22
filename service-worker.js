const CACHE_NAME = 'tiger-rentank-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching offline assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignorar requisições não-GET e requisições para URLs externas à API REST (se existisse)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna do cache se encontrar, senão vai para a rede.
      // E aproveita para salvar no cache respostas que antes não estavam (estratégia stale-while-revalidate para fontes etc).
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Apenas armazenar GET requests comuns do app
          if(event.request.url.startsWith('http')){
            cache.put(event.request, responseToCache);
          }
        });

        return networkResponse;
      }).catch(() => {
        // Se a rede falhar e não estiver no cache, é porque está offline.
        // O index.html já foi carregado, então não tem problema.
        return null; // O ideal seria retornar uma página offline, mas por ser um PWA single page o app shell resolve.
      });
    })
  );
});
