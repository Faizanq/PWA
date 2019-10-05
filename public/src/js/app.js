let deferredPrompt;
if('serviceWorker' in navigator){
	navigator.serviceWorker
	.register('/sw.js')
	.then(()=>{
		console.log('Service Worker Registered');
	});
}

window.addEvenetListener('beforeinstallprompt',(event)=>{
	console.log('Before installation');
	event.preventDefault();
	deferredPrompt = event;
	return null;
});

function showPopup(){
	if(deferredPrompt){
		
		deferredPrompt.prompt();

		deferredPrompt.userChoice.then(choiseResult=>{

			if(choiseResult.outcome == 'dismissed'){
				console.log('User cancelled the installtion');
			}else{
				console.log('User has install');
				deferredPrompt = null;
			}
		});
	}
}