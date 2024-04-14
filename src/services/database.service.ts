import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  db: any

  initDatabase() {
    this.createDatabase().then(data => {
      console.log("Database created successfully: " + data)
    }).catch(e => {
      console.log("Error in database creation: " + e.message)
    })
  }

  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("NowCourtzDB", 2);

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
          keyPath: "id", //id of court type
          autoIncrement: true,
        });

        const seedData = [
          {courtType: "Basketball"},
          {courtType: "Volleyball"},
          {courtType: "Dodgeball"},
          {courtType: "Tennis"},
          {courtType: "Pickleball"},
          {courtType: "Squash"}
        ];

        seedData.forEach((item) => {
          courtTypeStore.add(item);
        });

        // Create the object store if it doesn't exist
        if (!this.db.objectStoreNames.contains("courtLocations"))
        {
          const courtLocations = this.db.createObjectStore("courtLocations", {
            keyPath: "id",
            autoIncrement: true
          });

          // Seed the object store
          const courtLDeedData = [
            {courtLocation: "", lat: "43.4198463274664", lon: "-80.48835797577193", name: "McLennan Park"},
            {courtLocation: "", lat: "43.51219188752865", lon: "-80.52018407586884", name: "The RunRec"},
            {courtLocation: "", lat: "43.49477722178892", lon: "-80.50310129445194", name: "Dunvegan Park"},
          ];

          courtLDeedData.forEach((item) => {
            courtLocations.add(item);
          });
        }

        //Significant Object Store for booking of Courts
        const bookingsStore = this.db.createObjectStore("bookings", {
          keyPath: "id", //id of booking class
          autoIncrement: true,
        });

        //Significant Object Store for profiles
        const profileStore = this.db.createObjectStore("profile", {
          keyPath: "id", //id of profile class
          autoIncrement: true,
        });

        //Significant Object Store for members going to courts
        const MembersStore = this.db.createObjectStore("members", {
          keyPath: "id", //id of booking class
          autoIncrement: true,
        });
      };
    });
  }
}


