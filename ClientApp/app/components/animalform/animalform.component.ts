import {
	Component,
	ViewChild
} from "@angular/core";
import {NgForm} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
	selector: "animal-form",
	templateUrl: "./animalform.component.html",
	styleUrls: ["./animalform.component.scss"],
	providers: [DatePipe]
})
export class AnimalFormComponent {

	Animals: string[] = ["Rat", "Monkey", "Human", "Other"];
	AnimalType: string;
	NumericRegex: RegExp = /^\d+$/;

	@ViewChild('animalForm')
	public formObject: NgForm;

	constructor(private datePipe: DatePipe) {
	}
	
	model: { name: string, type: string, number: number, age: number, birthday: Date } = {
		name: "",
		type: "",
		number: null,
		age: null,
		birthday: null
	};

	get diagnostic() {
		return JSON.stringify(this.model);
	}

	get FormValue() {
		return JSON.stringify(this.formObject.form.value);
	}
	
	validateNumber(e: KeyboardEvent) {
		if (!this.NumericRegex.test(e.key) && e.keyCode != 8 && e.keyCode != 127) {
			e.preventDefault();
		}
	}
}

