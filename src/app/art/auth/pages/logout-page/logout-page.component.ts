import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.css'
})
export class LogoutPageComponent {

  constructor(private authService: AuthService, private router: Router) {



  }

  confirmLogout(){
    sessionStorage.removeItem('session');
    this.authService.signOut();
    this.router.navigate(['/']);
  }

}
