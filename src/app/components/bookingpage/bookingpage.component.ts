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
  booking: Booking = new Booking("", "", "", "", "","","", "");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  courtTypes : string[] = [];
  nameCourts : string[] = [];
  constructor() {
    this.dal.getCourtTypes().then((types) => {
      this.nameCourts = types;
      this.courtTypes = types;
      this.booking.courtType = this.courtTypes[0];
    }).catch((e) => {
      //console.error(`Error: getting court types ${e.message}`)
    })
  }

  trackByFn(index: number, item: any): number { // Function format from the documentation
    return index; // Get the objects id which is in the storage
  }

  onBookClick() {
    // @ts-ignore
    let selectedCourtType = this.courtTypes[this.booking.courtType];
    const courtTypeIndex = Number(this.booking.courtType);
    if (courtTypeIndex >= 0 && courtTypeIndex < this.courtTypes.length) {
      // Assign the courtName using the index
      this.booking.courtName = this.courtTypes[courtTypeIndex];
    }
    else {
      console.log("error out of bounds")
    }
    // Build the booking object to include the courtType ID if necessary
    let bookingData = {
      ...this.booking,
      courtTypeId: this.booking.courtType, // this holds the index of the selected court type
      courtType: selectedCourtType
    };
     this.dal.insert(this.booking).then((data) => {
       console.log(data);
       alert("Your court has been booked!");
     }).catch(e => {
       console.log("error " + e.message)
     })

   }

}
