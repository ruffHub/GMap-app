import {Component, Injectable} from '@angular/core';
import '../assets/css/styles.css';
import {AuthenticationService} from "./auth/authentication.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private auth: AuthenticationService) {

    }

    /**
     * Checks is user logged already
     * @return {boolean}
     */
    isLogged(): boolean {
        return this.auth.isAuthorized();
    }
}
