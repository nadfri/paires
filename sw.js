// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');
// console.log(`WorkBox of Couvre-Feu V2 loaded🎉`);

// const { registerRoute } = workbox.routing;
// const { StaleWhileRevalidate, CacheFirst, NetworkFirst } = workbox.strategies;
// //const { CacheableResponsePlugin } = workbox.cacheableResponse;

// // registerRoute(
// //   ({ request }) => request.destination === 'document' ||
// //     request.destination === 'script',
// //   new StaleWhileRevalidate({ cacheName: 'files-cache' })
// // );

// // registerRoute(
// //   ({ request }) => request.destination === 'style',
// //   new StaleWhileRevalidate({ cacheName: 'css-cache' })
// // );

// registerRoute(
//   ({ request }) => request.destination === 'script' ||
//     request.destination === 'style',
//   new StaleWhileRevalidate({ cacheName: 'files-cache' })
// );

// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({ cacheName: 'image-cache' }) // Use a custom cache name.
// );

// // Cache Google Fonts with a stale-while-revalidate strategy, with
// // a maximum number of entries.
// // registerRoute(
// //   ({url}) => url.origin === 'https://fonts.googleapis.com' ||
// //              url.origin === 'https://fonts.gstatic.com',
// //   new StaleWhileRevalidate({
// //     cacheName: 'google-fonts',
// //     plugins: [
// //       new ExpirationPlugin({maxEntries: 20}),
// //     ],
// //   }),
// // );

/******* */
// const cacheName = "files-cache-v1"; //change le nom pour mettre à jour le cache

// const contentToCache = ["/paires/", "/paires/index.html"];

// // Installing Service Worker
// self.addEventListener("install", (e) => {
// 	console.log("Service Worker Installation");
// 	e.waitUntil(
// 		caches.open("files-cache-v1").then((cache) => {
// 			console.log("Service Worker-Mise en cache globale");
// 			return cache.addAll(contentToCache);
// 		})
// 	);
// });

// // Fetching content using Service Worker
// self.addEventListener("fetch", (e) => {
// 	e.respondWith(
// 		caches.match(e.request).then((r) => {
// 			console.log(
// 				"Service Worker-Récupération de la ressource: " + e.request.url
// 			);
// 			return (
// 				r ||
// 				fetch(e.request).then((response) => {
// 					return caches.open(cacheName).then((cache) => {
// 						console.log(
// 							"Service Worker-Mise en cache de la nouvelle ressource: " +
// 								e.request.url
// 						);
// 						cache.put(e.request, response.clone());
// 						return response;
// 					});
// 				})
// 			);
// 		})
// 	);
// });

// //Efface l'ancien cache non utilisé
// self.addEventListener("activate", (e) => {
// 	e.waitUntil(
// 		caches.keys().then((keyList) => {
// 			return Promise.all(
// 				keyList.map((key) => {
// 					if (cacheName.indexOf(key) === -1) {
// 						return caches.delete(key);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

/*Nouveau Service Workers*/
const staticCacheName = "cache-v1";
const assets = ["/", "/index.html"];

// ajout fichiers en cache
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// Cache hit - return response
			if (response) {
				return response;
			}

			// IMPORTANT: Cloner la requête.
			// Une requete est un flux et est à consommation unique
			// Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
			var fetchRequest = event.request.clone();

			return fetch(fetchRequest).then(function (response) {
				if (!response || response.status !== 200 || response.type !== "basic") {
					return response;
				}

				// IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
				var responseToCache = response.clone();

				caches.open(staticCacheName).then(function (cache) {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		})
	);
});

// supprimer caches
self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keys) => {
			return Promise.add(
				keys
					.filter((key) => key !== staticCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});
