import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Member} from "../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class MembersDALService {
  database = inject(DatabaseService)

  constructor() { }

  joinLocation(memberData: Member, courtLocationId: number): Promise<any> {
    memberData.courtLocationId = courtLocationId; // Set the location ID
    return this.insert(memberData); // Use your DAL insert method
  }

//Booking Object Store will have the following CRUD Functions (Insert, update, delete, select, select all)
  insert(member: Member): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["members"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const memeberStore = transaction.objectStore("members");
      const req = memeberStore.add(member);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: A members is confirmed ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  update(memeber: Member): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["members"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const memeberStore = transaction.objectStore("members");
      const reqUpdate = memeberStore.put(memeber);

      reqUpdate.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: A members is updated ${event.target.result}`);
        resolve(event.target.result);
      };

      reqUpdate.onerror = (event: any) => {
        console.log("Error: error in modify: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Member[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["members"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const memeberStore = transaction.objectStore("members");
      const req = memeberStore.getAll();

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
      const transaction = this.database.db.transaction(["members"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const memeberStore = transaction.objectStore("members");

      const req = memeberStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  delete(memeber: Member): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["members"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const memberStore = transaction.objectStore("members");
      if (memeber.id) {
        const reqDelete = memberStore.delete(memeber.id);
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

}
