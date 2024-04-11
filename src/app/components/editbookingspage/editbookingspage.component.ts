import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Booking} from "../../models/booking.model";
import {BookingDALService} from "../../../services/bookingDAL.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editbookingspage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './editbookingspage.component.html',
  styleUrl: './editbookingspage.component.css'
})
export class EditbookingspageComponent {
  title = "Edit a Booking";
  courtTypes: string[] = ["Basketball", "Dodgeball", "Volleyball", "Tennis", "Squash"]
  booking: Booking = new Booking("", "", "", "", "","","");
  MIN_LENGTH = 2;
  dal = inject(BookingDALService) //importing crud functions from dal
  activatedRoute = inject(ActivatedRoute)

  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data)=>{
        this.booking = data;
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  onEditClick() {

    this.dal.update(this.booking).then((data) => {
      console.log(data);
      alert("Your booking has been updated!");
    }).catch(e => {
      console.log("error " + e.message)
    })

  }

}


