import {Component, OnInit} from '@angular/core';
import {ArtService} from "../../services/art.service";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-fav-page',
  templateUrl: './fav-page.component.html',
  styleUrl: './fav-page.component.css'
})
export class FavPageComponent implements OnInit{
  constructor(private artService:ArtService, private authService: AuthService ){}
  //Tengo que cambiar esto para que artworkList se modifique de forma manual y no de la forma en la que lo busca el searchbox


  ngOnInit(): void {
  }


}
