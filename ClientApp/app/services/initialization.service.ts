import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
@Injectable()
export class InitializationService{
    private _initialized :boolean = false;
    private _development :boolean = true;
    private _componentInitalized :[{componentName:string, initialized:boolean}];
    public get Initialized() :boolean{
        return this._initialized;
    }

    public set Initialized(value:boolean){
        this._initialized = value;
    }

    public get Development() :boolean{
        return this._development;
    }

    public Initialized2(component:any) :boolean{
        const name = component.name;
        const entry = this._componentInitalized.filter((c) => c.componentName == name);
        if(isNullOrUndefined(entry)){
            this._componentInitalized.push(name,)
        }
        return false;
    }
}