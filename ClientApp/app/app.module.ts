import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "./modules/material.module";

import {InitializationService} from "./services/initialization.service";
import {LoggingService} from './services/logging.service';
import {ThemeService} from './services/theme.service';

import {AnimalTableComponent} from './components/animals/animals.component';
import {AnimalFormComponent} from './components/animalform/animalform.component';
import {AppComponent} from './components/app/app.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {HomeComponent} from './components/home/home.component';
import {FetchDataComponent} from './components/fetchdata/fetchdata.component';
import {ExampleTableComponent} from './components/exampletable/exampletable.component';
import {LineChartComponent} from "./components/linechart/linechart.component";
import {SampleFormComponent} from './components/sampleform/sampleform.component';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {TitleCasePipe} from './pipes/titleCase.pipe';
import {HiddenDirective} from './directives/hidden.directive';
import {RouteService} from "./services/route.service";


@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		FetchDataComponent,
		ExampleTableComponent,
		HomeComponent,
		SampleFormComponent,
		LineChartComponent,
		AnimalTableComponent,
		AnimalFormComponent,
		CapitalizePipe,
		TitleCasePipe,
		HiddenDirective
	],
	imports: [
		MaterialModule,
		CommonModule,
		HttpModule,
		HttpClientModule,
		FormsModule,
		ChartsModule,
		FlexLayoutModule,
		RouterModule.forRoot([
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: 'home', component: HomeComponent},
			{path: 'sampleForm', component: SampleFormComponent},
			{path: 'fetch-data', component: FetchDataComponent},
			{path: 'ex-table', component: ExampleTableComponent},
			{path: 'animal-table', component: AnimalTableComponent},
			{path: 'animalForm', component: AnimalFormComponent},
			{path: 'linechart', component: LineChartComponent},
			{path: '**', redirectTo: 'home'}
		])
	],
	entryComponents: [SampleFormComponent],
	providers: [InitializationService, LoggingService, ThemeService, RouteService, HttpClient]
	// schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModuleShared {
}
