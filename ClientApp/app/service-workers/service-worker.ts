(async function() {
  let workerSelf = self as any;
  let claimed = false;

  workerSelf.addEventListener("install", function(event: any) {
    event.waitUntil(
      caches
        .open("SMS")
        .then(
          async c =>
            await c.addAll([
              "/",
              "/index.html",
              "/service-worker.js",
              "/home",
              "/sampleForm",
              "/animalForm",
              "/ex-table",
              "/animal-table",
              "/fetch-data",
              "/dist/vendor.css",
              "/dist/vendor.js",
              "/styles/css/site.css",
              "/dist/main-client.js",
              "/dist/vendor.css.gz",
              "/dist/vendor.js.gz",
              "/styles/css/site.css.gz",
              "/dist/main-client.js.gz",
              
            ]).catch(e => e)
        )
    );
    console.log("installed");
  });
  workerSelf.addEventListener("fetch", function(event) {
    console.log("Fetch event for ", event.request.url);
    event.respondWith(
      caches
        .match(event.request)
        .then(function(response) {
          if (response && !navigator.onLine) {
            console.log("Found ", event.request.url, " in cache");
            return response;
          }
          console.log("Network request for ", event.request.url);
          return fetch(event.request);
        })
        .catch(function(error) {
          console.log(`Couldn't get ${event.request}, network is down and it does not exist in the cache. [${error}]`);
        })
    );
  });

  workerSelf.addEventListener("activate", function(event: any) {
    event.waitUntil(workerSelf.clients.claim());
    console.log("activated");
    claimed = true;
  });

  workerSelf.addEventListener("message", async function(event) {
    console.log(
      `Got message from client:${JSON.stringify(event, null, "\t")} ${
        event.data.message
      }`
    );
    let myClients = await workerSelf.clients.matchAll();
    console.log(myClients);
    let windowClient = myClients.find(i => true);
    windowClient.postMessage("hello client");
  });

  if (claimed) {
    let myClients = await workerSelf.clients.matchAll();
    console.log(myClients);
    let windowClient = myClients.find(i => true);
    windowClient.postMessage("hello client");
  }
  // let manifest = await (await fetch("/dist/vendor-manifest.json")).json();
  // if (manifest !== undefined)
  //   console.log(`I got the manifest  ${JSON.stringify(manifest, null, "\t")}`);
})();
