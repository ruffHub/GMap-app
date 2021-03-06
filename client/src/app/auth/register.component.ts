import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./auth.css']
})

export class RegisterComponent {
    newUser: any = {};
    loading = false;

    constructor(private router: Router,
                private AuthenticationService: AuthenticationService) {
    }

    register() {
        this.loading = true;
        this.AuthenticationService.register(this.newUser)
            .subscribe(
                data => {
                    if (data.status == 403) {
                        this.loading = false;
                        return alert(data._body);
                    }
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}