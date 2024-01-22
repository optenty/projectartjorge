import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./art/pages/home-page/home-page.component";
import {PaintingPageComponent} from "./art/pages/painting-page/painting-page.component";
import {ErrorPageComponent} from "./art/pages/error-page/error-page.component";
import {PaintingDetailsPageComponent} from "./art/pages/painting-details-page/painting-details-page.component";
import {FavPageComponent} from "./art/pages/fav-page/fav-page.component";

const routes: Routes = [
  {
    path: '',
    component:HomePageComponent
  },
  {
    path: 'artworks',
    component:PaintingPageComponent
  },
  {
    path: 'artwork-fav',
    component:FavPageComponent
  },
  {
    path: 'artworks/details',
    component:PaintingDetailsPageComponent
  },
  {
    path: 'auth',
    //guards
    loadChildren: ()=> import('./art/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'dashboard',
    //guards
    loadChildren: ()=> import('./art/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path:'error',
    component:ErrorPageComponent
  },
  {
    path: '**',
    redirectTo:"error"
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
