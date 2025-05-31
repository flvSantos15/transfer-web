import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

/**
 * TODO: implementar
 * create unit tests
 * create validations
 * create formService
 */

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router // TODO: add formService here
  ) {
    this.form = new FormGroup({
      name: new FormControl(``, [Validators.required]),
      email: new FormControl(``, [Validators.required]),
      password: new FormControl(``, [Validators.required]),
    });
  }

  ngSubmit() {
    if (!this.form.valid) return;

    this.loading = true;

    this._authService.signup(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );
    // mostrar um toast de sucesso
    // this._toastService.showSuccess('Signup successful');
    this.loading = false;
  }

  redirectToLogin() {
    this._router.navigate(['/']);
  }
}
