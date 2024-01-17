import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{


  constructor(private authService: AuthService) {}
  avatarUrl: string | null = null;
  newAvatarUrl!: string;
  userId: string | null = null;
  username: string | null = null;
  editMode: boolean = false;

  // aqui  pondre el id del usuario
  storedData = sessionStorage.getItem('session');

  ngOnInit() {
    if(this.storedData!==null){
      this.getStorageData(this.storedData);
      // Obtener la URL del avatar al inicializar el componente
      console.log("prueba "+ this.userId);
      this.authService.getAvatarUrl(this.userId!).subscribe({
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
      this.authService.updateAvatarUrl(this.userId!, this.newAvatarUrl).subscribe({
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
    }
  }


  getStorageData(storedData : string | null){
    if (storedData) {
      // Parse the JSON string to an object
      const storedSession = JSON.parse(storedData);

      // Access the user_id property
      this.userId = storedSession.user.id;


      // Now you can use userId as needed
      console.log('vemos esto: ' + JSON.stringify(storedSession));
      console.log('User ID from sessionStrorage:', storedSession.user.id);
      //cambiar esto

    } else {
      console.error('No data found in sessionStorage');
    }
  }
  enableEditMode() {
    this.editMode = true;
  }

  guardarCambios(){
    console.log(this.newAvatarUrl);
    this.authService.updateAvatarUrl(this.userId!, this.newAvatarUrl).subscribe({
      next: (success) => {
        if (success) {
          console.log('Avatar URL updated successfully.');
          this.editMode = false;
        } else {
          console.error('Failed to update avatar URL.');
        }
      },
      error: (error) => {
        console.error('Error updating avatar URL:', error);
      },
    });
  }

}
