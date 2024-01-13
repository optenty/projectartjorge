import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Artworks, SearchResponse} from "../interfaces/artworks";

@Injectable({
  providedIn: 'root'
})
export class ArtService {


  public artworkList: Artworks[] = [];


  /*Private para que solo se pueda cambiar la variable dentro de este service*/
  private _tagsHistory: string[] = [];

  private serviceUrl: string = "https://api.artic.edu/api/v1/artworks";

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));

  }

  private organizeHistory(tag: string){
    if (tag !== '') {
      //unshift es para añadirlo al inicio
      this._tagsHistory.unshift(tag);
      //para que no tenga duplicados:
      this._tagsHistory = [...new Set(this._tagsHistory)];
      // Esto lo que hace es que elimina los 10 primeros items, el resultado de esto seria los 10 primeros que ha eliminado,
      // Entonces le asignamos ese resultado y tenemos los 10 items que queremos
      this._tagsHistory = this.tagsHistory.splice(0, 10);
      this.saveLocalStorage();
    }
  }

  private loadLocalStorage():void{
    if(localStorage.getItem('history')){
      //el parse lo que hace es coger el String que hemos hecho Stringificado y lo transforma a array
      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
      if (this._tagsHistory.length > 0) {
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }
  searchTag(tag: string) {

    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('limit', '10')
      .set('q', tag)
      .set('fields', 'image_id,title')

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params}).subscribe(response => {
      this.artworkList = response.data;
    })

  }
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }
}
