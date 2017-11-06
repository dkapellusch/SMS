import 'reflect-metadata';
import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/modules/app.module.browser';

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
    const oldRootElem = document.querySelector("app");
    const newRootElem = document.createElement("app");
    const snackBar = document.querySelector("mat-dialog-container");
    const overlay = document.querySelector(".cdk-overlay-container");
    
    oldRootElem!.parentNode!.insertBefore(newRootElem, oldRootElem);
    modulePromise.then(appModule => {
      appModule.destroy();
      oldRootElem!.remove();
      if (snackBar){
        snackBar.remove();
      }
      if (overlay){
        overlay.remove();
      }
    });
  });
} else {
    enableProdMode();
}

// Note: @ng-tools/webpack looks for the following expression when performing production
// builds. Don't change how this line looks, otherwise you may break tree-shaking.
const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);
