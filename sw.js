self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("restaurant-info-v1").then(function(cache) {
      return cache.addAll([
        "/",
        "index.html",
        "restaurant.html",
        "js/main.js",
        "js/dbhelper.js",
        "js/restaurant_info.js",
        "css/styles.css",
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg",
        "img/7.jpg",
        "img/8.jpg",
        "img/9.jpg",
        "img/10jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        console.log("fetch error");
        return fetch(event.request)
          .then(function(response) {
            const cloneResponse = response.clone();
            caches.open("restaurant-info-v1").then(function(cache) {
              cache.put(event.request, cloneResponse);
            });
            return response;
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    })
  );
});
