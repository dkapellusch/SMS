(async function(){
  let w = self as any;
  w.addEventListener('install', function(event:any) {
    event.waitUntil(w.skipWaiting()); // Activate worker immediately
    console.log("installed");
  });
  
  w.addEventListener('activate', function(event:any) {
    event.waitUntil(w.clients.claim()); // Become available to all pages
    console.log('activated');
    // fetch('/index.html').then(r => console.log(r.body));
  });
  
  w.addEventListener('message', function(event) {
    console.log(`Got message from client! ${event.data.message}`);
  });

  let manifest = await (await fetch("/dist/manifest.json")).json();
  console.log(`I got the m  ${manifest[Object.keys(manifest)[0]]}`);
 
})();

