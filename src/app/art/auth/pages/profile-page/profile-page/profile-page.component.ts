import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{


  constructor(private authService: AuthService,     private readonly dom: DomSanitizer
  ) {}
  // @ts-ignore
  avatar: File;
  newAvatar!: string;
  userId: string | null = null;
  username: string | null = null;
  newUsername!: string;
  preferencias: string | null = null;
  newPreferencias!: string;
  editMode: boolean = false;
  email: string | null = null;
  isLoggedIn: boolean = this.authService.isLogged();
  storedData = sessionStorage.getItem('session');
  hayAvatar!:string;
  avatarImage!: SafeResourceUrl;



  ngOnInit() {
    console.log("Avatar: ")
    console.log(this.avatar)
    console.log("NewAvatar: ")
    console.log(this.newAvatar)


    this.getUser();
    if(this.storedData!==null){
      this.getStorageData(this.storedData);
      // Obtener la URL del avatar al inicializar el componente
      console.log("prueba "+ this.userId);
      // Necesito aqui hacer el get del avatar

      this.authService.getAvatarUrl(this.userId!).subscribe({
        next: (hayAvatar)=>{
          this.hayAvatar=hayAvatar;
          console.log("muestro si hay avatar")
          console.log(hayAvatar);
          this.downloadImage(hayAvatar);


        },
        error: (error) => {
          console.error('Error al obtener el username:', error);
        },
        // Puedes incluir complete si es necesario
        complete: () => {
          console.log('La suscripción ha sido completada.');
        }
      })



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

  async guardarCambios(){
    if(this.newUsername===""){
      alert('No puedes dejar el campo de username vacío')
      return;
    }
    console.log("Avatar: ")
    console.log(this.avatar)
    console.log("NewAvatar: ")
    this.newAvatar = this.newAvatar.substring(this.newAvatar.lastIndexOf("\\")+1);
    console.log(this.newAvatar)
    let data = await this.authService.updateAvatarUrl(this.newAvatar, this.avatar)
    console.log("lo que da el data.path")
    console.log(data.data?.path);
    if(data.error){
      alert("Error updating avatar");
    }
    this.authService.updateColumnAvatarUrl(this.userId!, this.newAvatar).subscribe({
      next: (success) => {
        if (success) {
          console.log('avatarName updated successfully.');
          this.editMode = false;
        } else {
          console.error('Failed to update avatar name.');
        }
      },
      error: (error) => {
        console.error('Error updating avatarName:', error);
      },
    });



    if(this.newUsername!==''){
      this.authService.updateUsername(this.userId!, this.newUsername).subscribe({
        next: (success) => {
          if (success) {
            console.log('username updated successfully.');
            this.editMode = false;
          } else {
            console.error('Failed to update username.');
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


  onFileSelected(event: any): void {
    // Obtener el archivo seleccionado
    const files: FileList | null = event.target.files;

    if (files && files.length > 0) {
      // En este ejemplo, solo asignamos el primer archivo seleccionado
      this.avatar = files[0];
      console.log(this.avatar); // Aquí puedes hacer lo que necesites con el archivo
    }
  }

  async downloadImage(path: string) {
    try {
      const { data } = await this.authService.downloadAvatar(path)
      if (data instanceof Blob) {
        this.avatarImage = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message)
      }
    }
  }

}
