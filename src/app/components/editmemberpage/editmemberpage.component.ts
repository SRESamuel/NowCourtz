import {Component, inject} from '@angular/core';
import {Member} from "../../../models/member.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MembersDALService} from "../../../services/members-dal.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-editmemberpage',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './editmemberpage.component.html',
  styleUrl: './editmemberpage.component.css'
})
export class EditmemberpageComponent {
  title = "Edit a Booking";
  member: Member = new Member("", "", "", 0);
  MIN_LENGTH = 2;
  dal = inject(MembersDALService) //importing crud functions from dal
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router);

  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loadBooking(id);

  }
  loadBooking(id: number) {
    this.dal.select(id).then((data) => {
      this.member = data;
      // After booking is loaded, fetch the court types
      })
      .catch((err) => {
        console.error(err);
      });
  }
  onEditClick() {
    this.dal.update(this.member).then((data) => {
      console.log(data);
      alert("Your member has been updated!");
      this.router.navigate([`/viewmembers/`]);
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}
