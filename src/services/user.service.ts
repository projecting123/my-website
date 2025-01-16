import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUserInfo } from '../app/interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
    readonly userSubject = new BehaviorSubject<null | AuthUserInfo>(null);
    set(user: AuthUserInfo) { this.userSubject.next(user) }
}