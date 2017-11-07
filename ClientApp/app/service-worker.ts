let w = self as any;
function  sendMessage(message :string): Promise<{}>{
  return new Promise(function(resolve, reject) {
      var messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function(event) {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
    });
}
addEventListener('fetch', function(event:any) {
  console.log("he  tried to fetch something!");
  event.respondWith("Hi"
  );
});

self.addEventListener('message', function(event) {
  console.log(`Got message from client! ${event}`);
  event.ports[0].postMessage({'test': 'This is my response.'});
});

 w.clients.matchAll().then(function(clients) {
  clients.forEach(function(client) {
    console.log(client);
    client.postMessage('The service worker just started up.');
  });
});

w .addEventListener('install', function(event:any) {
  event.waitUntil(w.skipWaiting()); // Activate worker immediately
  console.log("I am installed!");
});

w .addEventListener('activate', function(event:any) {
  event.waitUntil(w.clients.claim()); // Become available to all pages
  console.log('activated !!!!!!!' + event);
  // fetch('/index.html').then(r => console.log(r.body));
});



