const CACHE_NAME = 'registro-academico-v3';
const ASSETS = [
    './index.html',
    './styles.css',
    './icon.svg',
    './manifest.json',
    './asistencia.html',
    './cotidiano.html',
    './tareas.html',
    './pruebas.html',
    './analisis.html',
    './estudiantes.html',
    './diagnostico.html',
    './comunicados.html',
    './bitacora.html',
    './calendario.html',
    './config.html'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
