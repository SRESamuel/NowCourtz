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

  getCourtTypesById(selectedId: number | undefined): Promise<{ courtType: string, id: number }[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['courtType'], 'readonly');
      const store = transaction.objectStore('courtType');
      let courtTypes = [];

      // @ts-ignore
      store.getAll().onsuccess = (event) => {
        // @ts-ignore
        courtTypes = event.target.result;

        if (selectedId !== undefined) {
          // Move the selected item to the beginning of the array
          // @ts-ignore
          courtTypes.sort((a, b) => {
            if (a.id === selectedId) return -1;
            if (b.id === selectedId) return 1;
            return 0;
          });
        }
        resolve(courtTypes);
      };
      // @ts-ignore
      transaction.onerror = (event) => {
        reject(new Error('Error fetching court types.'));
      };
    });
  }


  //courtType Object Store (look up) will have the following CRUD Functions (select all)
  getCourtTypes(): Promise<{ name: string; id: number }[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['courtType'], 'readonly');
      const store = transaction.objectStore('courtType');
      const courtTypes: { name: string; id: number }[] = [];

      // @ts-ignore
      store.openCursor().onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
        if (cursor) {
          courtTypes.push({ name: cursor.value.courtType, id: cursor.value.id }); // Assuming 'courtType' is the name property in your stored objects
          cursor.continue();
        } else {
          resolve(courtTypes);
        }
      };
      // @ts-ignore
      transaction.onerror = (event) => {
        reject(new Error('Transaction error: ' + event.target.errorCode));
      };
      // @ts-ignore
      store.openCursor().onerror = (event) => {
        reject(new Error('Cursor error: ' + event.target.errorCode));
      };
    });
  }

  getCourtLocationNames(): Promise<{ name: string; id: number }[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['courtLocations'], 'readonly');
      const store = transaction.objectStore('courtLocations');
      const locations: { name: string; id: number }[] = []; // Get the name and the id along with it
      // @ts-ignore
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          locations.push({ name: cursor.value.name, id: cursor.value.id }); // Collect both name and id
          cursor.continue();
        } else {
          resolve(locations); // All names and ids have been collected
        }
      };
      // @ts-ignore
      store.openCursor().onerror = (event) => {
        reject(event.target.error);
      };
    });
  }


}




