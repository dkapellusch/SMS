const serviceWorkerUrl = require('file-loader!../../../../wwwroot/dist/service-worker.js');

import { Component, HostListener } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private static _initialized : false;

    @HostListener('window:load', ['$event'])
	private async onLoad(event) {
        console.log(serviceWorkerUrl);
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener('message', event => console.log(event.data.msg, event.data.url));
            navigator.serviceWorker.addEventListener('install', event => console.log("Installed!" + event.srcElement));
           let r =  await navigator.serviceWorker.register(serviceWorkerUrl);
           let reg :ServiceWorkerRegistration[] = await navigator.serviceWorker.getRegistrations();
           let manager = reg[0].pushManager;
           let state = await manager.permissionState();
           
           console.log(`Registered worker with scope ${r.scope} registrations are : ${reg}`);
        }    
    }
    sendMessage(message :string): Promise<{}>{
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
}
