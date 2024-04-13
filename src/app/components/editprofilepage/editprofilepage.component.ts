import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Profile} from "../../../models/profile.model";
import {ProfileDALService} from "../../../services/profileDAL.service";
import {CameraService} from "../../../services/camera.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editprofilepage',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './editprofilepage.component.html',
  styleUrl: './editprofilepage.component.css'
})
export class EditprofilepageComponent {

  title = "Edit Profile";
  profile: Profile = new Profile("", "", "", "", "","","","","","");
  MIN_LENGTH = 2;
  dal = inject(ProfileDALService) //importing crud functions from dal
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data)=>{
        this.profile = data;
      })
      .catch((err)=>{
        console.log(err)
      })
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

  onEditClick() {

    this.dal.update(this.profile).then((data) => {
      console.log(data);
      alert("Your profile has been Updated!");
      this.router.navigate([`/viewprofiles/`]);
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}


