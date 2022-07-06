import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { alumnosResponse } from '../interfaces/alumnoResponse.interface';

const url_base = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  getAlumnos(desde: number = 0){
    return this.http.get<alumnosResponse>(`${url_base}/alumnos?desde=${desde}`, this.headers)
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
}
