import {Component, inject} from '@angular/core';
import {AbstractControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Profile} from "../../models/profile.model";
import {ProfileDALService} from "../../../services/profileDAL.service";
import {CameraService} from "../../../services/camera.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent {
  title = "Create a Profile";
  profile: Profile = new Profile("", "", "", "", "","","","","","");
  MIN_LENGTH = 2;
  dal = inject(ProfileDALService) //importing crud functions from dal
  constructor() {
  }

  profileImage :any;
  cameraService = inject(CameraService);
  onCapturePhotoClick() {
    this.cameraService.capturePhoto().then((data)=>{
      this.profile.profileImage =data;
    }).catch((e)=>{
      alert(e.toString());
    });
  }

  onLoadFromLibraryClick() {
    this.cameraService.loadPhotoFromLibrary().then((data) => {
      this.profile.profileImage = data;
    }).catch((e) => {
      alert(e.toString());
    });
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

