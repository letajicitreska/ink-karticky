// Offline cache. Při každé změně obsahu zvyšte číslo verze, ať se lidem stáhne nová verze.
var VERSION = "ink-karticky-v1";
var FILES = [
  "./", "index.html", "style.css", "app.js", "data.js", "manifest.webmanifest",
  "fonts/haffer-regular.woff2", "fonts/haffer-bold.woff2",
  "img/ink-logo.png", "img/icon-192.png", "img/icon-512.png", "img/apple-touch-icon.png", "img/favicon-32.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Síť má přednost (vždy aktuální obsah), bez signálu se použije uložená kopie.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copy = r.clone();
      caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
      return r;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
