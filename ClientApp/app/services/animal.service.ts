import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RouteService } from "./route.service";
import { Animal } from "../models/Animal";
import { LoggingService } from "./logging.service";

@Injectable()
export class AnimalService
{
    constructor(
        private _httpClient: HttpClient,
        private _routes: RouteService,
        private _logger: LoggingService
    )
    {
    }

    public AddAnimal(
        animal: Partial<Animal>,
        subscription: (o: Object) => void = o =>
        {
        }
    ): void
    {
        this._httpClient
            .post(this._routes.AddAnimal, animal)
            .subscribe(subscription, e => console.log(e));
    }
}