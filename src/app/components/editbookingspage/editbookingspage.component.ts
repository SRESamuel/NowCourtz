import {Component, inject} from '@angular/core';
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
export class EditbookingspageComponent {
  title = "Edit a Booking";
  //courtTypes: string[] = ["Basketball", "Dodgeball", "Volleyball", "Tennis", "Squash"]
  booking: Booking = new Booking("", "", "", "", "","","");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  courtTypes : string[] = [];


  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data)=>{
        this.booking = data;
      })
      .catch((err)=>{
        console.log(err)
      })

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
  onEditClick() {

    this.dal.update(this.booking).then((data) => {
      console.log(data);
      alert("Your booking has been updated!");
      this.router.navigate([`/viewbookings/`]);
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}








