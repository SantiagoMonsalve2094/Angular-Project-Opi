import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Login } from './login';
import { AuthService } from '../../../../core/auth/auth.service';
import { environment } from '../../../../../environments/environment';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let userAuth: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    userAuth = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h1 with text "Iniciar sesion"', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toEqual('Iniciar sesion');
  });

  it('should welcome "opiSantiago"', () => {
    userAuth.login({ username: 'opiSantiago', password: '123456' }).subscribe();

    const req = httpTesting.expectOne(`${environment.apiBaseUrl}${environment.endpoints.login}`);
    req.flush('Login successful');

    expect(userAuth.currentUser()).toEqual('opiSantiago');
  });
});
