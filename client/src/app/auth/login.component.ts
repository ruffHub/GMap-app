import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from './authentication.service';
import {AlertService} from "../alert/alert.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./auth.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.name, this.model.password)
            .subscribe(
                data => {
                    this.loading = false;
                },
                error => {
                    console.log(error)
                });
    }
}
