import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RangeComponent } from './range.component';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('range component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RangeComponent, TestHostComponent],
        imports: [FormsModule]
      })
      .overrideComponent(TestHostComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostComponent.rangeComponent.range = {
          title: 'Detector Positions',
          axis: "rho",
          axisRange: {
            start: 0.5,
            stop: 9.5,
            count: 19
          },
          startLabel: 'Begin',
          startLabelUnits: 'mm',
          endLabel: 'End',
          endLabelUnits: 'mm',
          numberLabel: 'Number',
        };
        testHostFixture.detectChanges();
      }));

    it('should create', waitForAsync(() => {
      expect(testHostComponent).toBeDefined();
    }));

    it('should have a title of Detector Positions', waitForAsync(() => {
      const testElement = testHostFixture.debugElement.query(By.css('.heading'));
      expect(testElement.nativeElement.innerText).toEqual('Detector Positions');
    }));

    it('should have a start label of Begin', waitForAsync(() => {
      const testElement = testHostFixture.debugElement.query(By.css('#startLabel'));
      expect(testElement.nativeElement.innerText).toEqual('Begin');
    }));

    it('should have a begin value of 0.5', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#startValue'));
        expect(testElement.nativeElement.value).toBe('0.5');
      });
    }));

    it('should have mm as the start units', waitForAsync(() => {
      const testElement = testHostFixture.debugElement.query(By.css('#startUnits'));
      expect(testElement.nativeElement.innerText).toEqual('mm');
    }));

    it('should have an end label of End', waitForAsync(() => {
      const testElement = testHostFixture.debugElement.query(By.css('#endLabel'));
      expect(testElement.nativeElement.innerText).toEqual('End');
    }));

    it('should have an end value of 9.5', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#endValue'));
        expect(testElement.nativeElement.value).toBe('9.5');
      });
    }));

    it('should have mm as the end units', waitForAsync(() => {
      const testElement = testHostFixture.debugElement.query(By.css('#endUnits'));
      expect(testElement.nativeElement.innerText).toEqual('mm');
    }));

    it('should have a number label of Number', waitForAsync(() => {
      const testElement = testHostFixture.debugElement.query(By.css('#numberLabel'));
      expect(testElement.nativeElement.innerText).toEqual('Number');
    }));

    it('should have a number value of 19', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#numberValue'));
        expect(testElement.nativeElement.value).toBe('19');
      });
    }));

    it('should allow the start value to be changed to 0.25', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#startValue'));
        testElement.nativeElement.value = 0.25;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.rangeComponent.range.axisRange.start.toString()).toBe('0.25');
      });
    }));

    it('should allow the end value to be changed to 5.25', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#endValue'));
        testElement.nativeElement.value = 5.25;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.rangeComponent.range.axisRange.stop.toString()).toBe('5.25');
      });
    }));

    it('should allow the number value to be changed to 29', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#numberValue'));
        testElement.nativeElement.value = 29;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.rangeComponent.range.axisRange.count.toString()).toBe('29');
      });
    }));

    @Component({
        selector: `host-component`,
        template: `<app-range></app-range>`,
      })
      class TestHostComponent {
        @ViewChild(RangeComponent, { static: true })
        public rangeComponent: RangeComponent = new RangeComponent;
      }
});
