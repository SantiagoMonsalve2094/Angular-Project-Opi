import { ApplicationConfig , provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import {  provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { expensesReducer } from './features/expenses/store/expenses.reducer';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZonelessChangeDetection(),

    provideHttpClient(),

    provideRouter(routes),

    provideStore({ expenses: expensesReducer }),
  ],
};
