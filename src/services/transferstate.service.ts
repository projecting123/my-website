import { inject, Injectable, makeStateKey, StateKey, TransferState } from "@angular/core";
import { AuthUserInfo } from "../app/interfaces";

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  private readonly ngTransferState = inject(TransferState);
  readonly AUTH_USER_KEY = makeStateKey<AuthUserInfo>('authUser');

  get<T>(key: StateKey<T>){
    return this.ngTransferState.get(key, null);
  }

  set<T>(key: StateKey<T>, data: any){
    this.ngTransferState.set(key, data);
  }

  remove<T>(key: StateKey<T>){
    this.ngTransferState.remove(key);
  }
}