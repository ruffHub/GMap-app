import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {FormControl} from '@angular/forms';
import {MapService, IMarker} from "../../map/map.service";
import {UserService} from "../user.service";

@Component({
    templateUrl: './user-locations.component.html',
    styleUrls: ['./user-locations.css'],
    providers: [MapService, UserService]
})
export class UserLocationsComponent implements OnInit {

    list: Array<IMarker> = [];

    constructor(public mapService: MapService,
                public userService: UserService,
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
                this.list = markers;

                this.list.forEach((item) => {
                    this.mapService.add(item);
                });
            },
            err => console.log(err)
        );
    }

    save(id: number | string, item: IMarker) {
        console.log(item);
    };
}