import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Profile} from "../app/models/profile.model";


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

}
