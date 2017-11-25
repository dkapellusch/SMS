import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Output,
  Input
} from "@angular/core";
import { Renderer2 } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ObservableMedia } from "@angular/flex-layout";

@Component({
  selector: "sample-form",
  templateUrl: "./sampleform.component.html",
  styleUrls: ["./sampleform.component.scss"]
})
export class SampleFormComponent {
    
  Animals : string[] = ["Rat","Monkey","Human","Other"];
  AnimalType : string;
  NumericRegex: RegExp = /^\d+$/.compile();
  validateNumber(e: KeyboardEvent) {
      let a = this.AnimalType === 'Monkey';
      
      let valid = this.NumericRegex.test(e.key);
      if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8 && e.keyCode != 127 ){
          e.preventDefault();
      }
  }
}

