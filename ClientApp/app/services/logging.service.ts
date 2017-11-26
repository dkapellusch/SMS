import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {RouteService} from "./route.service";


@Injectable()
export class LoggingService {
	constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private routes: RouteService) {

	}

	public Log(message: string, ...args: Array<any>): void {

		this.http.post(this.routes.Logging,
			{
				Message: message,
				Args: args
			})
			.subscribe(result => {
				},
				error => console.error(error)
			);
	}
}