import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "../guards/auth-guard.guard";
import { MateriasMaestroComponent } from "./maestro-herramientas/materias-maestro/materias-maestro.component";
import { CrearMaestroComponent } from "./mantenimientos/crear-maestro/crear-maestro.component";
import { MaestrosComponent } from "./mantenimientos/maestros/maestros.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { MateriaComponent } from "./materias/materia.component";
import { MateriasComponent } from "./materias/materias.component";
import { PagesComponent } from "./pages.component";


const routes:Routes = [
    {
        path:'dashboard',
        component:PagesComponent,
        canActivate:[AuthGuardGuard],
        children:[
            { path: 'alumnos', component: UsuariosComponent },
            { path: 'maestros', component: MaestrosComponent },
            { path:'crear-maestro', component:CrearMaestroComponent},
            { path:'materias-maestros', component:MateriasMaestroComponent},
            { path:'materias', component:MateriasComponent},
            { path:'materia/:id', component:MateriaComponent}
        ]
    }
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})


export class PagesRoutingModule{}