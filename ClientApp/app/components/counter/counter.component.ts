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

    public currentCount = 0;
    @ViewChild('test') 
    public t: ElementRef;
    private _checked = false; 
    public num: number = 0;
    public state = '';
    constructor(private renderer: Renderer2, public media:ObservableMedia ) {
        renderer.listen('window', 'resize', (event) => {
            // console.log(event.target.screen.width);
            // this.num = event.target.screen.width;
        });
        media.asObservable()
        .subscribe((change:any) => {
          this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
        });
    }

    get Number(): number {
        return this.currentCount + 1; //?
    }

    public get checked():boolean{
        return this._checked;
    }

    public set checked(value:boolean){
        this._checked = value;
    }
    public incrementCounter(el: ElementRef) {
        let e = this.t;
         this.renderer.setProperty(el, 'innerHTML', 'my content is here ' + ++this.currentCount);
    }

    get windowSize(): any
    {
        return window.screen.width;
    }
}
