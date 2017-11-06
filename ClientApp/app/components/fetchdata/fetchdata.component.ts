import { Component, Inject, ViewChild, ElementRef, ValueProvider } from '@angular/core';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import {MatDatepicker} from "@angular/material";

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    @ViewChild('picker') DatePicker :any;
    public SelectedTime:Date;
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));
    }

    public clicked(e:Event):void{
        let t = this.DatePicker._datepickerInput._elementRef.nativeElement;
        let val = t.value;
    }

    public onChange(e :Event):void{
      let x = e;  
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
