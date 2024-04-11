import {Component, inject} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editlandingpage',
  standalone: true,
  imports: [],
  templateUrl: './editlandingpage.component.html',
  styleUrl: './editlandingpage.component.css'
})
export class EditlandingpageComponent {
  bookings: Booking[] = [];

  dal = inject(BookingDALService)
  router = inject(Router)

  constructor() {
    this.viewAllBookings()
  }

  viewAllBookings() {
    this.dal.selectAll().then((data) => {
      this.bookings = data;
      console.log(this.bookings)
    }).catch((err) => {
      console.log(err);
      this.bookings = [];
    })
  }
  onEditClick(booking: Booking) {
    this.router.navigate([`/editbookings/${booking.id}`]);
  }

}
