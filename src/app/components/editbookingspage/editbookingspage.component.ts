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
  booking: Booking = new Booking("", "", "", "", "","","", "");
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
      this.courtTypes = types;
      // Now that courtTypes is populated, get the current booking's court type
      this.dal.select(id)
        .then((data) => {
          this.booking = data;
          if (data.courtType) {
            // Assuming data.courtType contains the id of the court type
            this.dal.getCourtTypeById(data.courtType)
              .then(courtTypeName => {
                // Find the index of the court type name in the courtTypes array
                const index = this.courtTypes.findIndex(ct => ct === courtTypeName);
                if (index !== -1) {
                  // Set the ngModel binding to the index
                  this.booking.courtType = index.toString();
                }
              })
              .catch(e => {
//                console.error(`Error: getting court type by id ${e.message}`);
              });
          }
        })
        .catch((err) => {
          console.error(`Error: selecting booking ${err.message}`);
        });
    })
      .catch((e) => {
        console.error(`Error: getting court types ${e.message}`);
      });
  }


  trackByFn(index: number, item: any): number {
    return index;
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








