import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GeoService {

  getCurrLocation () : Promise<any> {
    return new Promise<any>((resolve, reject) => {

      const options = {
        timeout: 3000,
        enableHighAccuracy: true
      };


      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },(e) => {
        reject({
          code: e.code,
          message: e.message
        });

      },options)

    });
  }
  constructor() { }
}
