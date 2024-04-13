import {Component, inject} from '@angular/core';
import {FormsModule, FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms";
import {Booking} from "../../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bookingpage',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './bookingpage.component.html',
  styleUrl: './bookingpage.component.css'

})
export class BookingpageComponent {
  title = "Book a Court";
  booking: Booking = new Booking("", "", "", "", "","","", "");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  courtTypes : { name: string; id: number }[] = [];
  //courtLocationNames: string[] = [];
  courtLocation: { name: string; id: number }[] = [];
  router = inject(Router)

  constructor() {
    this.dal.getCourtTypes().then((types) => {
      this.courtTypes = types;
    }).catch((e) => {
      //console.error(`Error: getting court types ${e.message}`)
    })

    this.dal.getCourtLocationNames().then((loo) => {
      this.courtLocation = loo
    }).catch((e) => {
      console.log(`Error: ${e}`)
    })

  }


  // trackByFn(index: number, item: any): number { // Function format from the documentation
  //   return index; // Get the objects id which is in the storage
  // }

  onBookClick() {

    const selectedCourtTypeName = this.booking.courtType; // Get the location name of the court from the booking
    // Look for the selected name in the object store of locations
    const selectedType = this.courtTypes.find(location => location.name === selectedCourtTypeName);
    if (selectedType) { // If found set the id to the fk
      this.booking.courtTypeFk = selectedType.id; // Set the foreign key for court location
    }

    const selectedLocationName = this.booking.courtLoc; // Get the location name of the court from the booking
    // Look for the selected name in the object store of locations
    const selectedLocation = this.courtLocation.find(location => location.name === selectedLocationName);
    if (selectedLocation) { // If found set the id to the fk
      this.booking.courtLocFk = selectedLocation.id; // Set the foreign key for court location
    }

    // like a getCourtTypeIdByName() method in your dal service.
     this.dal.insert(this.booking).then((data) => {
       console.log(data);
       alert("Your court has been booked!");
       this.router.navigate([`/viewbookings/`]);
     }).catch(e => {
       console.log("error " + e.message)
     });
   }

  }
