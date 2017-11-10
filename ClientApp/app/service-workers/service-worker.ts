(async function () {

  let w = self as any;
  w.addEventListener('install', function (event: any) {
    event.waitUntil(w.skipWaiting()); // Activate worker immediately
    console.log("installed");
  });

  w.addEventListener('activate', function (event: any) {
    event.waitUntil(w.clients.claim()); // Become available to all pages
    console.log('activated');
    // fetch('/index.html').then(r => console.log(r.body));
  });

  w.addEventListener('message', async function (event) {
    console.log(`Got message from client:${JSON.stringify(event, null, '\t')} ${event.data.message}`);
    let myClients = await w.clients.matchAll();
    console.log(myClients);
    let windowClient = myClients.find(i => true);
    windowClient.postMessage("hello client");
  });

  let manifest = await (await fetch("/dist/manifest.json")).json();
  if (manifest !== undefined) console.log(`I got the manifest  ${JSON.stringify(manifest, null, '\t')}`);

})();