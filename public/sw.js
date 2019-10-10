self.addEventListener('install',(event)=>{
	console.log('[Service worker]','Installing serviceWorker',event);
	event.waitUntil(
		caches.open('static')
		.then(function(cache){
			console.log('[Service worker] prefetching shell');
			cache.addAll([
				'/',
				'index.html',
				'/src/js/app.js',
				'/src/js/feed.js',
				'/src/js/fetch.js',
				'/src/js/promise.js',
				'/src/js/material.min.js',

				'/src/css/app.css',
				'/src/css/feed.css',
				'/src/css/help.css',

				'https://fonts.googleapis.com/css?family=Roboto:400,700',
				'https://fonts.googleapis.com/icon?family=Material+Icons',
				'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',

				'/src/images/main-image.jpg'

			])
		})
		);
})

self.addEventListener('activate',(event)=>{
	console.log('[Service worker]','Activating serviceWorker',event);
	return self.clients.claim();
});

self.addEventListener('fetch',(event)=>{
	// console.log('[Service worker]','Going through fetch event',event);
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response){
				return response;
			}else{
				return fetch(event.request)
			}
		})
	);
})