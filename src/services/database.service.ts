import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  db: any

  initDatabase(){
    this.createDatabase().then(data=>{
      console.log("Database created successfully: " + data)
    }).catch(e=>{
      console.log("Error in database creation: " + e.message)
    })
  }

  // must be called when the program runs. manually called in setting page
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("NowCourtzDB", 1);

      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;

        //Look up Object Store for court types
        const courtTypeStore = this.db.createObjectStore("courtType", {
          keyPath: "id", //id of court type?
          autoIncrement: true,
        });

        const seedData = [
          {courtType: "Basketball"},
          {courtType: "Volleyball"},
          {courtType: "Dodgeball"},
          {courtType: "Tennis"},
          {courtType: "Squash"},
        ];

        seedData.forEach((item)=>{
          courtTypeStore.add(item);
        });


        //Significant Object Store for booking of Courts
        const bookingsStore = this.db.createObjectStore("bookings", {
          keyPath: "id", //id of booking class
          autoIncrement: true,
        });
      };
    });
  }
}
