import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { SolutionDomainComponent } from './solution-domain.component';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';

describe('solution-domain component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SolutionDomainComponent, TestHostComponent],
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
      testHostComponent.solutionDomainComponent.solutionDomain = { value: "rofrho" };
      testHostComponent.solutionDomainComponent.range = {
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
      testHostComponent.solutionDomainComponent.independentAxes = {
        show: false,
        first: 'ρ',
        second: 't',
        label: 't',
        value: 0.05,
        units: 'ns',
        firstUnits: 'mm',
        secondUnits: 'ns'
      };
      testHostFixture.detectChanges();
      const heading = testHostFixture.debugElement.query(By.css('.heading'));
      expect(heading.nativeElement.innerText).toEqual('Solution Domain'); //This is a bad test because the value is hard-coded
    }));

    @Component({
        selector: `host-component`,
        template: `<app-solution-domain></app-solution-domain>`,
      })
      class TestHostComponent {
        @ViewChild(SolutionDomainComponent)
        public solutionDomainComponent: SolutionDomainComponent;
      }
});
