import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Vts Application';

  constructor() {
    console.log("Constructor - AppComponent");  
   }
}
