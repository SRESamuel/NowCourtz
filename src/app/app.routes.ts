import { Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {BookingpageComponent} from "./components/bookingpage/bookingpage.component";
import {ProfilepageComponent} from "./components/profilepage/profilepage.component";
import {CourtspageComponent} from "./components/courtspage/courtspage.component";
import {AboutpageComponent} from "./components/aboutpage/aboutpage.component";
import {ErrorpageComponent} from "./components/errorpage/errorpage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "courts", component: CourtspageComponent},
  {path: "booking", component: BookingpageComponent},
  {path: "profile", component: ProfilepageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}, //Redirecting to home page
  {path: "**", component: ErrorpageComponent},//This must be at the end of the list , paths will be match from top to bottom, if nothing matches this one will.

];
