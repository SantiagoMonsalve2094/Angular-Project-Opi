import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../features/auth/models/LoginDto';

export interface LoginCredentials {
  username: string;
  password: string;
}

const AUTH_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private ep = environment.endpoints;

  private readonly _currentUser = signal<string | null>(localStorage.getItem(AUTH_KEY));

  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly currentUser = this._currentUser.asReadonly();

  loginService(credentials: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.base}${this.ep.login}`, credentials);
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.loginService(credentials).pipe(
      tap((response) => {
        console.log('Respuesta del servidor:', response);
      }),
      map(() => {
        localStorage.setItem(AUTH_KEY, credentials.username);
        this._currentUser.set(credentials.username);
        console.log('Login correcto');

        return true;
      }),
      catchError((err) => {
        console.error('Error en login', err);
        return of(false);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    this._currentUser.set(null);
  }
}
