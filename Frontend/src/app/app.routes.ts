import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { ContactPage } from './pages/contact/contact';
import { HomePage } from './pages/home/home';
import { ProjectsPage } from './pages/projects/projects';

export const routes: Routes = [
  {
    path: '',
    component: Layout,

    children: [
      {
        path: '',
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
    redirectTo: 'home',
  },
];
