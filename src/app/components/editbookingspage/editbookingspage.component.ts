import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-editbookingspage',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './editbookingspage.component.html',
  styleUrl: './editbookingspage.component.css'
})
export class EditbookingspageComponent{
  title = "Edit a Booking";
  //courtTypes: string[] = ["Basketball", "Dodgeball", "Volleyball", "Tennis", "Squash"]
  booking: Booking = new Booking("", "", "", "", "","","", "");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  courtTypes: { courtType: string; id: number;}[] = [];


  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loadBooking(id);
  }

  loadBooking(id: number) {
    this.dal.select(id).then((data) => {
      this.booking = data;
      // After booking is loaded, fetch the court types
      this.loadCourtTypes(this.booking.courtTypeFk);
    }).catch((err) => {
      console.error(err);
    });
  }

  loadCourtTypes(selectedCourtTypeId: number | undefined) {
    this.dal.getCourtTypesById(selectedCourtTypeId).then((courtTypesWithSelectedFirst) => {
      this.courtTypes = courtTypesWithSelectedFirst;
    }).catch(error => {
      console.error('Error fetching court types', error);
    });
  }



  // trackByFn(index: number, item: any): number {
  //   return index;
  // }

  onEditClick() {
    this.dal.update(this.booking).then((data) => {
      console.log(data);
      alert("Your booking has been updated!");
      console.log(this.booking.courtType)
      this.router.navigate([`/viewbookings/`]);
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}








