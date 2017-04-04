var cacheName = 'niem-movement-app-cache-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/scripts.js',
  '/scripts/vendor.js',
  '/styles/main.css',
  '/styles/vendor.css',
  '/images/checkbox-blue.svg',
  '/images/ic-typeofproperty.svg',
  '/images/ic_carot.svg',
  '/images/ic_definition.svg',
  '/images/ic_export.svg',
  '/images/ic_gethub.png',
  '/images/icon_download.svg',
  '/images/icon_search.svg',
  '/images/mainbg.svg',
  '/images/movement_logo.svg'
];


// Install the service worker
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


// Fired after the install event, most useful when phaisng out an older verison of the service worker
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy.
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});
