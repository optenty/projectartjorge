import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Artworks, Pagination, SearchResponse} from "../interfaces/artworks";

@Injectable({
  providedIn: 'root'
})
export class ArtService {


  public artworkList: Artworks[] = [];


  /*Private para que solo se pueda cambiar la variable dentro de este service*/
  private _tagsHistory: string[] = [];

  private serviceUrl: string = "https://api.artic.edu/api/v1/artworks";

  public currentPage = 1;

  public totalPages!:number;

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

    this.loadArtworks(tag)
    // Calcular el total de páginas
  }

  loadArtworks(tag:string){
    const params = new HttpParams()
      .set('limit', '10')
      .set('q', tag)
      .set('fields', 'image_id,title,artist_title,artwork_type_title,date_start,thumbnail,id')
      .set('page', this.currentPage.toString());



    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params}).subscribe(response => {
      this.artworkList = response.data;
      const pagination: Pagination = response.pagination;
      this.totalPages = pagination.total_pages;
    })
  }

  nextPage(tag:string) {
    this.currentPage++;
    this.loadArtworks(tag);
  }

  prevPage(tag:string) {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadArtworks(tag);
    }
  }


    constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }
}
