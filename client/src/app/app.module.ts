import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {UsersModule} from './users/users.module';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from "./auth/login.component";
import {AuthenticationService} from "./auth/authentication.service";
import {MapsModule} from "./map/maps.module";
import {RegisterComponent} from "./auth/register.component";
import {AlertComponent} from "./alert/alert.component";
import {AlertService} from "./alert/alert.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        MapsModule,
        UsersModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        AboutComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
    ],
    providers: [
        AuthenticationService,
        AlertService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
