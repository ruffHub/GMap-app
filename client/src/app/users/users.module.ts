import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserListComponent} from './user-list.component';
import {UserDetailComponent} from './user-detail.component';
import {UserService} from './user.service';
import {UserRoutingModule} from './user-routing.module';
import {UserLocationsComponent} from "./user-locations/user-locations.component";
import {UserLocationsService} from "./user-locations/user-locations.service";
import {MapsModule} from "../map/maps.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        MapsModule
    ],
    declarations: [
        UserListComponent,
        UserDetailComponent,
        UserLocationsComponent
    ],
    providers: [
        UserService,
        UserLocationsService
    ]
})
export class UsersModule {
}
