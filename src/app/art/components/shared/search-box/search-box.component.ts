import {Component} from '@angular/core';
import {ArtService} from "../../../services/art.service";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  public tag : string ='';
  constructor(private artService: ArtService){}

  searchTag(){

    this.artService.searchTag(this.tag);

  }
}
