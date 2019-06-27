import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixture, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ViewChild, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By, BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { InverseSolverAnalysisComponent } from './inverse-solver-analysis.component';
import { PlotService } from '../services/plot.service';

let component: InverseSolverAnalysisComponent;
let fixture: ComponentFixture<InverseSolverAnalysisComponent>;

describe('inverse-solver-analysis component', () => {
    beforeEach(async(() => {
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

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));

    it('should get data from the plot service', async(() => {
      inject([HttpTestingController, PlotService],
        (httpMock: HttpTestingController, service: PlotService) => {
            // set the test parameters
            let paramData = { };
            // call the service
            service.getPlotData(paramData).subscribe((data: any) => {
              console.log('getPlotData in fwd solver test');
              component.plotObject = data;
            });
            // set the expectations for the HttpClient mock
            const req = httpMock.expectOne('https://vtsapi.azurewebsites.net/api/v1/values');
            expect(req.request.method).toEqual('POST');
            // set the fake data to be returned by the mock
            req.flush({"Id":"ROfRho","Detector":"R(ρ)","XAxis":"ρ","YAxis":"Reflectance","Legend":"R(ρ)","PlotList":[{"Label":"DistributedPointSourceSDA μa=0.01 μs'=1","Data":[[0.75,0.046625597794768131],[1.25,0.020915537635778064],[1.75,0.012316866807976681],[2.25,0.0080842309517170675],[2.75,0.005623379122941038],[3.25,0.0040562789854642293],[3.75,0.0030006454971476613],[4.25,0.0022621931768063925],[4.75,0.0017313878247261138],[5.25,0.001341834630580925],[5.75,0.00105114060787151],[6.25,0.00083118079655800016],[6.75,0.00066274418610378413],[7.25,0.00053240356107749358],[7.75,0.00043059663530889934],[8.25,0.00035040528102366],[8.75,0.00028675569244185416],[9.25,0.000235881710029713]]}]});
      });
      fixture.detectChanges();
      console.log(component);
    }));

    it('should have a form named form2', async(() => {
      fixture.detectChanges();
      const heading = fixture.debugElement.query(By.css('form'));
      expect(heading.nativeElement.name).toEqual('form2'); //This is a bad test because the value is hard-coded
    }));
}); 
