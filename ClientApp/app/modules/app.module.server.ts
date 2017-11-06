import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from '../app.module';
import { AppComponent } from '../components/app/app.component';
import { CounterComponent } from '../components/counter/counter.component';

@NgModule({
    bootstrap: [ AppComponent],
    imports: [
        ServerModule,
        AppModuleShared
    ]
})
export class AppModule {
}
