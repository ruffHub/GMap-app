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
    // newLocation = {
    //     token: string,
    //     userId: string,
    //     data: {
    //         name?: string,
    //         type?: string,
    //         lat: number,
    //         lng: 51
    //     }
    // }

    constructor(private http: Http,
                public mapService: MapService,
                private ref: ChangeDetectorRef) {
    }

    save(id: number | string, item: IMarker) {

        return this.http.get(`${this.userUrl}locations/${+id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
