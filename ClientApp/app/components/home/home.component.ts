import { Component, HostListener, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { InitializationService } from "../../services/initialization.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements AfterViewInit
{
    private _originalText = "S.M.S.";
    private _transitionText = "Sample. Management. System.";

    public Hovered = true;
    public SmsText = this._transitionText;

    @ViewChild("banner")
    private _banner: ElementRef;
    // @ViewChild('graph') private _graph :LineChartComponent;

    constructor(private _initializationService: InitializationService, private _changeDetector: ChangeDetectorRef)
    {
    }

    public SmsHovered(eventData: Event): void
    {
        this.SmsText = this._transitionText;
        this.Hovered = true;
    }

    public SmsUnHovered(eventData: Event): void
    {
        this.Hovered = false;
        this.SmsText = this._originalText;
    }

    public get Initialized$(): boolean
    {
        return this._initializationService.Initialized;
    }

    public ngAfterViewInit(): void
    {
        setTimeout(() =>
        {
            if (!isNullOrUndefined(this) && ! isNullOrUndefined(this._changeDetector))
            {
                this._initializationService.Initialized = true;

                this._changeDetector.detectChanges();

                this._banner.nativeElement.style.display = "block";
                // this._graph.ChartElement.nativeElement.style.display = 'block';
                this.onLoad(null);
            }
        }, 1);
    }

    @HostListener("window:load", ["$event"])
    private onLoad(event)
    {
        setTimeout(
            () =>
            {
                this.SmsText = this._originalText;
                this.Hovered = false;
            }, 2500);
    }
}