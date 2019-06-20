import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { ForwardSolverEngineComponent } from './forward-solver-engine.component';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';

describe('forward-solver-engine component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ForwardSolverEngineComponent, TestHostComponent],
        imports: [FormsModule],
        schemas: [NO_ERRORS_SCHEMA]    
      })
      .compileComponents();
    }));

    beforeEach(async(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    }));

    it('should have a title of Detector Positions', async(() => {
      testHostComponent.forwardSolverEngineComponent.forwardSolverEngine = { 
          value: 'DistributedPointSourceSDA', 
          display: 'Standard Diffusion (Analytic: Distributed Point Source)' 
      };
      testHostComponent.forwardSolverEngineComponent.gaussianBeam = {
        show: false,
        diameter: 0.1
      };
      testHostFixture.detectChanges();
      const heading = testHostFixture.debugElement.query(By.css('.heading'));
      expect(heading.nativeElement.innerText).toEqual('Forward Solver Engine'); //This is a bad test because the value is hard-coded
    }));

    @Component({
        selector: `host-component`,
        template: `<app-forward-solver-engine></app-forward-solver-engine>`,
      })
      class TestHostComponent {
        @ViewChild(ForwardSolverEngineComponent)
        public forwardSolverEngineComponent: ForwardSolverEngineComponent;
      }
});
