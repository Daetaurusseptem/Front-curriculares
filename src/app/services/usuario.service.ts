import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/models/usuario.model';
import { menu } from '../interfaces/menu.insterface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url=environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario!:Usuario;
  constructor(private http: HttpClient) { }

  login(formData:{email:string,password:string}){
    return this.http.post(`${base_url}/auth`, formData)
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      })
    );
  }
  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/auth/renew`, this.headers)
    .pipe(
      map( (resp: any) => {

        const uid = resp.uid;
        const {nombre, email, apellido1, role, cuatrimestre='', carrera='', img= '', matricula, materia, apellido2, servicioSocial, asistencias} = resp.usuario;
        this.usuario = new Usuario(uid, nombre, apellido1, email, role, cuatrimestre, carrera, matricula, materia, servicioSocial, apellido2, '', img, undefined, asistencias);
        this.guardarLocalStorage(resp.token, resp.menu)
        return true;
      }),
      catchError( error => of(false) )
    );

  }

  createUser(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      })
    );
  }



  deleteUser(uid:String){
    return this.http.delete(`${base_url}/usuarios/${uid}`)
  }


  get headers(): object{
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  get token(): string{
    return localStorage.getItem('token') || '';
  }
   get role():'admin'|'maestro'|'alumno'{
     return this.usuario.role
   }

   get id(): string{
     return this.usuario._id || '';
   }
  guardarLocalStorage(token:string, menu:any){
    var a = JSON.stringify(menu)
    console.log(a);
    localStorage.setItem('token', token );
    localStorage.setItem('menu', a );
}
  borrarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
}




}



