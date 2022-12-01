import { Component } from '@angular/core';
declare global {
  interface Window {
    initMap: () => void;
  }
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

  ngOnInit(){
    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.PARAMETERS = '';
      let src = "https://www.google.com/maps/embed/v1/place?key=" + this.API_KEY + "%20&q=" + this.latitude + ',' + this.longitude;
      let frame: any = document.getElementById('test');
      if (frame != null) frame.src = src;
    },pos => pos);

    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    },pos => pos);
  }

}
