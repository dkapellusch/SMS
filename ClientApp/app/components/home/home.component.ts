import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent {
    public Hovered :boolean = false;
    public Hovered2 :boolean = false;
    public SmsText = "B.L.I.T.B.O.A.T";
    @ViewChild('sms') SMS :ElementRef;

    public SmsHovered(eventData:Event):void {
        this.SmsText = "Barnes Lab Is The Best Of All Time!"
        this.Hovered2 = true;
    }
    public SmsUnHovered(eventData:Event):void {
        this.Hovered2 = false;
        this.SmsText = "B.L.I.T.B.O.A.T"
    }
}
