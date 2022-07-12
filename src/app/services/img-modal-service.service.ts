import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
const base_url = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class ImgModalServiceService {


  private _ocultarModal= true;
  

  public tipo ='';
  public id ='';
  public img ='';
  imgModal!: any;

  public nuevaImagen : EventEmitter<string> = new EventEmitter<string>();

  constructor(private usuarioService:UsuarioService, private http : HttpClient) { }



  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    tipo:'usuario'|'materia'|'evento',
    id: string, 
    img?: string,
    ){
      this.tipo = tipo;
      this.id = id
      if(img?.includes('https')){
        this.img = img;
      }else{

        this.imgModal = `${base_url}/uploads/imagen/${tipo}/${img}`;
      }
    this._ocultarModal = false;
    console.log(tipo,id,img);
    

  }

  cerrarModal(){
    this._ocultarModal = true;
  }

 
  
}
