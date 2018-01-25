import {
    Component } from "@angular/core";

@Component({
    selector: "sample-form",
    templateUrl: "./sampleform.component.html",
    styleUrls: ["./sampleform.component.scss"]
})
export class SampleFormComponent
{
    public SampleTypes: string[] = ["Brain", "Sectioned", "Gut", "Blood", "Other"];
    public SampleType: string;
    public NumericRegex = /^\d+$/;

    public validateNumber(e: KeyboardEvent)
    {
        if (!this.NumericRegex.test(e.key) && e.keyCode !== 8 && e.keyCode !== 127 && e.keyCode !== 9)
            e.preventDefault();
    }
}