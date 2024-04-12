import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Booking} from "../app/models/booking.model";
import {Event} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class BookingDALService {

  database = inject(DatabaseService)

  constructor() {

  }

//Booking Object Store will have the following CRUD Functions (Insert, update, delete, select, select all)
  insert(booking: Booking): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["bookings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const bookingsStore = transaction.objectStore("bookings");
      const req = bookingsStore.add(booking);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: Your booking is confirmed ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  update(booking: Booking): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["bookings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const bookingsStore = transaction.objectStore("bookings");
      const reqUpdate = bookingsStore.put(booking);

      reqUpdate.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: Your booking is updated ${event.target.result}`);
        resolve(event.target.result);
      };

      reqUpdate.onerror = (event: any) => {
        console.log("Error: error in modify: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["bookings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const bookingsStore = transaction.objectStore("bookings");
      const req = bookingsStore.getAll();

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: selectAll ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in selectAll: " + event);
        reject(event);
      };
    });
  }

  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["bookings"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const bookingsStore = transaction.objectStore("bookings");

      const req = bookingsStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  delete(booking: Booking): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["bookings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const bookingsStore = transaction.objectStore("bookings");
      if (booking.id) {
        const reqDelete = bookingsStore.delete(booking.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: booking deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("booking does not have id")
      }

    });
  }
  //courtType Object Store (look up) will have the following CRUD Functions (select all)
  getCourtTypes(): Promise<string[]> { // Method to get the court types
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["courtType"], "readonly");
      const store = transaction.objectStore("courtType");
      const courtTypes: string[] = [];

      // Open a cursor to iterate over all records in the store
      store.openCursor().onsuccess = (event: Event) => {
        // @ts-ignore
        const request = event.target as IDBRequest;
        const cursor = request.result as IDBCursorWithValue | null;
        if (cursor) {
          courtTypes.push(cursor.value.courtType);
          cursor.continue();
        } else {
          // No more entries, resolve the promise with the courtTypes array
          resolve(courtTypes);
        }
      };
      transaction.onerror = (event: Error) => {
        reject(new Error("Error fetching court types."));
      };
    });
  }

}




