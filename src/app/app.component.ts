import {Component, inject, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {NavheaderComponent} from "./components/navheader/navheader.component";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavheaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'NowCourtz';
  database = inject(DatabaseService)
  @ViewChild(NavheaderComponent) navHeaderComponent!: NavheaderComponent;

  closeMenu() {
    if (this.navHeaderComponent) {
      this.navHeaderComponent.menuClose();
    }
  }

  constructor() {
    this.database.initDatabase()
  }
}
