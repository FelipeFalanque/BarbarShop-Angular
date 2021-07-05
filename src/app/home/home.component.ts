import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mapa: Mapboxgl.Map;
  marker: Mapboxgl.Marker;
  position = { lat: -22.974880, lng: -47.000932 };

  constructor() {

  }

  ngOnInit() {

    Mapboxgl.accessToken = environment.mapboxKey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.position.lng, this.position.lat], // Long, Lat
      zoom: 16 // starting zoom
    });

    this.marker = new Mapboxgl.Marker({ color: '#32383e' })
      .setLngLat([this.position.lng, this.position.lat])
      .setPopup(new Mapboxgl.Popup().setHTML(`
      <p><img src="../../../assets/images/beard.png" width="30" height="30" alt=""> Estamos no endereço:</p>
      <p class="font-weight-light">Rua Abolição, nº 433, Centro, Valinhos - SP</p>`))
      .addTo(this.mapa);

  }

}
