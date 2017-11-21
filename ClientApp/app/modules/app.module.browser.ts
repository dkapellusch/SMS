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
import { SampleFormComponent } from '../components/sampleform/samplefrom.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId:"SMS"}),
        AppModuleShared
    ],
    entryComponents: [SampleFormComponent],
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