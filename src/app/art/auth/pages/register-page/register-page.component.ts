import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements  OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required],
      preferencias:['']
    },{
      validators: this.passwordMatchValidator,
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }

  register() {
    if (this.myForm.valid) {
      console.log('Formulario válido:', this.myForm.value);

      const email = this.myForm.value.email;
      const password = this.myForm.value.password;
      const username = this.myForm.value.username;
      const preferencias = this.myForm.value.preferencias;
      this.authService.signUp(email, password).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          console.log(username);
          this.authService.updateUsername(response.data.user.id, username).subscribe({
            next: () => {
              console.log('Obtención de username exitosa:');
            },
            error: (error) => {
              console.error('Error al obtener el username:', error);
            },
            complete: () => {
              console.log('La suscripción ha sido completada.');
            }
          });
          if(preferencias!==''){
            this.authService.updatePreferencias(response.data.user.id, preferencias).subscribe({
              next: () => {
                console.log('Obtención de preferencias exitosa:');
              },
              error: (error) => {
                console.error('Error al obtener las preferencias:', error);
              },
              complete: () => {
                console.log('La suscripción ha sido completada.');
              }
            });
          }

          // Redirigir a la página deseada u otras acciones necesarias
        },
        error: (error) => {
          console.error('Error en el registro', error);
          // Mostrar un mensaje de error al usuario, si es necesario
        },
        // Puedes incluir complete si es necesario
        complete: () => {
          console.log('La suscripción ha sido completada.');
          alert('Revisa el correo electrónico para confirmar el registro')
        }
      });



    } else {
      console.log('Formulario no válido. Verifica los campos.');
    }
  }
}
