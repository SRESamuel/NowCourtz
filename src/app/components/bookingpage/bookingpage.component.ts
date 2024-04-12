import {Component, inject} from '@angular/core';
import {FormsModule, FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms";
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-bookingpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './bookingpage.component.html',
  styleUrl: './bookingpage.component.css'

})
export class BookingpageComponent {
  title = "Book a Court";
  //courtTypes: string[] = ["Basketball", "Dodgeball", "Volleyball", "Tennis", "Squash"] Hard coded
  booking: Booking = new Booking("", "", "", "", "","","");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  courtTypes : string[] = [];
  constructor() {
    this.dal.getCourtTypes().then((types) => {
      this.courtTypes = types
      this.booking.courtType = this.courtTypes[0]
    }).catch((e) => {
      //console.error(`Error: getting court types ${e.message}`)
    })
  }

  trackByFn(index: number, item: any): any { // Function format from the documentation
    return item.id; // Get the objects id which is in the storage
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
