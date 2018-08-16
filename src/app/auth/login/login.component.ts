import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../_shared/services/alert.service';
import { AuthenticationService } from '../../_shared/services/authentication.service';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main/dashboard';
        console.log('return url', this.returnUrl);
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.userName, this.model.password)
            .subscribe(
                data => {
                    console.log('User Data', data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log('Error: Username or Password incorrect', error.error.message);
                    this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}
