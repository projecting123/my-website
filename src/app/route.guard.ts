import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const routeGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router)
  const path = route.url[0]?.path;
  
  // home route
  if(path == undefined){
    const isAuthorized = await firstValueFrom(auth.isUserAuthorized());
    if(isAuthorized){
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  if(path == 'signup' || path == 'login'){
    const isAuthorized = await firstValueFrom(auth.isUserAuthorized());
    if(isAuthorized){
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  else if(path == 'dashboard'){
    const isAuthorized = await firstValueFrom(auth.isUserAuthorized());
    if(!isAuthorized){
      router.navigate(['/login']);
      return false;
    };
    return true;
  }
  return true;
}