import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!:string;

  //Para no hacerlo obligatorio lo inicializamos a string vacío, entonces si no lo enviamos no pasa nada, se inicializa a ""
  @Input()
  public alt : string = "";

  public hasLoaded: boolean = false;


  ngOnInit(): void {
    if (!this.url) throw new Error('Missing URL PROPIERTY')
  }
  onLoad(){
    console.log('Image loaded');
    this.hasLoaded = true;
  }

}
