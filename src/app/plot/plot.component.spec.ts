import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, inject, ComponentFixtureAutoDetect, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { PlotComponent } from './plot.component';
import { PlotService } from '../services/plot.service';

let component: PlotComponent;
let fixture: ComponentFixture<PlotComponent>;

describe('plot component', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PlotComponent],
            imports: [BrowserModule, HttpClientTestingModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                PlotService
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(PlotComponent);
        component = fixture.componentInstance;
    }));

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('should have data', waitForAsync(() => {
        inject([HttpTestingController, PlotService],
            (httpMock: HttpTestingController, service: PlotService) => {
                // set the test parameters
                let paramData = {}; // don't need to pass actual data because the return data is fake
                // call the service
                service.getPlotData(paramData, "forward").subscribe((data: any) => {
                    expect(data).toBeDefined;
                });
                // set the expectations for the HttpClient mock
                const req = httpMock.expectOne('https://localhost:5001/api/v1/forward');
                expect(req.request.method).toEqual('POST');
                // set the fake data to be returned by the mock
                req.flush({ "Id": "ROfRho", "Detector": "R(ρ)", "XAxis": "ρ", "YAxis": "Reflectance", "Legend": "R(ρ)", "PlotList": [{ "Label": "DistributedPointSourceSDA μa=0.01 μs'=1", "Data": [[0.75, 0.046625597794768131], [1.25, 0.020915537635778064], [1.75, 0.012316866807976681], [2.25, 0.0080842309517170675], [2.75, 0.005623379122941038], [3.25, 0.0040562789854642293], [3.75, 0.0030006454971476613], [4.25, 0.0022621931768063925], [4.75, 0.0017313878247261138], [5.25, 0.001341834630580925], [5.75, 0.00105114060787151], [6.25, 0.00083118079655800016], [6.75, 0.00066274418610378413], [7.25, 0.00053240356107749358], [7.75, 0.00043059663530889934], [8.25, 0.00035040528102366], [8.75, 0.00028675569244185416], [9.25, 0.000235881710029713]] }] });
            });
    }));
});
