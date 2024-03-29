import { Component, OnInit } from '@angular/core';
import { ForwardSolverEngine } from '../forward-solver-engine/forward-solver-engine.model';
import { InverseSolverEngineList } from './inverse-solver-analysis-list';
import { GaussianBeam } from '../forward-solver-engine/gaussian-beam.model';
import { ModelAnalysisType } from '../model-analysis-type/model-analysis-type.model';
import { SolutionDomain } from '../solution-domain/solution-domain.model';
import { IndependentAxis } from '../solution-domain/independent-axis.model';
import { Range } from '../range/range.model';
import { OptimizationParameters } from '../optimization-parameters/optimization-parameters.model';
import { OptimizerType } from '../optimizer-type/optimizer-type.model';
import { OpticalProperties } from '../optical-properties/optical-properties.model';
import { PlotService } from '../services/plot.service';
import { PlotObject } from '../plot/plot-object.model';
import { Axis } from '../axis/axis.model';

@Component({
  selector: 'app-inverse-solver-analysis',
  templateUrl: './inverse-solver-analysis.component.html'
})

/** inverse-solver-analysis component*/
export class InverseSolverAnalysisComponent implements OnInit {
  id: string = 'Inverse';
  forwardSolverEngine: ForwardSolverEngine = {
    value: 'PointSourceSDA',
    display: 'Standard Diffusion (Analytic: Isotropic Point Source)'
  };
  gaussianBeam: GaussianBeam = {
    show: false,
    diameter: 0.1
  };
  fsEngineList = InverseSolverEngineList;
  inverseSolverEngine: ForwardSolverEngine = {
    value: 'PointSourceSDA',
    display: 'Standard Diffusion (Analytic: Isotropic Point Source)'
  };
  inverseGaussianBeam: GaussianBeam = {
    show: false,
    diameter: 0.1
  };
  isEngineList = InverseSolverEngineList;
  solutionDomain: SolutionDomain = { value: 'ROfRho' };
  independentAxes: IndependentAxis = {
    show: false,
    first: 'ρ',
    second: 'time',
    label: 'time',
    value: 0.05,
    units: 'ns',
    firstUnits: 'mm',
    secondUnits: 'ns'
  };
  range: Range = {
    title: 'Detector Positions',
    axis: 'rho',
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
  optimizationParameters: OptimizationParameters = { value: 'MuaMusp' };
  optimizerType: OptimizerType = { value: 'MPFitLevenbergMarquardt' };
  forwardOpticalProperties: OpticalProperties = {
    title: 'Forward Simulation Optical Properties',
    mua: 0.01,
    musp: 1,
    g: 0.8,
    n: 1.4
  };
  initialGuessOpticalProperties: OpticalProperties = {
    title: 'Initial Guess Optical Properties',
    mua: 0.01,
    musp: 1,
    g: 0.8,
    n: 1.4
  };
  modelAnalysisType: ModelAnalysisType = { value: 'R' };
  noiseValue = '0';

  measuredData: number[][] = [];

  plotObject: PlotObject = new PlotObject;
  //plotObjects: Array<PlotObject>;

  constructor(private plotData: PlotService) {
    console.log("Constructor - InverseSolverAnalysisComponent");
  }

  ngOnInit() {
    this.plotData.newPlotObject.subscribe(plotObject => this.plotObject = plotObject);
  }

  buildSettings(type: string) {
    let xAxis = new Axis();
    xAxis.axis = this.range.axis;
    xAxis.axisRange = this.range.axisRange;
    let independentAxis: Axis | null = new Axis();
    if (this.independentAxes.label == 'ρ') {
      independentAxis.axis = 'rho';
    } else {
      independentAxis.axis = this.independentAxes.label;
    }
    independentAxis.axisValue = this.independentAxes.value;
    if (!this.independentAxes.show) {
      independentAxis = null;
    }

    var settings: any = {};
    settings.forwardSolverType = this.forwardSolverEngine.value;
    settings.solutionDomain = this.solutionDomain.value;
    settings.independentAxis = independentAxis;
    settings.xAxis = xAxis;
    // build specific objects
    switch (type) {
      case 'Inverse':
        settings.inverseSolverType = this.inverseSolverEngine.value;
        settings.optimizerType = this.optimizerType.value;
        settings.optimizationParameters = this.optimizationParameters.value;
        settings.measuredData = this.measuredData;
        settings.opticalProperties = this.initialGuessOpticalProperties;
        break;
      case 'Measured':
        settings.opticalProperties = this.forwardOpticalProperties;
        settings.modelAnalysis = this.modelAnalysisType.value;
        settings.noiseValue = this.noiseValue
        break;
      // InitialGuess
      default:
        settings.forwardSolverType = this.inverseSolverEngine.value;
        settings.forwardOpticalProperties = this.forwardOpticalProperties;
        settings.opticalProperties = this.initialGuessOpticalProperties;
        settings.modelAnalysis = this.modelAnalysisType.value;
        settings.noiseValue = "0";
        break;
    }
    return settings;
  }

  plotInverse(type: string) {
    var settings: any;
    settings = this.buildSettings(type);

    var engine: string = "forward";
    if (type === "Inverse") {
      engine = "inverse";
    }

    console.log(settings);
    console.log(JSON.stringify(settings));
    this.plotData.getPlotData(settings, engine).subscribe((data: any) => {
      var label: string;
      if (settings.independentAxis === null) {
        var axis = this.range.axis;
        if (axis == 'rho') {
          axis = 'ρ';
        }
        label = "R(" + axis + ")";
      } else {
        label = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
      }
      let x = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      let plotObject = new PlotObject(settings.solutionDomain, label, x, "Reflectance");
      plotObject.PlotList = data.plotList;
      this.plotData.addNewPlot(plotObject);
      if (type === "Measured") {
        this.measuredData = data.plotList[0].data;
      }
    });
  }
} 
