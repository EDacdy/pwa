var cacheName = 'bs-0-0-0'
var apiCacheName = 'api-0-0-0'
var cacheFiles = [
  './#/',
  './index.html',
  './bundle.js',
  './style.css'
]

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
  console.log('Service Worker 状态： install')
  var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
    return cache.addAll(cacheFiles)
  })
  e.waitUntil(cacheOpenPromise)
})

// let cacheData = null

// self.addEventListener('message', function (e) {
//   cacheData = e.data
// })

self.addEventListener('fetch', function (e) {
  // 需要缓存的xhr请求
  var cacheRequestUrls = [
    '/book/search?',
    '/movie/search?',
    '/music/search?',
    '.jpg',
    '.png',
    '.gif'
  ]

  // 判断当前请求是否需要缓存
  var needCache = cacheRequestUrls.some(function (url) {
    return e.request.url.indexOf(url) > -1
  })

  if (needCache) {
    // 需要缓存
    // 使用fetch请求数据，并将请求结果clone一份缓存到cache
    // 此部分缓存后在browser中使用全局变量caches获取
    let cacheUrl = e.request.url.replace(/&callback.*?$/, '')

    e.respondWith(
      caches.match(cacheUrl).then(function (cache) {
        return cache || fetch(e.request).then(function (response) {
          caches.open(apiCacheName).then(function (cache) {
            cache.put(cacheUrl, response)
          })
          return response.clone()
        })
      })
    )

    // caches.match(e.request).then(function (cache) {
    //   return cache || fetch(e.request).then(function (response) {
    //     caches.open(apiCacheName).then(function (cache) {
    //       cache.put(cacheUrl, response)
    //     })
    //   })
    // })

    // caches.open(apiCacheName).then(function (cache) {
    //   return fetch(e.request).then(function (response) {
    //     let cacheUrl = e.request.url.replace(/&callback.*?$/, '')
    //     cache.put(cacheUrl, response.clone())
    //   })
    // })
  }
  /* ******************************* */
  else {
    // 非api请求，直接查询cache
    // 如果有cache则直接返回，否则通过fetch请求
    e.respondWith(
      caches.match(e.request).then(function (cache) {
        return cache || fetch(e.request)
      }).catch(function (err) {
        console.log(err)
        return fetch(e.request)
      })
    )
  }
})

self.addEventListener('activate', function (e) {
  // console.log('Service Worker 状态： activate')
  var cachePromise = caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (key) {
      if (key !== cacheName && key !== apiCacheName) {
        return caches.delete(key)
      }
    }))
  })
  e.waitUntil(cachePromise)
  return self.clients.claim()
})




// /*
//  Copyright 2016 Google Inc. All Rights Reserved.
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//  http://www.apache.org/licenses/LICENSE-2.0
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//  */

// // Names of the two caches used in this version of the service worker.
// // Change to v2, etc. when you update any of the local resources, which will
// // in turn trigger the install event again.
// const PRECACHE = 'precache-v1';
// const RUNTIME = 'runtime';

// // A list of local resources we always want to be cached.
// const PRECACHE_URLS = [
//   'index.html',
//   './', // Alias for index.html
//   'styles.css',
//   '../../styles/main.css',
//   'demo.js'
// ];

// // The install handler takes care of precaching the resources we always need.
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(PRECACHE)
//       .then(cache => cache.addAll(PRECACHE_URLS))
//       .then(self.skipWaiting())
//   );
// });

// // The activate handler takes care of cleaning up old caches.
// self.addEventListener('activate', event => {
//   const currentCaches = [PRECACHE, RUNTIME];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
//     }).then(cachesToDelete => {
//       return Promise.all(cachesToDelete.map(cacheToDelete => {
//         return caches.delete(cacheToDelete);
//       }));
//     }).then(() => self.clients.claim())
//   );
// });

// // The fetch handler serves responses for same-origin resources from a cache.
// // If no response is found, it populates the runtime cache with the response
// // from the network before returning it to the page.
// self.addEventListener('fetch', event => {
//   // Skip cross-origin requests, like those for Google Analytics.
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(RUNTIME).then(cache => {
//           return fetch(event.request).then(response => {
//             // Put a copy of the response in the runtime cache.
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });