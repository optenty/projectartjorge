import {Component, OnInit} from '@angular/core';
import {Artworks} from "../../../interfaces/artworks";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'art-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrl: './painting-details.component.css'
})
export class PaintingDetailsComponent implements OnInit {
  public artwork!: Artworks;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const artworkString = this.route.snapshot.queryParams["artwork"];
    this.artwork = JSON.parse(artworkString);
    console.log("test" + this.artwork)

  }


}
