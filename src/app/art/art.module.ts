import { NgModule } from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SearchBoxComponent} from "./components/shared/search-box/search-box.component";
import {MainContainerComponent} from "./components/main-container/main-container.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {PaintingDetailsComponent} from "./components/painting/painting-details/painting-details.component";
import {PaintingListComponent} from "./components/painting/painting-list/painting-list.component";
import { PaintingPageComponent } from './pages/painting-page/painting-page.component';
import { PaintingDetailsPageComponent } from './pages/painting-details-page/painting-details-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {RouterModule} from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArtworkComponent } from './components/painting/artwork/artwork.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import {LazyImageComponent} from "./components/shared/lazy-image/lazy-image.component";
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { AuthLayoutComponent } from './auth/layouts/auth-layout/auth-layout.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBoxComponent,
    MainContainerComponent,
    HomePageComponent,
    PaintingDetailsComponent,
    PaintingListComponent,
    PaintingPageComponent,
    PaintingDetailsPageComponent,
    ErrorPageComponent,
    ArtworkComponent,
    SidebarComponent,
    LazyImageComponent,
    PaginationComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgFor
  ],
  exports: [
    HomePageComponent,
    PaintingPageComponent,
    PaintingDetailsPageComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ArtModule { }
