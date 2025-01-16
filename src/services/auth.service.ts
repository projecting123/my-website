import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { CR_APP_CONFIG } from '../tokens/app.token';
import { TransferStateService } from './transferstate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly app = inject(CR_APP_CONFIG);
  public readonly isAuthorized = new BehaviorSubject<boolean | null>(null);
  readonly ts = inject(TransferStateService);
  constructor() {}

  /**
   * Logs the user out by sending a request to the logout endpoint.
   * Upon successful logout, the user is notified, and the form is reset.
   */
  logout() {
    return this.http.get('http://localhost:4500/api/logout', {
      withCredentials: true,
    });
  }

  /**
   * Finds the value of the `CR_ID` cookie during SSR.
   * @returns The value of the `CR_ID` cookie if found, or undefined if not.
   */
  getAuthToken_SSR(): string | undefined {
    return this.app.requestObj?.headers
      .get('cookie')
      ?.split(';')
      .find((cookie) => cookie.trim().startsWith('CR_ID'))
      ?.split('=')[1] as string | undefined;
  }


  /**
   * Fetch the user is authorized or not. `isAuthorized` is set accordingly based on the status.
   * This method also sets the userInfo in the transfer state, which will be used in the client side.
   */
  fetchAuthStatus(): Observable<boolean> {
    if (!this.app.isServer) {
      if (this.app.findCookieFromBrowser('CR_ID') === undefined) {
        this.isAuthorized.next(false);
        return of(false);
      }
      this.isAuthorized.next(true);
      return of(true);
    }

    if (!this.getAuthToken_SSR()) {
      this.isAuthorized.next(false);
      return of(false);
    }

    return this.http.get<{ isAuthorized: boolean }>(
        'http://localhost:4500/api/get_auth_status',
        { headers: { authCookie: this.getAuthToken_SSR()! } }
      )
      .pipe(
        tap((res) => this.ts.set(this.ts.AUTH_USER_KEY, res)),
        map((response: any) => response.isAuthorized),
        tap((isAuthorized) => this.isAuthorized.next(isAuthorized))
      );
  }
}
