const CACHE_NAME = 'petlink-cache-v3'; // Alterado para v3 para forçar atualização

const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/pages/login.html',
  '/styles/login.css',
  '/pages/cadastre-se.html',
  '/styles/cadastre-se.css',
  '/app.js',
  '/api.js',
  '/pages/cadastro-finalizado.html',
  '/styles/cadastro-finalizado.css',
  '/pages/tela-principal.html',
  '/styles/tela-principal.css',
  '/manifest.json',
  '/imgs/logo-petlink.png',
  '/imgs/Leopoldo.png',
  'https://img.icons8.com/ios/50/menu--v1.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-512px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-384px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-256px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-192px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-144px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-128px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-96px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-72px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-48px.png',
  '/AppImages/Leopoldo-icon/PWA-img/Leopoldo-36px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-512px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-384px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-256px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-192px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-144px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-128px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-96px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-72px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-48px.png',
  '/AppImages/PetLink-logo/PWA-img/logo-petlink-36px.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  // Verifica se a requisição é para uma rota de API
  if (event.request.url.includes('/api/')) {
    // Estratégia "network-first" para APIs
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Atualiza o cache com a nova resposta
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Se a rede falhar, tenta buscar do cache
          return caches.match(event.request)
            .then(response => {
              return response || new Response(JSON.stringify({ message: 'Offline: Dados indisponíveis' }), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        })
    );
  } else {
    // Estratégia "cache-first" para outros recursos
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .catch(() => {
              return caches.match('/index.html');
            });
        })
    );
  }
});