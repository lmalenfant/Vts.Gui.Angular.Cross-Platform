import { Component, Input } from '@angular/core';
import { ForwardSolverEngine } from './forward-solver-engine.model';
import { GaussianBeam } from './gaussian-beam.model';
import { ForwardSolverEngineList } from './forward-solver-engine-list';

@Component({
    selector: 'app-forward-solver-engine',
    templateUrl: './forward-solver-engine.component.html'
})
/** forward-solver-engine component*/
export class ForwardSolverEngineComponent {
  @Input() forwardSolverEngine: ForwardSolverEngine = new ForwardSolverEngine;
  @Input() gaussianBeam: GaussianBeam = new GaussianBeam;
  @Input('forwardSolverEngineList') forwardSolverEngineList = ForwardSolverEngineList;

  constructor() {
    console.log("Constructor - ForwardSolverEngineComponent");
  }

  onChange(value: any) {
    console.log(this.forwardSolverEngine.value);
    console.log(value);
    this.forwardSolverEngine.value = value;
    switch (this.forwardSolverEngine.value) {
      case 'DistributedGaussianSourceSDA':
        this.gaussianBeam.show = true;
        break;
      case 'PointSourceSDA':
      case 'DistributedPointSourceSDA':
      case 'MonteCarlo':
      default:
        this.gaussianBeam.show = false;
    }
  }
}
