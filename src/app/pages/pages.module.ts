import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { CrearMaestroComponent } from './mantenimientos/crear-maestro/crear-maestro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaestrosComponent } from './mantenimientos/maestros/maestros.component';
import { MateriasMaestroComponent } from './maestro-herramientas/materias-maestro/materias-maestro.component';
import { MateriasComponent } from './materias/materias.component';
import { MateriaComponent } from './materias/materia.component';



@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent,
    UsuariosComponent,
    CrearMaestroComponent,
    MaestrosComponent,
    MateriasMaestroComponent,
    MateriasComponent,
    MateriaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
