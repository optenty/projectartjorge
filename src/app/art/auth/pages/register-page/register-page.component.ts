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
      const email = this.myForm.value.email;
      const password = this.myForm.value.password;

      // this.authService.register(email, password).subscribe(response => {
      //   console.log(response);
      //   // Puedes redirigir o realizar acciones adicionales según tus necesidades.
      // });
    }
  }
}
