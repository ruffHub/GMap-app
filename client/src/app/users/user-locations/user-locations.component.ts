import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {FormControl} from '@angular/forms';
import {MapService, IMarker} from "../../map/map.service";
import {UserService} from "../user.service";
import {UserLocationsService} from "./user-locations.service";

@Component({
    templateUrl: './user-locations.component.html',
    styleUrls: ['./user-locations.css'],
    providers: [MapService, UserService, UserLocationsService]
})
export class UserLocationsComponent implements OnInit {
    item: any = {};
    constructor(public mapService: MapService,
                public userService: UserService,
                public UserLocationsService: UserLocationsService,
                public ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.mapService.onAddMarkerFromMap(() => {
            this.ref.detectChanges();
        });

        this.load();
    }

    load() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userService.getLocations(currentUser.id).subscribe(
            markers => {
                markers.forEach((item:IMarker) => {
                    this.mapService.add(item);
                });
            },
            err => console.log(err)
        );
    }

    save(item: IMarker) {
        this.UserLocationsService.createLocation(item).subscribe();
    };

    update(item: IMarker) {
        this.UserLocationsService.updateLocation(item).subscribe();
    };

    delete(item: IMarker) {
        this.UserLocationsService.deleteLocation(item).subscribe();
    };
}