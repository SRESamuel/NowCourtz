import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Member} from "../../../models/member.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {MembersDALService} from "../../../services/members-dal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-memberpage',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './memberpage.component.html',
  styleUrl: './memberpage.component.css'
})
export class MemberpageComponent {
  title = "Join the location";
  MIN_LENGTH = 2;
  dal = inject(MembersDALService) //importing crud functions from dal
  courtType: number| undefined;
  member: Member = new Member("","", "", 0 );
  router = inject(Router)

  onJoinClick() {
    // like a getCourtTypeIdByName() method in your dal service.
    this.dal.insert(this.member).then((data) => {
      console.log(data);
      alert("Your added to the list!");
      this.router.navigate([`/courts/`]);
    }).catch(e => {
      console.log("error " + e.message)
    });
  }

}
