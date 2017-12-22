import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {ResponseContentType} from '@angular/http/src/enums';
import {MapService, IMarker} from "../../map/map.service";

@Injectable()
export class UserLocationsService {
    private userUrl = 'http://localhost:8000/api/v1/';
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http,
                public mapService: MapService,
                private ref: ChangeDetectorRef) {
    }

    public createLocation(marker:any) {

        const newLocation = {
            token: 'this.currentUser.token',
            userId: this.currentUser.id,
            data: {
                name: marker.name || '',
                type: marker.name || '',
                lat: marker.lat,
                lng: marker.lng
            }
        };

        console.log(newLocation);
        return this.http.post(`${this.userUrl}locations/`, newLocation)
            .map((res: Response) => console.log(res.json()))
            .catch((error: any) => console.log(error) || 'Server error');
    }

}
