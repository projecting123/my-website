import { animate, style, transition, trigger } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s ease-in-out', style({ opacity: 1 })),
  ]),
]);

export const sidebarAnimation = trigger('sidebarAnimation', [
  transition('collapsed => expanded', [
    style({ width: '2.5rem' }),
    animate('0.2s ease-in-out', style({ width: '9rem' })),
  ]),
  transition('expanded => collapsed', [
    style({ width: '9rem' }),
    animate('0.2s ease-in-out', style({ width: '2.5rem' })),
  ]),
]);
