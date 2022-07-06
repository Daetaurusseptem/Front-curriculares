import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {
  menuItems: any[]=[];
  
  constructor(private sideBarService:SidebarService) {
    this.menuItems = this.sideBarService.menu
   }

  ngOnInit(): void {
  }

}
