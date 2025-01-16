import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { CR_APP_CONFIG } from '../tokens/app.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly app = inject(CR_APP_CONFIG);
  public readonly isAuthorized = new BehaviorSubject<boolean | null>(null);
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
   * Returns an observable that emits the user's authorization status.
   * If the user is not authorized, the observable emits false otherwise true.
   * The observable also updates the value of the `isAuthorized` subject accordingly.
   *
   * You, shouldn't call this method unless you've to check for fresh authorization status, 
   * because it involves network request. Instead, you can use the `isAuthorized` subject.
   *
   */
  getUserAuthStatus(): Observable<any> {
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

    return this.http
      .get<{ isAuthorized: boolean }>(
        'http://localhost:4500/api/get_auth_status',
        { headers: { authCookie: this.getAuthToken_SSR()! } }
      )
      .pipe(
        map((response: any) => response.isAuthorized),
        tap((isAuthorized) => this.isAuthorized.next(isAuthorized))
      );
  }

  /**
   * Makes a request to the server to get the user's information.
   * On the client, the request is sent with the `withCredentials` flag set to true.
   * On the server, the request is sent with the `authCookie` header set to the value of the `CR_ID` cookie.
   */
  getAuthUserInfo(): Observable<any> {
    if(!this.isAuthorized) return of(null);
    if (this.app.isServer) {
      return this.http.get('http://localhost:4500/api/get_user_info', {
        headers: { authCookie: this.getAuthToken_SSR()! },
      });
    }
    const user = localStorage.getItem('user');
    if (user) return of(JSON.parse(user));
    return this.http.get('http://localhost:4500/api/get_user_info', {
      withCredentials: true,
    });
  }
}
