import {Component, Inject, ViewChild} from '@angular/core';
import {MatChipList} from "@angular/material";
import {LoggingService} from '../../services/logging.service';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    @ViewChild('picker') DatePicker: any;
    @ViewChild('t') chips: MatChipList;

    public SelectedTime: Date;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private logger: LoggingService) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(res =>
            this.forecasts = res as WeatherForecast[])

    }

    public send() {
        this.logger.Log("Hello Server! {0}", {'isFine?': true});
    }

    public fetchWeather() {
        this.http.get(this.baseUrl + 'api/SampleData/WeatherForecasts').subscribe(res =>
            this.forecasts = res as WeatherForecast[]);
    }

    public clicked(e: Event): void {
        let t = this.DatePicker._datepickerInput._elementRef.nativeElement;
        let val = t.value;
    }

}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
