import { Component, HostListener, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { InitializationService } from '../../services/initialization.service';
@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
	public Hovered: boolean = true;
	private _originalText: string = 'S.M.S.';
	private _transitionText = 'Sample. Management. System.';
	public SmsText = this._transitionText;

	constructor(private _initializationService: InitializationService, private _changeDetector: ChangeDetectorRef) {}

	public SmsHovered(eventData: Event): void {
		this.SmsText = this._transitionText;
		this.Hovered = true;
	}

	public SmsUnHovered(eventData: Event): void {
		this.Hovered = false;
		this.SmsText = this._originalText;
	}

	public get Initialized$(): boolean {
		return this._initializationService.Initialized;
	}

	ngAfterViewInit(): void {
		this._initializationService.Initialized = true;
		this._changeDetector.detectChanges();
		//Only for development with HMR should not survive to production
		if (this._initializationService.Development && window != undefined && window != null) {
			window.dispatchEvent(new Event('load'));
		}
	}

	@HostListener('window:load', ['$event'])
	private onLoad(event) {
		setTimeout(
            () => {
            this.SmsText = this._originalText;
            this.Hovered = false;
		}, 2500);
	}
}
