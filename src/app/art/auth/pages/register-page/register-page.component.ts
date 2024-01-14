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
      confirmPassword: ['', Validators.required],
      rememberMe: [false],
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

      // Llama al método signUp del AuthService y suscríbete al observable resultante
      this.authService.signUp(email, password).subscribe(
        (response) => {
          // Manejar el éxito, por ejemplo, redirigir a otra página
          console.log('Registro exitoso', response);
          // Redirigir a la página deseada
        },
        (error) => {
          // Manejar el error, por ejemplo, mostrar un mensaje de error
          console.error('Error en el registro', error);
          // Mostrar un mensaje de error al usuario, si es necesario
        }
      );
    } else {
      console.log('Formulario no válido. Verifica los campos.');
    }
  }
}
