import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navheader',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navheader.component.html',
  styleUrl: './navheader.component.css'
})
export class NavheaderComponent {
  menuVal:boolean=false;
  menu_icon :string ='bi bi-list';
  menuOpen(){
    this.menuVal =! this.menuVal ;
    this.menu_icon = this.menuVal ? 'bi bi-x' : 'bi bi-list';
  }
  menuClose() {
    this.menuVal = false;
    this.menu_icon = 'bi bi-list';
  }
}
