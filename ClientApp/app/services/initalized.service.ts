import {Injectable} from "@angular/core";

@Injectable()
export class InitializedService{
    private _initialized :boolean = false;
    private _development :boolean = true;
    
    public get Initialized() :boolean{
        return this._initialized;
    }
    public set Initialized(value:boolean){
        this._initialized = value;
    }

    
    public get Development() :boolean{
        return this._development;
    }
}