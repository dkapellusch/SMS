/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { CounterComponent } from './counter.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import MaterialComponent from "../../material.module";
import {Renderer2} from "@angular/core";
let fixture: ComponentFixture<CounterComponent>;

describe('Counter component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [ MaterialComponent ], declarations: [CounterComponent],providers:[Renderer2] });
        fixture = TestBed.createComponent(CounterComponent);
        fixture.detectChanges();
    });

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Counter');
    }));

    it('should start with count 0, then increments by 1 when clicked', async(() => {
        const countElement = fixture.nativeElement.querySelector('strong');
        expect(countElement.textContent).toEqual('0');

        const incrementButton = fixture.nativeElement.querySelector('button');
        incrementButton.click();
        fixture.detectChanges();
        expect(countElement.textContent).toEqual('1');
    }));
});
