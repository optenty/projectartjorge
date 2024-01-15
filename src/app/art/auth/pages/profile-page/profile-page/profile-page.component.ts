import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{


  constructor(private authService: AuthService) {}
  avatarUrl: string | null = null;
  newAvatarUrl!: string;
  userId: string = 'elIdDelUsuario';
  // aqui  pondre el id del usuario
  storedData = localStorage.getItem('session');

  ngOnInit() {
    this.getLocalStorageData(this.storedData);
    // Obtener la URL del avatar al inicializar el componente
    this.authService.getAvatarUrl(this.userId).subscribe({
      next: (url) => {
        // Actualizar la variable avatarUrl si se obtiene una URL
        this.avatarUrl = url;
      },
      error: (error) => {
        console.error('Error al obtener la URL del avatar:', error);
      },
      // Puedes incluir complete si es necesario
      complete: () => {
        console.log('La suscripción ha sido completada.');
      }
    });

    this.authService.updateAvatarUrl(this.userId, this.newAvatarUrl).subscribe({
      next: (success) => {
        if (success) {
          console.log('Avatar URL updated successfully.');
        } else {
          console.error('Failed to update avatar URL.');
        }
      },
      error: (error) => {
        console.error('Error updating avatar URL:', error);
      },
      complete: () => {
        console.log('Update avatar URL subscription completed.');
      },
    });





    //

  }


  getLocalStorageData(storedData : string | null){
    if (storedData) {
      // Parse the JSON string to an object
      const storedSession = JSON.parse(storedData);

      // Access the user_id property
      const userId = storedSession.user_id;

      // Now you can use userId as needed
      console.log('User ID from localStorage:', userId);
    } else {
      console.error('No data found in localStorage');
    }
  }

  protected readonly localStorage = localStorage;
}
