import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By, BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { InverseSolverAnalysisComponent } from './inverse-solver-analysis.component';
import { PlotService } from '../services/plot.service';

let component: InverseSolverAnalysisComponent;
let fixture: ComponentFixture<InverseSolverAnalysisComponent>;

describe('inverse-solver-analysis component', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InverseSolverAnalysisComponent],
        imports: [BrowserModule, FormsModule, HttpClientTestingModule],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true },
          PlotService
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]    
      });
      fixture = TestBed.createComponent(InverseSolverAnalysisComponent);
      component = fixture.componentInstance;
    }));

    it('should have a form named form2', waitForAsync(() => {
      fixture.detectChanges();
      const heading = fixture.debugElement.query(By.css('form'));
      expect(heading.nativeElement.name).toEqual('form2'); //This is a bad test because the value is hard-coded
    }));
}); 
