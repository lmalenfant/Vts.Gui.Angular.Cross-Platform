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
import { plotData } from '../plot/plot-data.model';

@Component({
  selector: 'app-inverse-solver-analysis',
  templateUrl: './inverse-solver-analysis.component.html'
}) 

/** inverse-solver-analysis component*/
export class InverseSolverAnalysisComponent implements OnInit {
  id: string = 'Inverse';
  forwardSolverEngine: ForwardSolverEngine = { 
    value: 'PointSourceSDA', 
    display: 'Standard Diffusion (Analytic: Isotropic Point Source)'};
  gaussianBeam: GaussianBeam = {
    show: false,
    diameter: 0.1
  };
  fsEngineList = InverseSolverEngineList;
  inverseSolverEngine: ForwardSolverEngine = { 
    value: 'PointSourceSDA', 
    display: 'Standard Diffusion (Analytic: Isotropic Point Source)' };
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
  modelAnalysisType: ModelAnalysisType = { value: 'R'};
  noiseValue = '0';
  
  measuredData: number[][] = [];

  plotObject: PlotObject = new PlotObject; 
  //plotObjects: Array<PlotObject>;

  constructor(private plotData: PlotService) {
  }

  ngOnInit() {
    this.plotData.newPlotObject.subscribe(plotObject => this.plotObject = plotObject);
  }

  plotMeasured() {   
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
   
    var fsSettings = {
      forwardSolverType: this.forwardSolverEngine.value,
      solutionDomain: this.solutionDomain.value,
      independentAxes: independentAxis,
      xAxis: xAxis,
      opticalProperties: this.forwardOpticalProperties,
      modelAnalysis: this.modelAnalysisType.value,
      noiseValue: this.noiseValue
    };
    console.log(fsSettings);
    console.log(JSON.stringify(fsSettings));
    this.plotData.getPlotData(fsSettings, "forward").subscribe((data: any) => {
      let plotObject = new PlotObject();
      plotObject.Id = fsSettings.solutionDomain;
      if (independentAxis === null) {
        var axis = this.range.axis;
        if (axis == 'rho') {
          axis = 'ρ';
        }
        plotObject.Detector = "R(" + axis + ")";
        plotObject.Legend = "R(" + axis + ")";
        plotObject.XAxis = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      } else {
        plotObject.Detector = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
        plotObject.Legend = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
        plotObject.XAxis = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      }
      plotObject.YAxis = "Reflectance";
      plotObject.PlotList = data.plotList;
      this.plotData.addNewPlot(plotObject);
      this.measuredData = data.plotList[0].data;
    });
  }
    
  plotInitialGuess() {
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

    var igSettings = {
      forwardSolverType: this.inverseSolverEngine.value,
      forwardOpticalProperties: this.forwardOpticalProperties,
      solutionDomain: this.solutionDomain.value,
      independentAxes: independentAxis,
      xAxis: xAxis,
      opticalProperties: this.initialGuessOpticalProperties,
      modelAnalysis: this.modelAnalysisType.value,
      noiseValue: "0"
    };
    console.log(igSettings);
    console.log(JSON.stringify(igSettings));
    this.plotData.getPlotData(igSettings, "forward").subscribe((data: any) => {
      let plotObject = new PlotObject();
      plotObject.Id = igSettings.solutionDomain;
      if (independentAxis === null) {
        var axis = this.range.axis;
        if (axis == 'rho') {
          axis = 'ρ';
        }
        plotObject.Detector = "R(" + axis + ")";
        plotObject.Legend = "R(" + axis + ")";
        plotObject.XAxis = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      } else {
        plotObject.Detector = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
        plotObject.Legend = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
        plotObject.XAxis = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      }
      plotObject.YAxis = "Reflectance";
      plotObject.PlotList = data.plotList;
      this.plotData.addNewPlot(plotObject);
    });
  }

  runInverse() {    
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

    var inSettings = {
      forwardSolverType: this.forwardSolverEngine.value,
      solutionDomain: this.solutionDomain.value,
      inverseSolverType: this.inverseSolverEngine.value,
      optimizerType: this.optimizerType.value,
      optimizationParameters: this.optimizationParameters.value,
      measuredData: this.measuredData,
      independentAxes: independentAxis,
      xAxis: xAxis,
      opticalProperties: this.initialGuessOpticalProperties,
    };
    console.log(inSettings);
    console.log(JSON.stringify(inSettings));
    this.plotData.getPlotData(inSettings, "inverse").subscribe((data: any) => {
      //this.plotObject = data;
      let plotObject = new PlotObject();
      plotObject.Id = inSettings.solutionDomain;
      if (independentAxis === null) {
        var axis = this.range.axis;
        if (axis == 'rho') {
          axis = 'ρ';
        }
        plotObject.Detector = "R(" + axis + ")";
        plotObject.Legend = "R(" + axis + ")";
        plotObject.XAxis = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      } else {
        plotObject.Detector = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
        plotObject.Legend = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
        plotObject.XAxis = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      }
      plotObject.YAxis = "Reflectance";
      plotObject.PlotList = data.plotList;
      this.plotData.addNewPlot(plotObject);
    });
  }
} 
