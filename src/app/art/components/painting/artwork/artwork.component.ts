import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'art-artwork',
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.css'
})
export class ArtworkComponent implements OnInit, OnChanges{
  @Input()
  public artwork!: Artworks;
  popupVisible: boolean = false;
  public favoritosId : string[]=[];
  isLoggedIn: boolean = this.authService.isLogged();

  ngOnInit(): void {
    if(!this.artwork) throw new Error ("No estas enviando ningun ARTWORK");

    this.authService.getFavoritos(this.authService.UserId).subscribe({
      next: (favoritosId: string[]) => {
        console.log('Favoritos obtenidos:', favoritosId.pop());
        this.favoritosId = favoritosId;
      },
      error: (error: any) => {
        console.error('Error obteniendo favoritos:', error);
      },
      complete: () => {
        console.log('Obtención de favoritos completa');
        console.log('fav obtenidos:', this.favoritosId);
        this.botonFav();
      }
    });



  }
  public urlImagen!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (this.artwork.image_id === undefined || this.artwork.image_id === null) {
      console.log("Esta obra no tiene imagen asociada");
      this.urlImagen="https://www.artic.edu/iiif/2/";
    } else {
      this.urlImagen= "https://www.artic.edu/iiif/2/" + this.artwork.image_id + "/full/843,/0/default.jpg";
    }
    }

  constructor(private router: Router, private authService:AuthService) {}

  navigateToDetails() {
    this.router.navigate(['/artworks/details'], { queryParams: { artwork: JSON.stringify(this.artwork) } });
  }

  botonFav(){
    //pillar todas las artworks, guardarlas en un array y hacer el contains
    if(this.favoritosId.includes(String(this.artwork.id))){
      console.log("Esta obra esta en favoritos");
      this.popupVisible=true;
    }else{
      console.log("Esta obra no está en favoritos");
      this.popupVisible=false
    }

  }

  favoritos(){
    this.popupVisible = true;
    //primero vamos a hacer console.log de la id del artwork que estamos visualizando

    // this.authService.addFavoritos( this.artwork.id)
    let user = sessionStorage.getItem('user');
    const userObj = JSON.parse(user!);
    console.log('le paso a fav: ' + userObj.id , this.artwork.id)
    this.authService.addFavoritos(userObj.id, this.artwork.id).subscribe({
      error: (error) => {
        console.error('Error al obtener la URL del avatar:', error);
      },
      // Puedes incluir complete si es necesario
      complete: () => {
        console.log('La suscripción ha sido completada.');
      }
    });

  }

  deleteFavoritos(){
    this.popupVisible = false;
    let user = sessionStorage.getItem('user');
    const userObj = JSON.parse(user!);
    console.log('le paso a removeFav: ' + userObj.id , this.artwork.id)
    this.authService.removeFavoritos(userObj.id, this.artwork.id).subscribe({
      error: (error) => {
        console.error('Error al obtener la URL del avatar:', error);
      },
      // Puedes incluir complete si es necesario
      complete: () => {
        console.log('La suscripción ha sido completada.');
      }
    });
  }
}
