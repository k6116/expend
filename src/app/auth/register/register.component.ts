import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_shared/services/authentication.service';
import { AlertService } from '../../_shared/services/alert.service';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  register() {
    this.loading = true;
    this.authenticationService.register(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
