import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SearchBoxComponent} from "./components/search-box/search-box.component";
import {MainContainerComponent} from "./components/main-container/main-container.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {PaintingDetailsComponent} from "./components/painting/painting-details/painting-details.component";
import {PaintingListComponent} from "./components/painting/painting-list/painting-list.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBoxComponent,
    MainContainerComponent,
    HomePageComponent,
    PaintingDetailsComponent,
    PaintingListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent,
  ]
})
export class ArtModule { }
