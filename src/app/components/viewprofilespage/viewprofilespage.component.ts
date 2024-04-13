import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../../../models/profile.model";
import {ProfileDALService} from "../../../services/profileDAL.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-viewprofilespage',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './viewprofilespage.component.html',
  styleUrl: './viewprofilespage.component.css'
})
export class ViewprofilespageComponent {
  profiles: Profile[] = [];
  dal = inject(ProfileDALService)
  router = inject(Router)

  constructor() {
    this.viewAllProfiles()
  }
// View profiles
  viewAllProfiles() {
    this.dal.selectAll().then((data) => {
      this.profiles = data;
      console.log(this.profiles)
    }).catch((err) => {
      console.log(err);
      this.profiles = [];
    })
  }

  onDeleteClick(profile: Profile) {
    this.dal.delete(profile)
      .then((data) => {
        console.log(data);
        this.viewAllProfiles();
        alert("Your Profile has been deleted");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //edit profile by id
  onEditClick(profile: Profile) {
    this.router.navigate([`/editprofiles/${profile.id}`]);
  }

}


