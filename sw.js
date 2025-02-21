// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

console.log('Service Worker is running');

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
      //            added to the cache when the ServiceWorker is installed
      const RECIPE_URLS = [
        '/',
        '/index.html',
        '/assets/scripts/main.js',
        '/assets/scripts/RecipeCard.js',
        '/assets/styles/main.css',
        "/assets/images/icons/0-star.svg",
        "/assets/images/icons/1-star.svg",
        "/assets/images/icons/2-star.svg",
        "/assets/images/icons/3-star.svg",
        "/assets/images/icons/4-star.svg",
        "/assets/images/icons/5-star.svg",
        "/assets/images/icons/arrow-down.png",
        "https://introweb.tech/assets/json/1_50-thanksgiving-side-dishes.json",
        "https://introweb.tech/assets/json/2_roasting-turkey-breast-with-stuffing.json",
        "https://introweb.tech/assets/json/3_moms-cornbread-stuffing.json",
        "https://introweb.tech/assets/json/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json",
        "https://introweb.tech/assets/json/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json",
        "https://introweb.tech/assets/json/6_one-pot-thanksgiving-dinner.json",
      ];
      return cache.addAll([]);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // We added some known URLs to the cache above, but tracking down every
  // subsequent network request URL and adding it manually would be very taxing.
  // We will be adding all of the resources not specified in the intiial cache
  // list to the cache as they come in.
  /*******************************/
  // This article from Google will help with this portion. Before asking ANY
  // questions about this section, read this article.
  // NOTE: In the article's code REPLACE fetch(event.request.url) with
  //       fetch(event.request)
  // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
  /*******************************/
  // B7. TODO - Respond to the event by opening the cache using the name we gave
  //            above (CACHE_NAME)
  // const putInCache = async (request, response) => {
  //   const cache = await caches.open(CACHE_NAME);
  //   await cache.put(request, response);
  // };
  
  // const cacheFirst = async (request) => {
  //   const responseFromCache = await caches.match(request);
  //   if (responseFromCache) {
  //     return responseFromCache;
  //   }
  //   const responseFromNetwork = await fetch(request);
  //   putInCache(request, responseFromNetwork.clone());
  //   return responseFromNetwork;
  // };
  // // B8. TODO - If the request is in the cache, return with the cached version.
  // //            Otherwise fetch the resource, add it to the cache, and return
  // //            network response.
  // event.respondWith(cacheFirst(event.request));
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
