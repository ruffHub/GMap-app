import 'rxjs/add/operator/switchMap';
import {Component, OnInit, HostBinding, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import {User, UserService} from './user.service';
import {MapService, IMarker} from "../map/map.service";
import any = jasmine.any;

@Component({
    selector: 'detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user.css'],
    providers: [MapService]
})
export class UserDetailComponent implements OnInit {
    // @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';
    isEditState: boolean = false;
    list: Array<IMarker> = [];
    user: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: UserService,
                public mapService: MapService,
                public ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => this.loadUser(params));

        // this.mapService.onAddMarkerFromMap(() => {
        //     this.ref.detectChanges();
        // });

        this.route.params.subscribe((params: Params) => this.loadMarkers(params));
    }

    private loadUser(params: Params) {
        this.service.getUser(params['id'])
            .subscribe(
                user => this.user = user,
                err => console.log(err)
            )
    }

    goToUsers(user: User) {
        let id = user ? user.id : null;
        this.router.navigate(['/users', {id}]);
    }

    toggleEditState() {
        this.isEditState = !this.isEditState;
    }

    save() {
        this.service.updateUser(this.user)
            .subscribe();
    }

    delete() {
        this.service.deleteUser(this.user)
            .subscribe();
    }

    loadMarkers(params: Params) {
        this.service.getLocations(params['id'])
            .subscribe(
                markers => {
                    this.list = markers;
                    this.list.forEach((item) => {
                        this.mapService.add(item);
                    });
                },
                err => console.log(err)
            );
    }

}
