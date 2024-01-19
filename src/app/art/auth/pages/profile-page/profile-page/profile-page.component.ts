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
  newUsername!: string;
  preferencias: string | null = null;
  newPreferencias!: string;
  editMode: boolean = false;
  email: string | null = null;
  isLoggedIn: boolean = this.authService.isLogged();
  storedData = sessionStorage.getItem('session');
  ngOnInit() {
    this.getUser();
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
      this.authService.getUsername(this.userId!).subscribe({
        next: (username) => {
          // Actualizar la variable avatarUrl si se obtiene una URL
          this.username = username;
        },
        error: (error) => {
          console.error('Error al obtener el username:', error);
        },
        // Puedes incluir complete si es necesario
        complete: () => {
          console.log('La suscripción ha sido completada.');
        }
      });
      this.authService.getPreferencias(this.userId!).subscribe({
        next: (preferencias) => {
          // Actualizar la variable avatarUrl si se obtiene una URL
          this.preferencias = preferencias;
        },
        error: (error) => {
          console.error('Error al obtener las preferencias:', error);
        },
        // Puedes incluir complete si es necesario
        complete: () => {
          console.log('La suscripción ha sido completada.');
        }
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
    //el usuarname no puede ser null
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
    if(this.newUsername!==''){
      this.authService.updateUsername(this.userId!, this.newUsername).subscribe({
        next: (success) => {
          if (success) {
            console.log('username updated successfully.');
            this.editMode = false;
          } else {
            console.error('Failed to update avatar URL.');
          }
        },
        error: (error) => {
          console.error('Error updating username:', error);
        },
      });
    }
    this.authService.updatePreferencias(this.userId!, this.newPreferencias).subscribe({
      next: (success) => {
        if (success) {
          console.log('preferences updated successfully.');
          this.editMode = false;
        } else {
          console.error('Failed to update avatar URL.');
        }
      },
      error: (error) => {
        console.error('Error updating username:', error);
      },
    });
    this.editMode = false;
    window.location.reload();
  }

  getUser(){
    const storedUser = sessionStorage.getItem('user');
    if(storedUser){
      const userInfo = JSON.parse(storedUser);
      console.log('username; '+userInfo.username);
      this.userId = userInfo.username;
      this.email = userInfo.email;
    }
  }


}
