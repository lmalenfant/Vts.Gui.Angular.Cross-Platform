import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { InverseSolverEngineComponent } from './inverse-solver-engine.component';

let component: InverseSolverEngineComponent;
let fixture: ComponentFixture<InverseSolverEngineComponent>;

describe('inverse-solver-engine component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ InverseSolverEngineComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(InverseSolverEngineComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
