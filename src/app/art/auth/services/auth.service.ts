import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }



  // register(email: string, password: string): Observable<any> {
  //   return from(this.supabaseService.getSupabase().auth.signUp({ email, password }));
  // }
  //
}
