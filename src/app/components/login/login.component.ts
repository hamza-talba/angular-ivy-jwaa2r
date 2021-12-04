import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginSubscription: Subscription;
  isLoginInvalid: boolean = false;
  loading: boolean = false;
  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login() {
    //simulating login
    if (this.loginForm.valid) {
      this.loading = true;
      let payload = this.loginForm.value;
      this.loginSubscription = of(payload)
        .pipe(
          delay(1500),
          switchMap((req) => {
            console.log(req);
            if (
              payload.password === '123456' &&
              payload.email === 'hamza@mail.com'
            ) {
              return of(true);
            } else {
              return of(false);
            }
          })
        )
        .subscribe(
          (res) => {
            if (res) {
              localStorage.setItem('token', '123123123');
              this.router.navigate(['/dashboard']);
            } else {
              this.isLoginInvalid = true;
            }
            this.loading = false;
          },
          (err) => (this.loading = false)
        );
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
