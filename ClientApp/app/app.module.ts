import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CdkTableModule} from "@angular/cdk/table";
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from "@angular/flex-layout";
import {InitializationService} from "./services/initialization.service";

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import {ExampleTableComponent} from './components/exampletable/exampletable.component';
import {LineChartComponent} from "./components/linechart/linechart.component";
import { SampleFormComponent } from './components/sampleform/samplefrom.component';


import {
    MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCardModule, MatButtonToggleModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatTableModule, MatCommonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatSliderModule, MatListModule, MatOptionModule, MatRippleModule, MatGridListModule, MatPaginatorModule,
    MatAutocompleteModule, MatFormFieldModule, MatPseudoCheckboxModule, MatSortModule, MatProgressSpinnerModule,MatExpansionModule
} from  "@angular/material";
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TitleCasePipe } from './pipes/titleCase.pipe';
import { HiddenDirective } from './directives/hidden.directive';
import { LoggingService } from './services/logging.service';
import { ThemeService } from './services/theme.service';

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
        FetchDataComponent,
        ExampleTableComponent,
        HomeComponent,
        SampleFormComponent,
        LineChartComponent,
        CapitalizePipe,
        TitleCasePipe,
        HiddenDirective
    ],
    imports: [
        ...materialModules,
        CommonModule,
        HttpModule,
        FormsModule,
        ChartsModule,
        FlexLayoutModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'sampleForm', component: SampleFormComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'ex-table', component: ExampleTableComponent },
            { path: 'linechart', component: LineChartComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    entryComponents:[SampleFormComponent],
    providers:[InitializationService, LoggingService, ThemeService]
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModuleShared {
}
