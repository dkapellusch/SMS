import {Injectable, Inject} from "@angular/core";


@Injectable()
export class RouteService {
	public readonly BaseUrl: string;
	private readonly _animal: string = "api/Animals/add";
	private readonly _logging: string = 'logging/info';

	constructor(@Inject('BASE_URL') baseUrl: string) {
		this.BaseUrl = baseUrl;
	}

	public get Animal(): string {
		return this.BaseUrl + this._animal;
	}

	public get Logging(): string {
		return this.BaseUrl + this._logging;
	}
}