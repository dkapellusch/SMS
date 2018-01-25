import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouteService} from "./route.service";


@Injectable()
export class LoggingService
{
    constructor(private http: HttpClient, private routes: RouteService)
    {
    }

    public Log(message: string, ...args: Array<any>): void
    {
        this.http.post(this.routes.Logging,
                {
                    Message: message,
                    Args: args
                })
            .subscribe(result =>
                {
                },
                error => console.error(error)
            );
    }
}