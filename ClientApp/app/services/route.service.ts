import {Injectable} from "@angular/core";


@Injectable()
export class RouteService {

	private readonly _apiPrefix: string = "/api/";
	private readonly _animalPrefix: string = this._apiPrefix + "animals/";
	private readonly _addAnimal: string = this._animalPrefix + "add";

	private readonly _logging: string = 'logging/info';

	public get AddAnimal(): string {
		return  this._addAnimal;
	}

	public get Logging(): string {
		return this._logging;
	}
}