import {Component, Input, OnInit} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";
import {Observable} from "rxjs";
import {ArtService} from "../../../services/art.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'art-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrl: './favourite-list.component.css'
})
export class FavouriteListComponent implements OnInit {


  constructor(private artService:ArtService, private authService: AuthService ){}
  public favoritos : string[]=[];

  ngOnInit(): void {
    this.authService.getFavoritos(this.authService.UserId).subscribe({
      next: (favoritos: string[]) => {
        console.log('Favoritos obtenidos:', favoritos.pop());
        this.favoritos = favoritos;
      },
      error: (error: any) => {
        console.error('Error obteniendo favoritos:', error);
      },
      complete: () => {
        console.log('Obtención de favoritos completa');
      }
    });
    }


}
