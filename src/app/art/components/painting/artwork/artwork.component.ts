import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";
import {Router} from "@angular/router";

@Component({
  selector: 'art-artwork',
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.css'
})
export class ArtworkComponent implements OnInit, OnChanges{
  @Input()
  public artwork!: Artworks;


  ngOnInit(): void {
    if(!this.artwork) throw new Error ("No estas enviando ningun GIFCARD");

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


  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/artworks/details'], { queryParams: { artwork: JSON.stringify(this.artwork) } });
  }


}
