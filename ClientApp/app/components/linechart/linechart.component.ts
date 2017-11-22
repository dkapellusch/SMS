import { InitializationService } from './../../services/initialization.service';
import { Component, HostListener, AfterViewInit, Input, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'linechart',
    template:`
<div [ngStyle.sm]="{'width':'90vw'}" style="width:80vw;height:90vh; margin:auto; display:none;"  #chartElement>
    <div>
        <canvas baseChart  [datasets]="lineChartData" [labels]="lineChartLabels" [options]="lineChartOptions"
            [colors]="lineChartColors" [legend]="lineChartLegend" [chartType]="lineChartType" (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)">
        </canvas>
    </div>
    <button *ngIf="ShowButton" (click)="randomize()">test</button>
    <mat-slider thumbLabel tickInterval="250" style="width:40%; margin-left:30%;" min="0" max="10000" step="100" value="1500" (input)="test($event)" ></mat-slider>
    <ng-content></ng-content>
</div>
`
})
export class LineChartComponent implements AfterViewInit {

  constructor(private _initializationService: InitializationService) {}
  @Input() public ShowButton: boolean = true;
  @ViewChild('chartElement') public ChartElement :ElementRef
  _value = 5000;
  get Value(){
    return this._value;
  }

  test(e:any){
    let previousValue = this._value;
    this._value = e.value;
    if(previousValue == 0) this.RandomizeOnInterval();
  }
  RandomizeOnInterval(){
    if (this.Value > 0) {
      setTimeout(function(){
        this.randomize();
        this.RandomizeOnInterval()
      }.bind(this), this.Value)
    };
  }
  ngAfterViewInit(): void {
    //Only for development with HMR should not survive to production
    if (this._initializationService.Development) {
      // window.dispatchEvent(new Event('load'));
      this.RandomizeOnInterval();
    }
  }
  public lineChartData: Array < any > = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B'
    },
    {
      data: [18, 48, 77, 9, 100, 27, 40],
      label: 'Series C'
    }
  ];
  public lineChartLabels: Array < any > = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array < any > = [{ // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array < any > = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label
      };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100)+1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

   let x = 2; 
  }
}
