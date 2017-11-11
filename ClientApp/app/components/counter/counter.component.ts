import {Component, ElementRef, HostListener, ViewChild, Output, Input} from '@angular/core';
import {Renderer2} from '@angular/core'
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ObservableMedia} from '@angular/flex-layout';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
    @ViewChild('test') public t: ElementRef;
    public currentCount = 8;
    private _checked = false;
    public state = '';

    constructor(private renderer: Renderer2, public media:ObservableMedia ) {
        media.asObservable()
             .subscribe((change:any) => {
                  this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
             });
    }

    public get checked():boolean{
        return this._checked;
    }

    public set checked(value:boolean) {
        this._checked = value;
    }

    public incrementCounter(e:Event) {
        this.t.nativeElement.innerHTML = "123";
         this.renderer.setProperty(e.target, 'innerHTML', 'I changed the button! ' + ++this.currentCount);
    }
}
