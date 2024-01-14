import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from "rxjs";
import {
  AuthChangeEvent,
  AuthTokenResponsePassword,
  createClient,
  Session,
  SupabaseClient,
  User
} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    this.supabase = createClient('https://qoqbovdljzwvtbaobeml.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcWJvdmRsanp3dnRiYW9iZW1sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTE4MzA0MCwiZXhwIjoyMDIwNzU5MDQwfQ.HyaPXAkt8YlNaPqWv-1wiIHAlaF6VERVZloF06k_0AY');

    // Verificar si ya hay un usuario autenticado al inicializar el servicio
    this.supabase.auth.onAuthStateChange((event: any, session: Session | null) => {
      const user = session?.user ?? null;
      this.updateUser(user);
    });
  }

  private updateUser(user: User | null) {
    this.userSubject.next(user);
  }

  signUp(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.supabase.auth
        .signUp({ email, password })
        .then((response) => {
          // Update: Using response.data.user instead of response.user
          const user = response.data.user;
          this.updateUser(user);

          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Otros métodos de autenticación

  signOut(): Observable<any> {
    return new Observable((observer) => {
      this.supabase.auth
        .signOut()
        .then(() => {
          this.updateUser(null);
          observer.next(null);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.supabase.auth
        .signInWithPassword({ email, password })
        .then((response: any) => {
          const session = response.data.session;
          if (session) {
            const user = response.user;
            this.updateUser(user);
            // this.saveTokenToLocalStorage(session.access_token);
            observer.next(response);
          } else {
            // No se encontró una sesión válida, considerar como un error de autenticación
            observer.error('Inicio de sesión fallido');
          }
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
          observer.complete();
        });
    });
  }


}


