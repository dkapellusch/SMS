
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
        // console.log(serviceWorkerUrl);
        if ("serviceWorker" in navigator) {
             navigator.serviceWorker.register('/service-worker.js').then(res => console.log("Registered!"));
             navigator.serviceWorker.ready.then(res => {
                 console.log("Sending message");
                 navigator.serviceWorker.controller.postMessage({message:"greetings"});
                 console.log("Sent message");
                }
                ).catch(e => console.log(`Failed to post message ${e}`));
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
