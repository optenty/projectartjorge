import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  public myForm: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })

  login() {
    if (this.myForm.valid) {
      const email = this.myForm.value.email;
      const password = this.myForm.value.password;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          this.router.navigate(['/']); // Redirige al home ("/")

          // Redirigir a la página deseada u otras acciones necesarias
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          // Mostrar un mensaje de error al usuario, si es necesario
        },
        // Puedes incluir complete si es necesario
        complete: () => {
          console.log('La suscripción ha sido completada.');
        }
      });

    } else {
      console.log('Formulario no válido. Verifica los campos.');
    }
  }
}
