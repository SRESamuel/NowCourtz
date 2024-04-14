import {Component, inject, OnInit} from '@angular/core';
import {GeoService} from "../../../services/geo.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";


declare const H: any ;

@Component({
  selector: 'app-courtspage',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './courtspage.component.html',
  styleUrl: './courtspage.component.css'
})
export class CourtspageComponent implements OnInit{
  title: string = "Courts"
  geoService: GeoService = inject(GeoService)
  position: any;
  error: any;
  lat: any;
  lon: any;
  locOneName : string;
  locTwoName : string;
  locThirdName : string;
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  onViewMembers() {
    this.router.navigate([`/viewmembers/`]);
  }

  protected readonly location = location;

  courtLocations = [
    {lat: "43.4198463274664", lon: "-80.48835797577193", name: "McLennan Park", id: 1},
    {lat: "43.51219188752865", lon: "-80.52018407586884", name: "The RunRec", id: 2},
    {lat: "43.49477722178892", lon: "-80.50310129445194", name: "Dunvegan Park", id: 3},
  ];

  onCreateMember() {
    this.router.navigate([`/member/`]);
  }

  constructor() {
    const location1 = this.courtLocations.find(location => location.name === "McLennan Park");
    this.locOneName = location1 ? location1.name : 'Not found';
    const location2 = this.courtLocations.find(location => location.name === "The RunRec");
    this.locTwoName = location2 ? location2.name : 'Not found';
    const location3 = this.courtLocations.find(location => location.name === "Dunvegan Park");
    this.locThirdName = location3 ? location3.name : 'Not found';
  }

  getLocationOnclick() {
    this.geoService.getCurrLocation().then((data) => {
      this.position = data;
      this.lat = data.lat;
      this.lon = data.lon;
      this.error = "";
      this.showMap();
    }).catch((e) => {
      console.log(e);
      this.error = e;
    });
  }

  private showMapForCourtLocation(location: any, containerId: string) {  // Pass the location and the id
    const platform = new H.service.Platform({
      'apikey': 'QxVjzHmppcev_KgPDIhgx9abZCHyAhIM49sHWP9vtK8'
    });
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      document.getElementById(containerId), // Use the passed containerId here
      defaultLayers.vector.normal.map,
      {
        zoom: 15,
        center: { lat: location.lat, lng: location.lon }
      }
    );

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    const markerIcon = new H.map.Icon('assets/img/loc-pin.png');
    const marker = new H.map.Marker({ lat: location.lat, lng: location.lon }, { icon: markerIcon });
    map.addObject(marker);
  }

  ngOnInit() { // After setting component properties initialize it with this
    this.showMapForCourtLocation(this.courtLocations[0], 'mapCLoc1');
    this.showMapForCourtLocation(this.courtLocations[1], 'mapCLoc2');
    this.showMapForCourtLocation(this.courtLocations[2], 'mapCLoc3');
  }

  private showMap() {
    console.log("showing map: ")
    document.getElementById('mapContainer')!.innerHTML = '';

    // Initialize the platform object
    var platform = new H.service.Platform({
      'apikey': 'QxVjzHmppcev_KgPDIhgx9abZCHyAhIM49sHWP9vtK8'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Seting the initial options for the map
    var options = {
      zoom: 15,
      center: { lat: this.lat, lng: this.lon }
    };

    // Instantiate (and display) a map object
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    // Enable the event system and the default UI on the map
    var ui = H.ui.UI.createDefault(map, maptypes);
    var mapEvents = new H.mapevents.MapEvents(map);
    new H.mapevents.Behavior(mapEvents);

    // Icon
    var currentLocationIcon = new H.map.Icon('assets/img/me.png');

    // Marker for my current location
    var currentLocationMarker = new H.map.Marker({
      lat: this.lat,
      lng: this.lon
    }, { icon: currentLocationIcon });
    map.addObject(currentLocationMarker);

    // Creating the icon for other court locations
    var locationIcon = new H.map.Icon('assets/img/loc-pin.png');

    // Iterating over my locations and adding markers to the map
    this.courtLocations.forEach(location => {
      var marker = new H.map.Marker({
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon)
      }, { icon: locationIcon });
      map.addObject(marker);
    });
    // Re-center the map to ensure all markers are visible
    map.getViewModel().setLookAtData({bounds: map.getObjects().getBoundingBox()});
  }

}

