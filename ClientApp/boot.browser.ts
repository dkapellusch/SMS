import "reflect-metadata";
import "zone.js";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/modules/app.module.browser";
import { log } from "util";

async function getServiceWorker( serviceWorkerUrl: string ): Promise<ServiceWorker> {
  let registration = await navigator.serviceWorker.register(serviceWorkerUrl);
  console.log("registered");
  if (registration.installing) {
    console.log("Installing");
    return registration.installing;
  }
  if (registration.waiting) {
    console.log("Waiting");
    return registration.waiting;
  }
  if (registration.active) {
    console.log("Active");
    return registration.active;
  }
}

if (module.hot) {
  console.log(navigator.serviceWorker.getRegistrations());
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });

  module.hot.accept();
  module.hot.dispose(() => {
    const oldRootElem = document.querySelector("app");
    const newRootElem = document.createElement("app");
    const snackBar = document.querySelector("mat-dialog-container");
    const overlay = document.querySelector(".cdk-overlay-container");
    oldRootElem!.parentNode!.insertBefore(newRootElem, oldRootElem);
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then(appModule => {
        appModule.destroy();
        oldRootElem!.remove();
        if (snackBar) {
          snackBar.remove();
        }
        if (overlay) {
          overlay.remove();
        }
      });
  });
} else {

  enableProdMode();

  if ("serviceWorker" in navigator) {
    getServiceWorker("/service-worker.js").then(sw => {
      sw.postMessage({ message: "hello friend" });
     
    });

    navigator.serviceWorker.addEventListener("message", e => {
      console.log("I got a message from my friend the worker");
    });
  }
}
platformBrowserDynamic().bootstrapModule(AppModule);
