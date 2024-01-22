import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {ArtService} from "../../../services/art.service";

@Component({
  selector: 'art-artwork-fav',
  templateUrl: './artwork-fav.component.html',
  styleUrl: './artwork-fav.component.css'
})
export class ArtworkFavComponent implements OnInit, OnChanges{
  public urlImagen!: string;
  @Input()
  public artFavs!: string;
  // @ts-ignore
  public artwork! : Artworks = {};
  ngOnInit(): void {
    console.log("dentro del ultimo artwork individual "+this.artFavs)
    const observable = this.artService.loadArtworksId(this.artFavs);

    observable.subscribe({
      next: (data) => {
        console.log('Valor obtenido:', data);
        this.artwork=data;
        this.updateImage()
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('La suscripción se completó');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  this.updateImage();
  }

  updateImage(){
    if (this.artwork.image_id === undefined || this.artwork.image_id === null) {
      console.log("Esta obra no tiene imagen asociada");
      this.urlImagen="https://www.artic.edu/iiif/2/";
    } else {
      console.log("entro aqui");
      this.urlImagen= "https://www.artic.edu/iiif/2/" + this.artwork.image_id + "/full/843,/0/default.jpg";
    }
  }

  constructor(private router: Router, private authService:AuthService, private artService: ArtService) {

  }



  navigateToDetails() {
    this.router.navigate(['/artworks/details'], { queryParams: { artwork: JSON.stringify(this.artwork) } });
  }
}
