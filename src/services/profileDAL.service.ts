import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Profile} from "../models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileDALService {

  database = inject(DatabaseService)

  constructor() {

  }

//Profile Object Store will have the following CRUD Functions (Insert)
  insert(profile: Profile): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["profile"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const profileStore = transaction.objectStore("profile");
      const req = profileStore.add(profile);

      req.onsuccess = (event: any) => {

        console.log(`Success: Your profile is created ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

    update(profile: Profile): Promise<any> {
      return new Promise((resolve, reject) => {
        const transaction = this.database.db.transaction(["profile"], "readwrite");

        transaction.oncomplete = (event: any) => {
          console.log("Success: update transaction successful");
        };
        transaction.onerror = (event: any) => {
          console.log("Error: error in update transaction: " + event);
        };

        const profileStore = transaction.objectStore("profile");
        const reqUpdate = profileStore.put(profile);

        reqUpdate.onsuccess = (event: any) => {
          console.log(`Success: Your profile is updated ${event.target.result}`);
          resolve(event.target.result);
        };

        reqUpdate.onerror = (event: any) => {
          console.log("Error: error in modify: " + event);
          reject(event);
        };
      });
    }

    selectAll(): Promise<Profile[]> {
      return new Promise((resolve, reject) => {
        const transaction = this.database.db.transaction(["profile"], "readwrite");

        transaction.oncomplete = (event: any) => {
          console.log("Success: selectAll transaction successful");
        };
        transaction.onerror = (event: any) => {
          console.log("Error: error in selectAll transaction: " + event);
        };

        const profileStore = transaction.objectStore("profile");
        const req = profileStore.getAll();

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
        const transaction = this.database.db.transaction(["profile"]); //readonly

        transaction.oncomplete = (event: any) => {
          console.log("Success: select transaction successful");
        };
        transaction.onerror = (event: any) => {
          console.log("Error: error in select transaction: " + event);
        };

        const profileStore = transaction.objectStore("profile");

        const req = profileStore.get(id);
        req.onsuccess = (event: any) => {
          event.target.result ? resolve(event.target.result) : resolve(null);
        };
        req.onerror = (event: any) => {
          console.log("Error: error in select: " + event);
          reject(event);
        };
      });
    }

    delete(profile: Profile): Promise<any> {
      return new Promise((resolve, reject) => {
        const transaction = this.database.db.transaction(["profile"], "readwrite");

        transaction.oncomplete = (event: any) => {
          console.log("Success: delete transaction successful");
        };
        transaction.onerror = (event: any) => {
          console.log("Error: error in delete transaction: " + event);
        };

        const profileStore = transaction.objectStore("profile");
        if (profile.id) {
          const reqDelete = profileStore.delete(profile.id);
          reqDelete.onsuccess = (event: any) => {
            console.log(`Success: profile deleted successfully: ${event}`);
            resolve(event);
          };
          reqDelete.onerror = (event: any) => {
            console.log(`Error: failed to delete: ${event}`);
            reject(event);
          };
        } else {
          reject("profile does not have id")
        }

      });
    }

  }




