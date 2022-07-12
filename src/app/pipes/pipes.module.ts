import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarImagenPipe } from './mostrar-imagen.pipe';
import { CutNamePipe } from './cut-name.pipe';



@NgModule({
  declarations: [MostrarImagenPipe, CutNamePipe],
  imports: [
    CommonModule
  ],
  exports:[
    MostrarImagenPipe,
    CutNamePipe
  ]
})
export class PipesModule { }
