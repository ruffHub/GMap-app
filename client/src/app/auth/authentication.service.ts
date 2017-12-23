import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";

export type newUser = {
    name: string,
    password: string,
    age?: string,
    occupation?: string,
}

@Injectable()
export class AuthenticationService {

    protected _isAuthorised = false;


    constructor(private http: Http,
                private router: Router,
                private location: Location,
                private alertService: AlertService) {
        this._isAuthorised = !!localStorage.getItem('currentUser');
    }

    /**
     * Checks if current user authorised or not
     * @return {boolean}
     */
    public isAuthorized(): boolean {
        return this._isAuthorised;
    }

    /**
     * Authorize current user
     * Store user details and jwt token in local storage to keep user logged in between page refreshes
     * @param {{token: string}} user
     */
    protected authorize(user: { token?: string }) {
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this._isAuthorised = true;
            this.router.navigate(['/users']);
        }
        this.alertService.success("success");
        console.log(user);
        return user;
    }

    /**
     * @param {string} name
     * @param {string} password
     * @return {Observable<{token?: string}>}
     */
    public login(name: string, password: string) {
        return this
            .http
            .post('http://localhost:8000/api/v1/auth', {name: name, password: password})
            .map((response: Response) => this.authorize(response.json()))
            .catch((error: any) => {
                return Observable.of(error)
            });
    }

    public register(newUser: newUser) {
        return this
            .http
            .post('http://localhost:8000/api/v1/register', newUser)
            .map((response: Response) => response)
            .catch((error: any) => {
                return Observable.of(error)
            });
    }

    /**
     * Remove user from local storage to log user out
     */
    public logout() {
        localStorage.removeItem('currentUser');
        this._isAuthorised = false;
    }
}