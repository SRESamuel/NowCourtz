import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Member} from "../../../models/member.model";
import {MembersDALService} from "../../../services/members-dal.service";

@Component({
  selector: 'app-viewallmemberspage',
  standalone: true,
  imports: [],
  templateUrl: './viewallmemberspage.component.html',
  styleUrl: './viewallmemberspage.component.css'
})
export class ViewallmemberspageComponent {
  member: Member[] = [];

  dal = inject(MembersDALService)
  router = inject(Router)

  constructor() {
    this.viewAllBookings()
  }

  viewAllBookings() {
    this.dal.selectAll().then((data) => {
      this.member = data;
      console.log(this.member)
    }).catch((err) => {
      console.log(err);
      this.member = [];
    })
  }

  onDeleteClick(member: Member) {
    this.dal.delete(member)
      .then((data) => {
        console.log(data);
        this.viewAllBookings();
        alert("Your Booking has been deleted");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  onEditClick(member: Member) {
    this.router.navigate([`/editmember/${member.id}`]);
  }

}
