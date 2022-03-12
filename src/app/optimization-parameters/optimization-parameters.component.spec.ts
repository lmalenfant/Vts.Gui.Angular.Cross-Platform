import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { OptimizationParametersComponent } from './optimization-parameters.component';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';

describe('optimization-parameters component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OptimizationParametersComponent, TestHostComponent],
        imports: [FormsModule],
        schemas: [NO_ERRORS_SCHEMA]    
      })
      .compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    }));

    it('should have a value of μa and μs', waitForAsync(() => {
      testHostComponent.optimizationParametersComponent.optimizationParameters = { value: "muaandmusp" };
      testHostFixture.detectChanges();
      expect(testHostComponent.optimizationParametersComponent.optimizationParameters.value).toBe('muaandmusp');
    }));

    @Component({
        selector: `host-component`,
        template: `<app-optimization-parameters></app-optimization-parameters>`,
      })
      class TestHostComponent {
        @ViewChild(OptimizationParametersComponent, { static: true })
        public optimizationParametersComponent: OptimizationParametersComponent = new OptimizationParametersComponent;
      }
});
