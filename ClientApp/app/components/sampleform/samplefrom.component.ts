import {Component, ElementRef, HostListener, ViewChild, Output, Input} from '@angular/core';
import {Renderer2} from '@angular/core'
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ObservableMedia} from '@angular/flex-layout';

@Component({
    selector: 'sample-form',
    templateUrl: './sampleform.component.html',
    styleUrls: ['./sampleform.component.scss']
})
export class SampleFormComponent {
}
