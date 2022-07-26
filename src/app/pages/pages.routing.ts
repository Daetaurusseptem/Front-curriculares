import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "../guards/auth-guard.guard";
import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import { MateriasMaestroComponent } from "./maestro-herramientas/materias-maestro/materias-maestro.component";
import { CrearMaestroComponent } from "./mantenimientos/crear-maestro/crear-maestro.component";
import { MaestrosComponent } from "./mantenimientos/maestros/maestros.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { MateriaComponent } from "./mantenimientos/materias/materia.component";
import { MateriasComponent } from "./mantenimientos/materias/materias.component";
import { PagesComponent } from "./pages.component";
import { UsuarioComponent } from "./mantenimientos/usuarios/usuario.component";
import { MaestroComponent } from "./mantenimientos/maestros/maestro.component";
import { CrearMateriaComponent } from "./mantenimientos/crear-materia/crear-materia.component";
import { HorarioComponent } from "./mantenimientos/horario/horario.component";
import { EventosComponent } from "./mantenimientos/eventos/eventos.component";
import { CrearEventoComponent } from "./mantenimientos/crear-evento/crear-evento.component";
import { EventoComponent } from "./mantenimientos/eventos/evento.component";
import { EventoDetailsComponent } from "./dashboard-admin/evento-details/evento-details.component";


const routes:Routes = [
    {
        path:'dashboard',
        component:PagesComponent,
        canActivate:[AuthGuardGuard],
        canLoad:[AuthGuardGuard],
        loadChildren:()=>import('./child-routes.module').then(m=>m.ChildRoutesModule)
    }
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})


export class PagesRoutingModule{}
