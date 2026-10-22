/* ==========================================================================
   UNIFIT - SERVICE WORKER (PWA OFFLINE CACHE v1.1.0)
   ========================================================================== */

const CACHE_NAME = "unifit-v1.1.0";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./logo.jpg",
  "./css/styles.css",
  "./js/utils/formatters.js",
  "./js/utils/validators.js",
  "./js/services/storage-service.js",
  "./js/services/api-service.js",
  "./js/services/exercise-service.js",
  "./js/services/auth-service.js",
  "./js/services/privacy-service.js",
  "./js/exercises-db.js",
  "./js/algorithm.js",
  "./js/auth.js",
  "./js/workout-session.js",
  "./js/workout-builder.js",
  "./js/subscription.js",
  "./js/evolution.js",
  "./js/ai-assistant.js",
  "./js/gamification.js",
  "./js/admin.js",
  "./js/radio.js",
  "./js/app.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[ServiceWorker] Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Ignora áudio e chamadas de streaming de rádio para o navegador gerenciar nativamente
  if (
    event.request.destination === "audio" ||
    event.request.url.includes("radio-browser.info") ||
    event.request.url.includes("audio") ||
    event.request.url.includes(".mp3") ||
    event.request.url.includes(".aac")
  ) {
    return;
  }

  // Network First com fallback para Cache para arquivos HTML e JS
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("./index.html");
          }
        });
      })
  );
});
