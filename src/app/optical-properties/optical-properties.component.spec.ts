import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { OpticalPropertiesComponent } from './optical-properties.component';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('optical-properties component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OpticalPropertiesComponent, TestHostComponent],
        imports: [FormsModule]
      })
      .compileComponents();
      testHostFixture = TestBed.createComponent(TestHostComponent);
      testHostComponent = testHostFixture.componentInstance;
      testHostComponent.opticalPropertiesComponent.opticalProperties = {
        title: "Optical Properties",
        mua: 0.01,
        musp: 1,
        g: 0.8,
        n: 1.4
      };
      testHostFixture.detectChanges();
  }));

    it('should have a μa value of 0.01', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#mua'));
        expect(testElement.nativeElement.value).toBe('0.01');
      });
    }));

    it('should have a μs` value of 1', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#musp'));
        expect(testElement.nativeElement.value).toBe('1');
      });
    }));

    it('should have a g value of 0.8', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#g'));
        expect(testElement.nativeElement.value).toBe('0.8');
      });
    }));

    it('should have an n value of 1.4', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#n'));
        expect(testElement.nativeElement.value).toBe('1.4');
      });
    }));

    it('should allow mua to be changed to 0.1', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#mua'));
        testElement.nativeElement.value = 0.1;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.opticalPropertiesComponent.opticalProperties.mua.toString()).toBe('0.1');
      });
    }));

    it('should allow mus` to be changed to 2', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#musp'));
        testElement.nativeElement.value = 2;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.opticalPropertiesComponent.opticalProperties.musp.toString()).toBe('2');
      });
    }));

    it('should allow g to be changed to 0.9', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#g'));
        testElement.nativeElement.value = 0.9;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.opticalPropertiesComponent.opticalProperties.g.toString()).toBe('0.9');
      });
    }));

    it('should allow n to be changed to 1.1', waitForAsync(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#n'));
        testElement.nativeElement.value = 1.1;
        testElement.nativeElement.dispatchEvent(new Event('input'));
        testHostFixture.detectChanges();
        expect(testHostComponent.opticalPropertiesComponent.opticalProperties.n.toString()).toBe('1.1');
      });
    }));

    @Component({
        selector: `host-component`,
        template: `<app-optical-properties></app-optical-properties>`,
      })
      class TestHostComponent {
        @ViewChild(OpticalPropertiesComponent, { static: true })
        public opticalPropertiesComponent: OpticalPropertiesComponent = new OpticalPropertiesComponent;
      }
});
