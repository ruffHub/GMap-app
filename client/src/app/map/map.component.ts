import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MapService} from "./map.service";
import any = jasmine.any;

type Pos = { lat: number; lng: number };
type userMark = { name: string; lat: number; lng: number };

@Component({
    selector: 'g-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
    @ViewChild('mapCanvas') mapCanvas: ElementRef;

    private pos: Pos = {
        lat: 46.4598865,
        lng: 30.5717048
    };

    private markers: Array<google.maps.Marker> = [];
    private map: any;

    constructor() {
    }

    @Input() mapService: MapService;

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.pos.lat = pos.coords.latitude;
                this.pos.lng = pos.coords.longitude;
            });
        }


        this.mapService.onChange(() => {
            this.markers.forEach((marker) => {

                marker.setMap(null);
            });

            this.markers = [];
            this.mapService.getList().forEach((marker) => {
                this.markers.push(new google.maps.Marker({
                    position: marker,
                    map: this.map
                }));
            });
        });


    }

    static _mapCenter(lat: number, lng: number) {
        return new google.maps.LatLng(lat, lng)
    }

    _placeMarker(location: Pos) {
        return new google.maps.Marker({
            position: location,
            map: this.map
        });
    }

    ngAfterViewInit() {
        this.map = new google.maps.Map(this.mapCanvas.nativeElement, {
            zoom: 11,
            center: MapComponent._mapCenter(this.pos.lat, this.pos.lng),
            disableDefaultUI: true
        });

        this.map.addListener('click', (event: google.maps.MouseEvent) => {
            this.mapService.add({lat: event.latLng.lat(), lng: event.latLng.lng()});
            this.mapService.emitOnMarkerFromMapAdd();
        });
    }
}
