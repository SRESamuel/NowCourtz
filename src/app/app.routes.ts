import { Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {BookingpageComponent} from "./components/bookingpage/bookingpage.component";
import {ProfilepageComponent} from "./components/profilepage/profilepage.component";
import {CourtspageComponent} from "./components/courtspage/courtspage.component";
import {AboutpageComponent} from "./components/aboutpage/aboutpage.component";
import {ErrorpageComponent} from "./components/errorpage/errorpage.component";
import {ViewbookingspageComponent} from "./components/viewbookingspage/viewbookingspage.component";
import {EditbookingspageComponent} from "./components/editbookingspage/editbookingspage.component";
import {EditprofilepageComponent} from "./components/editprofilepage/editprofilepage.component";
import {ViewprofilespageComponent} from "./components/viewprofilespage/viewprofilespage.component";
import {MemberpageComponent} from "./components/memberpage/memberpage.component";
import {ViewallmemberspageComponent} from "./components/viewallmemberspage/viewallmemberspage.component";
import {EditmemberpageComponent} from "./components/editmemberpage/editmemberpage.component";


export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "courts", component: CourtspageComponent},
  {path: "booking", component: BookingpageComponent},
  {path: "editbookings/:id", component: EditbookingspageComponent},// id is to extract a specific booking
  {path: "viewbookings", component: ViewbookingspageComponent},
  {path: "profile", component: ProfilepageComponent},
  {path: "member", component: MemberpageComponent},
  {path: "viewmembers", component: ViewallmemberspageComponent},
  {path: "editmember/:id", component: EditmemberpageComponent},
  {path: "editprofiles/:id", component: EditprofilepageComponent},// id is to extract a specific booking
  {path: "viewprofiles", component: ViewprofilespageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}, //Redirecting to home page
  {path: "**", component: ErrorpageComponent},//This must be at the end of the list , paths will be match from top to bottom, if nothing matches this one will.

];
