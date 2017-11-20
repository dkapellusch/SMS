import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";



@Injectable()
export class LoggingService {
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {

    }

    public Log(message: string, ...args: Array<any>): void {
        this.http.post(this.baseUrl + 'logging/info', { Message: message, Args: args }).subscribe(result => {
        }, error => console.error(error));

    }
}