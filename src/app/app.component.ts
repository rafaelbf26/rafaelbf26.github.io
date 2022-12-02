import { Component } from '@angular/core';
declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Coord {
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lucci & Banguela Adventures';
  public latitude = 0;
  public longitude = 0;
  public MAP_MODE = 'place';
  public API_KEY = 'AIzaSyB07uRZ1XDqVSH0qUjkLlTom5x78N2Vdkw';
  public PARAMETERS = '';
  public bigscreenRef = 'https://maps.google.com/maps?q='+this.latitude+','+this.longitude+'&hl=es;z=14&amp;output=embed';
  private stGerrar = {
    longitude: -73.634925,
    latitude: 45.545264
  };
  private home = {
    longitude: -73.636159,
    latitude: 45.545917
  };
  private stadeIga = {
    longitude: -73.627120,
    latitude: 45.533574
  };

  ngOnInit(){
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition(pos => {
      
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.PARAMETERS = '';
      //let src = "https://www.google.com/maps/embed/v1/place?key=" + this.API_KEY + "%20&q=" + this.latitude + ',' + this.longitude;
      let src = this.returnDirectionUrl(this.home, this.stadeIga, [this.stGerrar], pos.coords);
      let frame: any = document.getElementById('test');
      if (frame != null) frame.src = src;
      window.alert('location returned')
    },pos => pos, options);

    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      console.log('location returned')
    },pos => pos);
  }

  returnDirectionUrl(origin: Coord, destination: Coord, waypoints: Coord[], center: Coord) {
    let directionURL = "https://www.google.com/maps/embed/v1/directions?key="+ this.API_KEY + "&origin=" + origin.latitude + ',' + origin.longitude 
    + "&destination=" + destination.latitude + ',' + destination.longitude + "&mode=walking" + "&zoom=15" + "&center=" + center.latitude + ',' + center.longitude
    + "&waypoints=";
    waypoints.forEach(element => {
      directionURL += element.latitude + ',' + element.longitude + '|';
    });
    return directionURL.slice(0, -1);
  }

}
