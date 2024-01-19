import { Component } from '@angular/core';
import {ArtService} from "../../services/art.service";

@Component({
  selector: 'app-painting-page',
  templateUrl: './painting-page.component.html',
  styleUrl: './painting-page.component.css'
})
export class PaintingPageComponent {
  constructor(private artService:ArtService ){}

  get arts(){
    return this.artService.artworkList;
  }
}
