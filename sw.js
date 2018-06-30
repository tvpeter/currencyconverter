   //change the version of the service work after every hour
  const version = new Date().getHours();
  const cacheVal = "appCacheV"+version;


//cache all the site resources when the sw is installing
self.addEventListener('install', (event)=> {
  event.waitUntil(
    caches.open(cacheVal).then((cache)=> {
      return cache.addAll([
        './',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        './app.js',
        './src/css/stylev1.css',
        './src/img/404.gif',
        './src/img/sound.gif',
        './index.html',
        'https://free.currencyconverterapi.com/api/v5/currencies',
        './idb.js'
      ]);
    })
  );
});


self.addEventListener('activate', (event)=> {
  event.waitUntil(
    caches.keys().then((storedCaches)=> {
      return Promise.all(
        storedCaches.filter((storedCache)=> {
          return storedCache.startsWith('app') &&
                 storedCache != cacheVal;
        }).map((storedCache)=> {
          return caches.delete(storedCache);
        })
      );
    })
  );
});

 

//serve content from cache else fetch from network when there is a fetch request
self.addEventListener('fetch', (event)=>{
  event.respondWith(
    caches.match(event.request).then((response)=>{
      if(response) return response;
      return fetch(event.request);
    })

    );
});





