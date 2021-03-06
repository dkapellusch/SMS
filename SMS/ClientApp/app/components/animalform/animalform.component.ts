import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { RouteService } from "../../services/route.service";
import { Animal } from "../../models/Animal";
import { AnimalService } from "../../services/animal.service";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: "animal-form",
    templateUrl: "./animalform.component.html",
    styleUrls: ["./animalform.component.scss"],
    providers: [DatePipe],
    encapsulation: ViewEncapsulation.None
})
export class AnimalFormComponent
{
    public Animals: string[] = ["Rat", "Monkey", "Human", "Other"];
    public AnimalType: string;
    public NumericRegex = /^\d+$/;
    public options = ["ICR", "W-Maze"];
    public inputOption = "";
    public Model: Partial<Animal> = {
        Name: "",
        AnimalType: "",
        Id: null,
        AgeInMonths: null,
        BirthDate: null
    };

    @ViewChild("animalForm")
    public formObject: NgForm;

    constructor(
        private datePipe: DatePipe,
        private http: HttpClient,
        private routes: RouteService,
        private _animals: AnimalService,
        public snackBar: MatSnackBar
    )
    {
    }

    public validateNumber(e: KeyboardEvent)
    {
        if (
            !this.NumericRegex.test(e.key) && e.keyCode != 8 && e.keyCode != 127 && e.keyCode != 9
        ) e.preventDefault();
    }

    public optionChanged(event: Event): void
    {
        this.inputOption = (event.currentTarget as any).value;
    }

    public get filteredOptions(): string[]
    {
        return this.options.filter(o => o.includes(this.inputOption));
    }

    public submit()
    {
        if (this.formObject.valid && this.formObject.touched)
        {
            const previousModel = this.Model;
            this._animals.AddAnimal(this.Model, () =>
            {
                this.Model = new Animal();
                const s = this.snackBar.open("Animal Saved", "Edit?", {
                    duration: 5000,
                    extraClasses: ["test", "snackBar"],
                    direction: "ltr"
                });
                s.onAction().subscribe(result => (this.Model = previousModel));
            });
        }
    }
}