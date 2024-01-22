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
    let suscripcionIds = this.authService.getFavoritos(this.UserId).subscribe({
      next: (favoritos: string[]) => {
        console.log('Favoritos obtenidos:', favoritos.pop());
        this.favoritos = favoritos;
        // Hacer algo con los favoritos obtenidos
      },
      error: (error: any) => {
        console.error('Error obteniendo favoritos:', error);
        // Manejar el error
      },
      complete: () => {
        console.log('Obtención de favoritos completa');
        // Realizar acciones después de completar la obtención de favoritos
      }
    });
    }
  get UserId(){
    let user = sessionStorage.getItem('user');
    const userObj = JSON.parse(user!);
    return userObj.id
  }


}
