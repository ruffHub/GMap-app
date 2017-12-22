import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './not-found.component';
import {UserListComponent} from './users/user-list.component';
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./auth/login.component";
import {RegisterComponent} from "./auth/register.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}