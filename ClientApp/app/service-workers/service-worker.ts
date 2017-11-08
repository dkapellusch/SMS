let w = self as any;
console.log("I am starting");
w.addEventListener('install', function(event:any) {
  event.waitUntil(w.skipWaiting()); // Activate worker immediately
  console.log("I am installed!");
});

w.addEventListener('activate', function(event:any) {
  event.waitUntil(w.clients.claim()); // Become available to all pages
  console.log('activated !!!!!!!' + event);
  // fetch('/index.html').then(r => console.log(r.body));
});



w.addEventListener('message', function(event) {
  console.log(`Got message from client! ${event}`);
});
