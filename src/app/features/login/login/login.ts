import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  errologin = signal(false);

  formulario = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });

  entrar(){

    this.errologin.set(false);
    
    if(this.formulario.invalid){
      this.formulario.markAsTouched();
      return;
    }

    const email = this.formulario.value.email ?? '';
    const senha = this.formulario.value.senha ?? '';
    const loginRealizado = this.authService.login(email, senha);
  
    if(!loginRealizado){
      this.errologin.set(true);
      return;
    }

    if(this.authService.admin()){
      this.router.navigateByUrl('/admin');
      return;
    }

    this.router.navigateByUrl('/produtos');
  }
}
