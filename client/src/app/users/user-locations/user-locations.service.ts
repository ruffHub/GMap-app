import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {ResponseContentType} from '@angular/http/src/enums';
import {MapService, IMarker} from "../../map/map.service";

@Injectable()
export class UserLocationsService {
    private userUrl = 'http://localhost:8000/api/v1/';

    constructor(private http: Http,
                public mapService: MapService,
                private ref: ChangeDetectorRef) {
    }

    public createLocation(marker: any) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const newLocation = {
            token: currentUser.token,
            userId: currentUser.id,
            data: {
                name: marker.name,
                type: marker.name,
                lat: marker.lat,
                lng: marker.lng
            }
        };
        return this.http.post(`${this.userUrl}locations/`, newLocation)
            .map((res: Response) => console.log(res))
            .catch((error: any) => console.log(error) || 'Server error');
    }

    public updateLocation(marker: any) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const newLocation = {
            token: currentUser.token,
            id: marker.id,
            data: {
                name: marker.name,
                type: marker.name,
                lat: marker.lat,
                lng: marker.lng
            }
        };
        return this.http.put(`${this.userUrl}locations/`, newLocation)
            .map((res: Response) => console.log(res))
            .catch((error: any) => console.log(error) || 'Server error');
    }

    public deleteLocation(marker: IMarker) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const reqBody = {
            "token": currentUser.token,
            "id": marker.id
        };

        return this.http.delete(`${this.userUrl}locations/`, reqBody)
            .map((res: Response) => console.log(res))
            .catch((error: any) => console.log(error) || 'Server error');
    }

}
