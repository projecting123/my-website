import { Routes } from '@angular/router';
import { routeGuard } from './route.guard';
import { authResolver } from './auth.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./index/index.component').then((m) => m.IndexPage),
    canActivate: [routeGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [routeGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    canActivate: [routeGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [routeGuard],
    resolve: { auth: authResolver },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../components/dashboard/index/index.component').then(
            (m) => m.IndexPage
          ),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('../components/dashboard/courses/courses.component').then(
            (m) => m.CoursesPage
          ),
      },
      {
        path: 'quiz',
        loadComponent: () =>
          import('../components/dashboard/quiz/quiz.component').then(
            (m) => m.QuizPage
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import(
            '../components/dashboard/notification/notification.component'
          ).then((m) => m.NotificationPage),
      },
      {
        path: 'materials',
        loadComponent: () =>
          import('../components/dashboard/materials/materials.component').then(
            (m) => m.MaterialsPage
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../components/dashboard/settings/settings.component').then(
            (m) => m.SettingsPage
          ),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('../components/dashboard/faq/faq.component').then(
            (m) => m.FAQComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/page-not-found/pnf.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
