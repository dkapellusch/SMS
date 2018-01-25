import {Injectable} from "@angular/core";


@Injectable()
export class RouteService
{
    private readonly _apiPrefix = "/api/";
    private readonly _animalPrefix = this._apiPrefix + "animals/";
    private readonly _addAnimal = this._animalPrefix + "add";

    private readonly _logging = "logging/info";

    public get AddAnimal(): string
    {
        return this._addAnimal;
    }

    public get Logging(): string
    {
        return this._logging;
    }
}