import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public form: FormGroup;
  public loading: boolean = false;
  // public httpResponse: any = {};
  public redirectTo: string = '';

  constructor(
    // private _http: HttpClient,
    private _router: Router // TODO: add formService here
  ) {
    this.form = new FormGroup({
      email: new FormControl(``, [Validators.required]),
      password: new FormControl(``, [Validators.required]),
    });
  }

  /**
   * @description:
   */
  public ngOnInit(): void {
    // const message = $localize`test message`;
    // window.location.pathname = '/auth/change-password';
  }

  ngSubmit() {
    console.log('testando', this.form.value);
    // if (!this.form.valid) return;

    Promise.resolve().then(() => {
      this.loading = false;
      this.redirectToHome();
    });

    // this.loading = true;

    // this._http
    //   .post('/api/auth/login', this.form.value)
    //   .subscribe((response: any) => {
    //     this.httpResponse = response;
    //     if (!response.success) {
    //       this.loading = false;
    //       return;
    //     }

    //     // TODO: guardar o token
    //     // this.userService.setToken(response.token);
    //     this.loading = false;
    //     this._router.navigate(['/', 'dashboard']);
    //   });
  }

  redirectToHome() {
    this._router.navigate(['/', 'home']);
  }
}
