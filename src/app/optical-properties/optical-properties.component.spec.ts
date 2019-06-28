import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { OpticalPropertiesComponent } from './optical-properties.component';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('optical-properties component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [OpticalPropertiesComponent, TestHostComponent],
        imports: [FormsModule]
      })
      .compileComponents();
      testHostFixture = TestBed.createComponent(TestHostComponent);
      testHostComponent = testHostFixture.componentInstance;
      testHostComponent.opticalPropertiesComponent.opticalProperties = {
        mua: 0.01,
        musp: 1,
        g: 0.8,
        n: 1.4
      };
      testHostFixture.detectChanges();
  }));

    it('should have a μa value of 0.01', async(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#mua'));
        expect(testElement.nativeElement.value).toBe('0.01');
      });
    }));

    it('should have a μs` value of 1', async(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#musp'));
        expect(testElement.nativeElement.value).toBe('1');
      });
    }));

    it('should have a g value of 0.8', async(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#g'));
        expect(testElement.nativeElement.value).toBe('0.8');
      });
    }));

    it('should have an n value of 1.4', async(() => {
      testHostFixture.whenStable().then(() => {
        const testElement = testHostFixture.debugElement.query(By.css('#n'));
        expect(testElement.nativeElement.value).toBe('1.4');
      });
    }));

    @Component({
        selector: `host-component`,
        template: `<app-optical-properties></app-optical-properties>`,
      })
      class TestHostComponent {
        @ViewChild(OpticalPropertiesComponent)
        public opticalPropertiesComponent: OpticalPropertiesComponent;
      }
});
