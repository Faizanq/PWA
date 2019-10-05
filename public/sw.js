self.addEventListener('install',(event)=>{
	console.log('[Service worker]','Installing serviceWorker',event);
})

self.addEventListener('activate',(event)=>{
	console.log('[Service worker]','Activating serviceWorker',event);
	return self.clients.claim();
});

self.addEventListener('fetch',(event)=>{
	console.log('[Service worker]','Going through fetch event',event);
	// event.respondWith(fetch(event.request));
})