import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private startsWithOpi(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value ?? '';

    return value.length > 0 && !value.toLowerCase().startsWith('opi')
      ? { startsWithOpi: true }
      : null;
  }

  protected readonly loginError = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        this.startsWithOpi,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();

    this.authService.login({ username, password }).subscribe((success) => {
      if (success) {
        this.router.navigate(['/expenses']);
      } else {
        this.loginError.set(true);
      }
    });
  }

  protected get usernameControl() {
    return this.form.controls.username;
  }

  protected get passwordControl() {
    return this.form.controls.password;
  }

  cancel(): void {
    this.router.navigate(['/recovery-password']);
  }
}
