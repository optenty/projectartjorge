import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./art/pages/home-page/home-page.component";
import {PaintingPageComponent} from "./art/pages/painting-page/painting-page.component";
import {PaintingDetailsComponent} from "./art/components/painting/painting-details/painting-details.component";
import {SignupPageComponent} from "./art/pages/login/signup-page/signup-page.component";
import {SigninPageComponent} from "./art/pages/login/signin-page/signin-page.component";
import {ErrorPageComponent} from "./art/pages/error-page/error-page.component";

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
    path: 'artworks/details/:id',
    component:PaintingDetailsComponent
  },
  {
    path: 'sign-up',
    component:SignupPageComponent
  },
  {
    path: 'sign-in',
    component:SigninPageComponent
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
