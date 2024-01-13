import { Component } from '@angular/core';
import {ArtService} from "../../../services/art.service";

@Component({
  selector: 'art-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {


  constructor(protected artService:ArtService ){}



}
