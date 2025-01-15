// create a page not found component
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cr-page-error',
  templateUrl: './pnf.component.html',
  imports: [RouterLink],
  styleUrls: ['./pnf.component.scss']
})
export class PageNotFoundComponent {
  readonly auth = inject(AuthService);
}