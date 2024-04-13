import {Component, inject, OnInit} from '@angular/core';
import {GeoService} from "../../../services/geo.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";


declare const H: any ;

@Component({
  selector: 'app-courtspage',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './courtspage.component.html',
  styleUrl: './courtspage.component.css'
})
export class CourtspageComponent{
  title: string = "Courts"
  geoService: GeoService = inject(GeoService)
  position: any;
  error: any;
  lat: any;
  lon: any;

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

  private showMap() {
    console.log("showing map: ")
    document.getElementById('mapContainer')!.innerHTML = '';
    console.log()
    var platform = new H.service.Platform({
      'apikey': 'QxVjzHmppcev_KgPDIhgx9abZCHyAhIM49sHWP9vtK8'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    var options = {
      zoom: 15,
      center: {
        lat: this.lat, lng: this.lon
      }
    };

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    var icon = new H.map.Icon('assets/img/myLocation.png');
    console.log({icon})
    var marker = new H.map.Marker({
      lat: this.lat, lng: this.lon
    }, {icon: icon});
    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
  }

}

