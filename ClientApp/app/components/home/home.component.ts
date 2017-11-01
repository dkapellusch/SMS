import { Component, HostListener,AfterViewInit} from '@angular/core';
import {InitializedService} from "../../services/initalized.service";
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    public Hovered :boolean = true;
    private _originalText :string = "S.M.S.";
    private _transitionText = "Sample. Management. System.";
    public SmsText =  this._transitionText;  
    
    constructor(public InitializedService : InitializedService ){
        
    }
    ngAfterViewInit() :void{
        this.InitializedService.Initialized = true;
        //Only for development with HMR should not survive to production
        if(this.InitializedService.Development && window != undefined && window != null){
            window.dispatchEvent(new Event('load'));
        }
    }

    @HostListener('window:load', ['$event'])
    onLoad(event){
        setTimeout(()=>{
            this.SmsText = this._originalText;
            this.Hovered=false;
           }, 2500);
    }

    public SmsHovered(eventData:Event):void {
        this.SmsText = this._transitionText;
        this.Hovered = true;
    }

    public SmsUnHovered(eventData:Event):void {
        this.Hovered = false;
        this.SmsText = this._originalText
    }
}
