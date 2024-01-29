import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, from, map, mergeMap, Observable, of} from "rxjs";
import {createClient, Session, SupabaseClient, User} from "@supabase/supabase-js";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  // user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Verificar si ya hay un usuario autenticado al inicializar el servicio
    this.supabase.auth.onAuthStateChange((event: any, session: Session | null) => {
      const user = session?.user ?? null;
      this.updateUser(user);
    });
  }

  get UserId(){
    let user = sessionStorage.getItem('user');
    const userObj = JSON.parse(user!);
    return userObj.id
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
            const user = response.data.user;
            console.log("responseLogin: "+JSON.stringify(response));
            this.updateUser(user);
            // this.saveTokenToLocalStorage(session.access_token);
            sessionStorage.setItem('session', JSON.stringify(session));
            sessionStorage.setItem('user', JSON.stringify(user));
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

  getAvatarUrl(userId: string): Observable<string | null> {
    return from(
      this.supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single()
    ).pipe(
      map((response) => response?.data?.avatar_url ?? null),
      catchError((error) => {
        console.error('Error al obtener el avatar:', error);
        return of(null);
      })
    );
  }

  getUsername(userId: string): Observable<string | null> {
    return from(
      this.supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single()
    ).pipe(
      map((response) => response?.data?.username ?? null),
      catchError((error) => {
        console.error('Error al obtener el avatar:', error);
        return of(null);
      })
    );
  }
  updateUsername(userId: string, newUsername: string): Observable<boolean> {
    return from(
      this.supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', userId)
    ).pipe(
      map((response) => {
        // Check if the update was successful
        console.log("usuario:" +newUsername);
        return response.data !== null;
      }),
      catchError((error) => {
        console.error('Error updating avatar URL:', error);
        return of(false);
      })
    );
  }
  getPreferencias(userId: string): Observable<string | null> {
    return from(
      this.supabase
        .from('profiles')
        .select('preferencias')
        .eq('id', userId)
        .single()
    ).pipe(
      map((response) => response?.data?.preferencias ?? null),
      catchError((error) => {
        console.error('Error al obtener el avatar:', error);
        return of(null);
      })
    );
  }
  updatePreferencias(userId: string, newPreferencias: string): Observable<boolean> {
    return from(
      this.supabase
        .from('profiles')
        .update({ preferencias: newPreferencias })
        .eq('id', userId)
    ).pipe(
      map((response) => {
        // Check if the update was successful
        console.log("preferencias:" +newPreferencias);
        return response.data !== null;
      }),
      catchError((error) => {
        console.error('Error updating avatar URL:', error);
        return of(false);
      })
    );
  }
  updateAvatarUrl(userId: string, newAvatarUrl: string): Observable<boolean> {
    return from(
      this.supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', userId)
    ).pipe(
      map((response) => {
        // Check if the update was successful
        return response.data !== null;
      }),
      catchError((error) => {
        console.error('Error updating avatar URL:', error);
        return of(false);
      })
    );
  }

  isLogged(){
    // aqui  pondre el id del usuario
    return sessionStorage.getItem('session') !== null;
  }

  addFavoritos(userId: string, idArtwork: number): Observable<boolean> {
    return from(
      this.supabase
        .from('profiles')
        .select('artwork_fav')
        .eq('id', userId)
        .single()
    ).pipe(
      mergeMap((response) => {
        if (response.data) {
          //Arreplegaro tot, separar per , en el split i ja puc observar si está o no
          let currentArtworkFav = response.data.artwork_fav;
          let updatedArtworkFav;
          if(currentArtworkFav!==null){
            let artworkFavSplit = currentArtworkFav.split('::');
            // Compruebo si ya existe y si existe no hago nada
            console.log("el array de ids de la base de datos despues del split es: ");
            console.log(artworkFavSplit);
            console.log(idArtwork)
            if (artworkFavSplit.includes(idArtwork.toString())) {
              return of(true);
            }
             updatedArtworkFav = currentArtworkFav+idArtwork+"::";
          }else{
             updatedArtworkFav = idArtwork+"::";
          }

          // Hago el update de la tabla
          return from(
            this.supabase
              .from('profiles')
              .update({ artwork_fav: updatedArtworkFav })
              .eq('id', userId)
          ).pipe(
            map((updateResponse) => {
              // Check if the update was successful
              return updateResponse.data !== null;
            })
          );
        } else {
          // Si no hay response.data hacemos return false
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error updating artwork_fav:', error);
        return of(false);
      })
    )
    }

  getFavoritos(userId:string): Observable<string[]> {
    return from(
      this.supabase
        .from('profiles')
        .select('artwork_fav')
        .eq('id', userId)
        .single()
    ).pipe(
      map((response) => {
        // Check if the update was successful
        if (response.data) {
          return response.data.artwork_fav.split("::"); // Retorna el array obtenido de la base de datos
        } else {
          return []; // Si no hay datos, retorna un array vacío
        }
      }),
      catchError((error) => {
        console.error('Error obteniendo favoritos:', error);
        return of([]); // Manejar el error y retornar un array vacío
      })
    );
  }
  removeFavoritos(userId: string, idArtwork: number): Observable<boolean> {
    return from(
      this.supabase
        .from('profiles')
        .select('artwork_fav')
        .eq('id', userId)
        .single()
    ).pipe(
      mergeMap((response) => {
        if (response.data) {
          // Obtener el array de IDs de la base de datos
          let currentArtworkFav = response.data.artwork_fav;



          if (currentArtworkFav !== null) {
            let artworkFavSplitted: string[] = currentArtworkFav.split("::");

            // Verificar si el ID a eliminar está presente en el array
            const indexToRemove = artworkFavSplitted.indexOf(idArtwork.toString());

            if (indexToRemove !== -1) {
              // Eliminar el ID del array
              artworkFavSplitted.splice(indexToRemove, 1);

              // Convertir el array de nuevo a cadena
              let updatedArtworkFav = artworkFavSplitted.join('::');

              // Hacer el update de la tabla
              return from(
                this.supabase
                  .from('profiles')
                  .update({ artwork_fav: updatedArtworkFav })
                  .eq('id', userId)
              ).pipe(
                map((updateResponse) => {
                  // Verificar si la actualización fue exitosa
                  return updateResponse.data !== null;
                })
              );
            } else {
              // Si el ID no está presente, no hacemos nada
              return of(true);
            }
          } else {
            // Si artwork_fav es null, no hay IDs que eliminar
            return of(true);
          }


        } else {
          // Si no hay response.data, devolvemos false
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error deleting artwork_fav:', error);
        return of(false);
      })
    );
  }


}


