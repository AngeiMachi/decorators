import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Confirmable } from './decorator/confirmable.decorator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public confirmed: boolean = false;
  public INJECTOR: Injector;

  constructor(injector: Injector) {
    
    this.INJECTOR = injector;
  }

  @Confirmable() 
  public doSomething(): void {
    this.confirmed = true;
  }
}
