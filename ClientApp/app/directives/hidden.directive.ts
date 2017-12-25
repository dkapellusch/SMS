import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({ selector: '[myHidden]' })
export class HiddenDirective {

    constructor(public el: ElementRef, public renderer: Renderer2) {}

    @Input() myHidden: boolean;

    ngOnInit(){
        // Use renderer to render the element with styles
        if(this.myHidden) {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}