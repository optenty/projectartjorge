import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SearchBoxComponent} from "./components/search-box/search-box.component";
import {MainContainerComponent} from "./components/main-container/main-container.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBoxComponent,
    MainContainerComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent,
  ]
})
export class ArtModule { }
