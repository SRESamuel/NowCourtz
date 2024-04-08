import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Booking} from "../../models/booking.model";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-bookingpage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './bookingpage.component.html',
  styleUrl: './bookingpage.component.css'
})
export class BookingpageComponent {
  title = "Book a Court";
  fullName: string = "";
  booking: Booking = new Booking("", "", "", "");
  MIN_LENGTH = 5;


}
