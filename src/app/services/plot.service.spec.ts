import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlotService } from './plot.service';

describe('plot service', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                PlotService
            ]
        });
    }));

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
      }));

    it('expects service to fetch data',
        inject([HttpTestingController, PlotService],
        (httpMock: HttpTestingController, service: PlotService) => {
            // set the test parameters
            let paramData = {
                "forwardSolverEngine": "DistributedPointSourceSDA",
                "solutionDomain": "rofrho",
                "independentAxes": {
                    "show": false,
                    "first": "ρ",
                    "second": "t",
                    "label": "t",
                    "value": 0.05,
                    "units": "ns",
                    "firstUnits": "mm",
                    "secondUnits": "ns"
                },
                "range": {
                    "title": "Detector Positions",
                    "startLabel": "Begin",
                    "startLabelUnits": "mm",
                    "startValue": 0.5,
                    "endLabel": "End",
                    "endLabelUnits": "mm",
                    "endValue": 9.5,
                    "numberLabel": "Number",
                    "numberValue": 19
                },
                "opticalProperties": {
                    "mua": 0.01,
                    "mus": 1,
                    "g": 0.8,
                    "n": 1.4
                },
                "modelAnalysis": "R"
            };
            // call the service
            service.getPlotData(paramData).subscribe((data: any) => {
                expect(data.Detector).toBe("R(ρ)");
                expect(data.XAxis).toBe("ρ");
                expect(data.YAxis).toBe("Reflectance");
            });
            // set the expectations for the HttpClient mock
            const req = httpMock.expectOne('https://vtsapi.azurewebsites.net/api/v1/values');
            expect(req.request.method).toEqual('POST');
            // set the fake data to be returned by the mock
            req.flush({"Id":"ROfRho","Detector":"R(ρ)","XAxis":"ρ","YAxis":"Reflectance","Legend":"R(ρ)","PlotList":[{"Label":"DistributedPointSourceSDA μa=0.01 μs'=1","Data":[[0.75,0.046625597794768131],[1.25,0.020915537635778064],[1.75,0.012316866807976681],[2.25,0.0080842309517170675],[2.75,0.005623379122941038],[3.25,0.0040562789854642293],[3.75,0.0030006454971476613],[4.25,0.0022621931768063925],[4.75,0.0017313878247261138],[5.25,0.001341834630580925],[5.75,0.00105114060787151],[6.25,0.00083118079655800016],[6.75,0.00066274418610378413],[7.25,0.00053240356107749358],[7.75,0.00043059663530889934],[8.25,0.00035040528102366],[8.75,0.00028675569244185416],[9.25,0.000235881710029713]]}]});
    }));
});
