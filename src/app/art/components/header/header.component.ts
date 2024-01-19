import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'art-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = this.authService.isLogged();
  constructor(private authService: AuthService){

  }
}
