import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfilePageComponent } from './pages/profile-page/profile-page/profile-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { FavPageComponent } from './pages/fav-page/fav-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    LogoutPageComponent,
    FavPageComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class AuthModule { }
