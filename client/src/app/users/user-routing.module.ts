import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserListComponent} from './user-list.component';
import {UserDetailComponent} from './user-detail.component';
import {UserLocationsComponent} from "./user-locations/user-locations.component";

const userRoutes: Routes = [

    {path: 'users', component: UserListComponent},
    {path: 'user/locations', component: UserLocationsComponent},
    {path: 'user/:id', component: UserDetailComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {
}
