import {Injectable} from "@angular/core";


@Injectable()
export class RouteService {
	private readonly _animal: string = "api/Animals/add";
	private readonly _logging: string = 'logging/info';

	public get Animal(): string {
		return  this._animal;
	}

	public get Logging(): string {
		return this._logging;
	}
}