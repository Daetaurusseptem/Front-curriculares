import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html'
})
export class ModalImagenComponent{

  public imgSubir!: File;
  public imgActualizar!: any;
  
  

  constructor(
    public imgModalService: ImgModalServiceService,
    private fileUploadService: FileUploadService
    ) { }

  
  cerrarModal() {
    this.imgActualizar = null;
    this.imgModalService.cerrarModal();
  }

  cambiarImage(file: File): void {
    this.imgSubir = file;
    if (!file) {
      this.imgActualizar = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgActualizar = reader.result;
    };
  }

  subirImagen(){
    const id = this.imgModalService.id;
    const tipo:any = this.imgModalService.tipo;

    if (this.imgSubir){
      this.fileUploadService.actualizarFoto(this.imgSubir, tipo, id)
      .then(img => {
        
        Swal.fire({
          title:'Guardado',
          text:'Imagen de usuario actualizada'
        })
        //Emitimos el cambio hecho

        this.imgModalService.nuevaImagen.emit(img)

        this.cerrarModal()

      })
      .catch(err => {
        console.log(err);
      });
    }else{
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Seleccione una imagen valida'
      });
    }
  }

}
