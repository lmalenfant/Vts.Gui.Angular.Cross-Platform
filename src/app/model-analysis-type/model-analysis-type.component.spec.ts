import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ModelAnalysisTypeComponent } from './model-analysis-type.component';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

describe('model-analysis-type component', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ModelAnalysisTypeComponent, TestHostComponent],
        imports: [FormsModule]
      })
      .compileComponents();
    }));

    beforeEach(async(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    }));

    it('should have a title of Detector Positions', async(() => {
      testHostComponent.modelAnalysisTypeComponent.modelAnalysisType = { value: 'R' };
      testHostFixture.detectChanges();
      const heading = testHostFixture.debugElement.query(By.css('.heading'));
      expect(heading.nativeElement.innerText).toEqual('Model/Analysis Output'); //This is a bad test because the value is hard-coded
    }));

    @Component({
        selector: `host-component`,
        template: `<app-model-analysis-type></app-model-analysis-type>`,
      })
      class TestHostComponent {
        @ViewChild(ModelAnalysisTypeComponent)
        public modelAnalysisTypeComponent: ModelAnalysisTypeComponent;
      }
});
