import {
    NgModule
} from '@angular/core';
import {
    BrowserModule
} from '@angular/platform-browser';
import {
    AppModuleShared
} from '../app.module';
import {
    AppComponent
} from '../components/app/app.component';
import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import "hammerjs";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId:"SMS"}),
        AppModuleShared
    ],
    entryComponents: [],
    providers: [{
        provide: 'BASE_URL',
        useFactory: getBaseUrl
    }]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}