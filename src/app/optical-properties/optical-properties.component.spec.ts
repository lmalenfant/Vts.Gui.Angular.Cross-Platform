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
    }));

    beforeEach(async(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    }));

    it('should have a title of Optical Properties', async(() => {
      testHostComponent.opticalPropertiesComponent.opticalProperties = {
        mua: 0.01,
        mus: 1,
        g: 0.8,
        n: 1.4
      };
      testHostFixture.detectChanges();
      const heading = testHostFixture.debugElement.query(By.css('.heading'));
      expect(heading.nativeElement.innerText).toEqual('Optical Properties');
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
