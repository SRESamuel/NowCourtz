import {Component, inject} from '@angular/core';
import {FormsModule, FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms";
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-bookingpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './bookingpage.component.html',
  styleUrl: './bookingpage.component.css'

})
export class BookingpageComponent {
  title = "Book a Court";
  courtTypes: string[] = ["Basketball", "Dodgeball", "Volleyball", "Tennis", "Squash"]
  booking: Booking = new Booking("", "", "", "", "","","");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  constructor() {
    this.booking.courtType = this.courtTypes[0];

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
