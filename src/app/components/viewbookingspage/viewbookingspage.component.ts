import {Component, inject} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-viewbookingspage',
  standalone: true,
  imports: [],
  templateUrl: './viewbookingspage.component.html',
  styleUrl: './viewbookingspage.component.css'
})
export class ViewbookingspageComponent {
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

  onDeleteClick(booking: Booking) {
    this.dal.delete(booking)
      .then((data) => {
        console.log(data);
        this.viewAllBookings();
        alert("Your Booking has been deleted");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  onEditClick(booking: Booking) {
    this.router.navigate([`/editbookings/${booking.id}`]);
  }


}
