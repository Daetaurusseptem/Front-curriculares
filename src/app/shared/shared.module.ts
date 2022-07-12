import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PagesModule } from '../pages/pages.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    PipesModule
  ],
  exports:[
    SideBarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
