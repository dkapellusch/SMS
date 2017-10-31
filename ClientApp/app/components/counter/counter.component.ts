import {Component, ElementRef, HostListener, ViewChild, Output, Input} from '@angular/core';
import {Renderer2} from '@angular/core'
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
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
   
    constructor(private renderer: Renderer2) {
        renderer.listen('window', 'resize', (event) => {
            // console.log(event.target.screen.width);
            // this.num = event.target.screen.width;
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
         this.renderer.setProperty(el, 'innerHTML', 'my content is here ' + ++this.currentCount);
    }

    get windowSize(): any
    {
        return window.screen.width;
    }
}
