// Kill switch for the service worker the old Jekyll/Chirpy site registered at
// this URL. Browsers re-fetch it on update: it clears the caches, unregisters
// itself and reloads open tabs so they get the current site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
    })(),
  );
});
