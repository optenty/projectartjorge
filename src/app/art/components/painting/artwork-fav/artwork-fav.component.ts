import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-artwork-fav',
  templateUrl: './artwork-fav.component.html',
  styleUrl: './artwork-fav.component.css'
})
export class ArtworkFavComponent implements OnChanges, OnInit{
  public urlImagen!: string;
  @Input()
  public artwork!: Artworks;
  ngOnInit(): void {
    if(!this.artwork) throw new Error ("No estas enviando ningun ARTWORK");

  }
  get UserId(){
    let user = sessionStorage.getItem('user');
    const userObj = JSON.parse(user!);
    return userObj.id
  }
  constructor(private router: Router, private authService:AuthService) {}

  ngOnChanges(changes: SimpleChanges) {

    if (this.artwork.image_id === undefined || this.artwork.image_id === null) {
      console.log("Esta obra no tiene imagen asociada");
      this.urlImagen="https://www.artic.edu/iiif/2/";
    } else {
      this.urlImagen= "https://www.artic.edu/iiif/2/" + this.artwork.image_id + "/full/843,/0/default.jpg";
    }
  }

  navigateToDetails() {
    this.router.navigate(['/artworks/details'], { queryParams: { artwork: JSON.stringify(this.artwork) } });
  }
}
