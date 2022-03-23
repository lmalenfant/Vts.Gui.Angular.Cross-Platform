import { Component, OnInit } from '@angular/core';
import { ForwardSolverEngine } from '../forward-solver-engine/forward-solver-engine.model';
import { GaussianBeam } from '../forward-solver-engine/gaussian-beam.model';
import { SolutionDomain } from '../solution-domain/solution-domain.model';
import { IndependentAxis } from '../solution-domain/independent-axis.model';
import { Range } from '../range/range.model';
import { OpticalProperties } from '../optical-properties/optical-properties.model';
import { ModelAnalysisType } from '../model-analysis-type/model-analysis-type.model';
import { PlotService } from '../services/plot.service';
import { PlotObject } from '../plot/plot-object.model';
import { Axis } from '../axis/axis.model';
declare var $: any;

@Component({
  selector: 'app-forward-solver-analysis',
  templateUrl: './forward-solver-analysis.component.html'
})
/** forward-solver-analysis component*/
export class ForwardSolverAnalysisComponent implements OnInit {
  id: string = 'Forward';
  forwardSolverEngine: ForwardSolverEngine = { value: 'DistributedPointSourceSDA', display: 'Standard Diffusion (Analytic: Distributed Point Source)' };
  gaussianBeam: GaussianBeam = {
    show: false,
    diameter: 0.1
  };
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
  opticalProperties: OpticalProperties = {
    title: 'Optical Properties',
    mua: 0.01,
    musp: 1,
    g: 0.8,
    n: 1.4
  };
  modelAnalysisType: ModelAnalysisType = { value: 'R' };
  noiseValue = '0'; // always set to 0 for fs

  plotObject: PlotObject | undefined;
  //plotObjects: Array<PlotObject>;

  constructor(private plotData: PlotService) {
    console.log("Constructor - ForwardSolverAnalysisComponent");
  }

  ngOnInit() {
    this.plotData.newPlotObject.subscribe(plotObject => this.plotObject = plotObject);
  }

  onSubmit() {
    let xAxis = new Axis();
    xAxis.axis = this.range.axis;
    xAxis.axisRange = this.range.axisRange;
    var independentAxis: Axis | null = new Axis();
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
      independentAxis: independentAxis,
      xAxis: xAxis,
      opticalProperties: this.opticalProperties,
      modelAnalysis: this.modelAnalysisType.value,
      noiseValue: this.noiseValue
    };
    console.log(fsSettings);
    console.log(JSON.stringify(fsSettings));
    this.plotData.getPlotData(fsSettings, "forward").subscribe((data: any) => {
      //set the plot grouping based on the checkbox value
      this.plotData.groupPlots = $("#group-plots").is(":checked");
      var label: string;
      if (fsSettings.independentAxis === null) {
        var axis = this.range.axis;
        if (axis == 'rho') {
          axis = 'ρ';
        }
        label = "R(" + axis + ")";
      } else {
        label = "R(" + this.independentAxes.first + "," + this.independentAxes.second + ")";
      }
      let x = this.independentAxes.label == this.independentAxes.first ? this.independentAxes.second : this.independentAxes.first;
      let plotObject = new PlotObject(fsSettings.solutionDomain, label, x, "Reflectance");
      plotObject.PlotList = data.plotList;
      this.plotData.addNewPlot(plotObject);
    });
  }
}
