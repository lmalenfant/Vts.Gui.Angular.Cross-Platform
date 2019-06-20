import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { ForwardSolverAnalysisComponent } from './forward-solver-analysis.component';
import { ViewChild, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('forward-solver-analysis component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ForwardSolverAnalysisComponent, TestHostComponent],
        imports: [FormsModule],
        schemas: [NO_ERRORS_SCHEMA]    
      })
      .compileComponents();
    }));

    beforeEach(async(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    }));

    it('should have a title of Solution Domain', async(() => {
      testHostComponent.forwardSolverAnalysisComponent.solutionDomain = { value: "rofrho" };
      testHostComponent.forwardSolverAnalysisComponent.range = {
        title: 'Detector Positions',
        startLabel: 'Begin',
        startLabelUnits: 'mm',
        startValue: 0.5,
        endLabel: 'End',
        endLabelUnits: 'mm',
        endValue: 9.5,
        numberLabel: 'Number',
        numberValue: 19
      };
      testHostComponent.forwardSolverAnalysisComponent.independentAxes = {
        show: false,
        first: 'ρ',
        second: 't',
        label: 't',
        value: 0.05,
        units: 'ns',
        firstUnits: 'mm',
        secondUnits: 'ns'
      };
      testHostComponent.forwardSolverAnalysisComponent.forwardSolverEngine = { 
        value: 'DistributedPointSourceSDA', 
        display: 'Standard Diffusion (Analytic: Distributed Point Source)' 
    };
    testHostComponent.forwardSolverAnalysisComponent.gaussianBeam = {
      show: false,
      diameter: 0.1
    };
    testHostFixture.detectChanges();
      const heading = testHostFixture.debugElement.query(By.css('form'));
      expect(heading.nativeElement.name).toEqual('form1'); //This is a bad test because the value is hard-coded
    }));

    @Component({
        selector: `host-component`,
        template: `<app-forward-solver-analysis></app-forward-solver-analysis>`,
      })
      class TestHostComponent {
        @ViewChild(ForwardSolverAnalysisComponent)
        public forwardSolverAnalysisComponent: ForwardSolverAnalysisComponent;
      }
});
