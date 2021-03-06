import { Injectable } from "@angular/core";


@Injectable()
export class ThemeService
{
    private _activeTheme = Theme.Light;
    private _styles = {};

    public get ActiveTheme(): Theme
    {
        return this._activeTheme;
    }

    public set ActiveTheme(value: Theme)
    {
        this._activeTheme = value;
    }
}

class ThemeStyles
{
    constructor(private _theme: Theme)
    {
    }
}

enum Theme { Light, Dark }