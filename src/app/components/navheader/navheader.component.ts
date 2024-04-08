import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navheader',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navheader.component.html',
  styleUrl: './navheader.component.css'
})
export class NavheaderComponent {
  title: string ="NowCourtz";

}
