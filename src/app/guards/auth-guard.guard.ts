

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private usuarioService:UsuarioService,
              private router:Router
              ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.usuarioService.validarToken()
      .pipe(
        tap(isAuth => {
          if (!isAuth){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.usuarioService.validarToken()
    .pipe(
      tap(isAuth => {
        if (!isAuth){
          this.router.navigateByUrl('/login');
        }
      }))
  }

}
