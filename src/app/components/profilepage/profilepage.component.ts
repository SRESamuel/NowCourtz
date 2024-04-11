import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Profile} from "../../models/profile.model";
import {ProfileDALService} from "../../../services/profileDAL.service";

@Component({
  selector: 'app-profilepage',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent {
  title = "Create a Profile";
  profile: Profile = new Profile("", "", "", "", "","","","","");
  MIN_LENGTH = 2;
  dal = inject(ProfileDALService) //importing crud functions from dal
  constructor() {
  }

  onProfileClick() {

    this.dal.insert(this.profile).then((data) => {
      console.log(data);
      alert("Your profile has been created!");
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}

