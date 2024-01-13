import {Component, Input} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";

@Component({
  selector: 'art-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrl: './painting-list.component.css'
})
export class PaintingListComponent {
  /*gifsList tiene que tener el mismo nombre de la propiedad que tenemos que importar del padre html*/
  @Input()
  public artworkList: Artworks[]=[];
}
