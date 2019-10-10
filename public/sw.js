self.addEventListener('install',(event)=>{
	console.log('[Service worker]','Installing serviceWorker',event);
	event.waitUntil(
		caches.open('static')
		.then(function(cache){
			console.log('[Service worker] prefetching shell');
			cache.add('/')
			cache.add('/index.html')
			cache.add('/src/js/app.js')
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