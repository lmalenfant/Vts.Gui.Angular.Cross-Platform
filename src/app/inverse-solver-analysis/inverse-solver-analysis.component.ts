import { Component, OnInit } from '@angular/core';
import { ForwardSolverEngine } from '../forward-solver-engine/forward-solver-engine.model';
import { InverseSolverEngine } from '../inverse-solver-engine/inverse-solver-engine.model';
import { SolutionDomain } from '../solution-domain/solution-domain.model';
import { IndependentAxis } from '../solution-domain/independent-axis.model';
import { Range } from '../range/range.model';
import { OptimizationParameters } from '../optimization-parameters/optimization-parameters.model';
import { OpticalProperties } from '../optical-properties/optical-properties.model';
import { PlotService } from '../services/plot.service';
import { PlotObject } from '../plot/plot-object.model';

@Component({
  selector: 'app-inverse-solver-analysis',
  templateUrl: './inverse-solver-analysis.component.html',
  styleUrls: ['./inverse-solver-analysis.component.css']
}) 

/** inverse-solver-analysis component*/
export class InverseSolverAnalysisComponent implements OnInit {
  forwardSolverEngine: ForwardSolverEngine = { 
    value: 'DistributedPointSourceSDA', 
    display: 'Standard Diffusion (Analytic: Isotropic Point Source)'};
  inverseSolverEngine: InverseSolverEngine = { 
    value: 'DistributedPointSourceSDA', 
    display: 'Standard Diffusion (Analytic: Isotropic Point Source)' }; 
  solutionDomain: SolutionDomain = { value: "rofrho" };
  independentAxes: IndependentAxis = {
    show: false,
    first: 'ρ',
    second: 't',
    label: 't',
    value: 0.05,
    units: 'ns',
    firstUnits: 'mm',
    secondUnits: 'ns'
  };
  range: Range = {
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
  optimizationParameters: OptimizationParameters = { value: "muaandmusp"};
  forwardOpticalProperties: OpticalProperties = {
    mua: 0.01,
    musp: 1,
    g: 0.8,
    n: 1.4
  };
  initialGuessOpticalProperties: OpticalProperties = {
    mua: 0.01,
    musp: 1,
    g: 0.8,
    n: 1.4
  };
  plotObject: PlotObject; 
  //plotObjects: Array<PlotObject>;

  constructor(private plotData: PlotService) {

  }

  ngOnInit() {
    this.plotData.newPlotObject.subscribe(plotObject => this.plotObject = plotObject);
  }

  onSubmit() {
    var isSettings = {
      forwardSolverEngine: this.forwardSolverEngine.value,
      inverseSolverEngine: this.inverseSolverEngine.value,
      solutionDomain: this.solutionDomain.value,
      independentAxes: this.independentAxes,
      range: this.range,
      optimizationParameters: this.optimizationParameters.value,
      forwardOpticalProperties: this.forwardOpticalProperties,
      initialGuessOpticalProperties: this.initialGuessOpticalProperties
    };
    console.log(isSettings);
    console.log(JSON.stringify(isSettings));
    this.plotData.getPlotData(isSettings).subscribe((data: any) => {
      //this.plotObject = data;
      this.plotData.addNewPlot(data);
    });
  }
} 