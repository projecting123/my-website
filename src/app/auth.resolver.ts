import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const authResolver: ResolveFn<any> = async () => {
  const auth = inject(AuthService);
  const res = await firstValueFrom(auth.getAuthUserInfo());
  return res;
};
