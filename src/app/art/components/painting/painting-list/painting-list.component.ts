import {Component, Input} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";

@Component({
  selector: 'art-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrl: './painting-list.component.css'
})
export class PaintingListComponent {
  @Input()
  public artworkList: Artworks[]=[];
}
