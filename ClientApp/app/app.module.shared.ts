import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import {ExampleTableComponent} from './components/exampletable/exampletable.component';
import {SampleFormComponent} from "./components/sampleform/sampleform.component";

// import MaterialComponents from "./material.module";

import {CdkTableModule} from "@angular/cdk/table";

import {
    MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCardModule, MatButtonToggleModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatTableModule, MatCommonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatSliderModule, MatListModule, MatOptionModule, MatRippleModule, MatGridListModule, MatPaginatorModule,
    MatAutocompleteModule, MatFormFieldModule, MatPseudoCheckboxModule, MatSortModule, MatProgressSpinnerModule,MatExpansionModule
} from  "@angular/material";

let materialModules = [
    MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCardModule, MatButtonToggleModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatTableModule, MatCommonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatSliderModule, MatListModule, MatOptionModule, MatRippleModule, MatGridListModule, MatPaginatorModule,
    MatAutocompleteModule, MatFormFieldModule, MatPseudoCheckboxModule, MatSortModule, MatProgressSpinnerModule,
    CdkTableModule,MatExpansionModule
];
@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        ExampleTableComponent,
        HomeComponent,
        SampleFormComponent
    ],
    imports: [
        ...materialModules,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'sampleForm', component: SampleFormComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'ex-table', component: ExampleTableComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    entryComponents:[CounterComponent]
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModuleShared {
}
