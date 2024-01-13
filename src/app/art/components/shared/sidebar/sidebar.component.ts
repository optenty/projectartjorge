import { Component } from '@angular/core';
import {ArtService} from "../../../services/art.service";

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private gifsService: ArtService){}

  get tags():string[]{
    return this.gifsService.tagsHistory;
  }

  searchTags(busqueda:string){
    return this.gifsService.searchTag(busqueda);
  }


}
