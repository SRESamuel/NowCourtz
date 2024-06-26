import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {NavheaderComponent} from "./components/navheader/navheader.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavheaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NowCourtz';
}
