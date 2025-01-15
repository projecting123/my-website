import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'signup',
    renderMode: RenderMode.Server
  },
  {
    path: 'login',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/courses',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/quiz',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/notifications',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/materials',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/settings',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard/faq',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
