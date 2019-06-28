import { Component, Input } from '@angular/core';
import { InverseSolverEngine } from './inverse-solver-engine.model';
import { InverseSolverEngineList } from './inverse-solver-engine-list';

@Component({
    selector: 'app-inverse-solver-engine',
    templateUrl: './inverse-solver-engine.component.html',
    styleUrls: ['./inverse-solver-engine.component.css']
})
/** inverse-solver-engine component*/
export class InverseSolverEngineComponent {
  @Input() inverseSolverEngine: InverseSolverEngine;
  inverseSolverEngineList = InverseSolverEngineList;

  constructor() {

  }

 onChange(value) {
    console.log(this.inverseSolverEngine.value);
    console.log(value);
    this.inverseSolverEngine.value = value;
  } 
}
