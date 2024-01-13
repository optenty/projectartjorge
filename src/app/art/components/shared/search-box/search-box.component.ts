import {Component, ElementRef, ViewChild} from '@angular/core';
import {ArtService} from "../../../services/art.service";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
@ViewChild('txtTagInput')
public tagInput!: ElementRef<HTMLInputElement>;
  constructor(private artService: ArtService){}

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.artService.searchTag(newTag);

    this.tagInput.nativeElement.value = "";

  }
}
