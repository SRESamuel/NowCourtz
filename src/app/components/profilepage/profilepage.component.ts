import {Component, inject} from '@angular/core';
import {AbstractControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Profile} from "../../../models/profile.model";
import {ProfileDALService} from "../../../services/profileDAL.service";
import {CameraService} from "../../../services/camera.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  //delete the data afterward, put to empty string using for testing
  profile: Profile = new Profile("Michael", "Scott", "test@gmail.com", "519-555-5555", "1 Main street","Scranton","ON","N1F 2R4","MScott","");
  MIN_LENGTH = 2;
  dal = inject(ProfileDALService) //importing crud functions from dal
  router = inject(Router)
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

  defaultProfileImage: string = 'src/assets/img/profileIcon.png';
  resetForm(){
    this.profile.profileImage = this.defaultProfileImage
  }
  onProfileClick() {
    this.dal.insert(this.profile).then((data) => {
      this.resetForm();
      console.log(data);
      alert("Your profile has been created!");
      this.router.navigate([`/home/`]);
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}

