import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private usuarioService:UsuarioService,
    private router:Router
    ){}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot):  boolean  {
  console.log(this.usuarioService.role);
if(this.usuarioService.role=='admin'){
return true;
}else{
  console.log('nel');
this.router.navigateByUrl('/dashboard')
return false
}


}

}
