import {
	Component,
	ViewChild
} from "@angular/core";
import {NgForm} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {RouteService} from "../../services/route.service";
import {Animal} from "../../models/Animal";

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

	constructor(private datePipe: DatePipe, private http: HttpClient, private routes: RouteService) {
	}

	model: Partial<Animal> = {
		Name: "",
		AnimalType: "",
		Id: null,
		Age: null,
		Birthday: null
	};

	validateNumber(e: KeyboardEvent) {
		if (!this.NumericRegex.test(e.key) && e.keyCode != 8 && e.keyCode != 127) {
			e.preventDefault();
		}
	}

	submit() {
		if (this.formObject.valid && this.formObject.touched) {
			this.http.post(this.routes.Animal, this.model)
				.subscribe(result => {
					},
					error => console.error(error)
				);
		}
	}
}

