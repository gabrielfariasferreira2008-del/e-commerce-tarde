import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authService = inject(AuthService); //!Teste em Produção
  private router = inject(Router);
  
  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
    return;
  }
}
