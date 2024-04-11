import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/dal.service";

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
  booking: Booking = new Booking("", "", "", "", "","","");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  constructor() {
  }

  onBookClick() {

    this.dal.insert(this.booking).then((data) => {
      console.log(data);
      alert("Your court has been booked!");
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}

