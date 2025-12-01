import { Component, inject } from '@angular/core';
import { FormUtils } from '../../utils/form-utils';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { USER } from '../../shared/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  readonly formUtils = FormUtils;
  readonly pass = USER;
  onSumit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log(this.loginForm.value);

    if (this.validated()) this.router.navigateByUrl('/home');
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  private validated() {
    return (
      this.loginForm.controls['email'].value == this.pass.email &&
      this.loginForm.controls['pass'].value == this.pass.password
    );
  }
}
