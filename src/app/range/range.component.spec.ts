import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RangeComponent } from './range.component';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('range component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RangeComponent, TestHostComponent],
        imports: [FormsModule]
      })
      .compileComponents();
    }));

    beforeEach(async(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    }));

    it('should have a title of Detector Positions', async(() => {
      testHostComponent.rangeComponent.range = {
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
      testHostFixture.detectChanges();
      const heading = testHostFixture.debugElement.query(By.css('.heading'));
      expect(heading.nativeElement.innerText).toEqual('Detector Positions');
    }));

    @Component({
        selector: `host-component`,
        template: `<app-range></app-range>`,
      })
      class TestHostComponent {
        @ViewChild(RangeComponent)
        public rangeComponent: RangeComponent;
      }
});
