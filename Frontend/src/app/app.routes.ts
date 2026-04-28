import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { ContactPage } from './pages/contact/contact';
import { HomePage } from './pages/home/home';
import { ProjectsPage } from './pages/projects/projects';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login').then((m) => m.Login),
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],

    children: [
      {
        path: 'dashboard/:id/other',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        component: HomePage,
      },

      {
        path: 'mis-proyectos',
        component: ProjectsPage,
      },

      {
        path: 'contacto',
        component: ContactPage,
      },

      {
        path: 'expenses',
        loadComponent: () =>
          import('./features/expenses/components/expense-list/expense-list').then(
            (m) => m.ExpenseList,
          ),
      },
      {
        path: 'mi-tienda',
        redirectTo: 'expenses',
      },

    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
