import { Component, ViewChild, HostListener, ElementRef,OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public Hovered :boolean = false;
    public Hovered2 :boolean = false;
    public SmsText =  "S.M.S.";
    private _originalText :string = this.SmsText;
    private _transitionText = "Sample. Management. System."

   
    ngOnInit(): void {
        this.SmsText = this._transitionText;
        this.Hovered2 = true;
        setTimeout(() => {
            this.SmsText = this._originalText;
            this.Hovered2 = false;
        }, 2500)
    }
    
    @ViewChild('sms') SMS :ElementRef;

    public SmsHovered(eventData:Event):void {
        this.SmsText = this._transitionText;
        this.Hovered2 = true;
    }
    public SmsUnHovered(eventData:Event):void {
        this.Hovered2 = false;
        this.SmsText = this._originalText
    }
}
