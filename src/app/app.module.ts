import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './art/pages/home-page/home-page.component';
import {ArtModule} from "./art/art.module";
import { PaintingListComponent } from './components/painting-list/painting-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PaintingListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
