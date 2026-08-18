import { Injectable, Inject } from "@angular/core";
 import { AuthService } from "../services/auth.service";


 @AuthService(){
    


  sair (){
        this.authService.logout();
    }
     logout (){

        this.usuario.set (null);
        this.usuario.set(null);
     }
    obterToken(): string | null{
    return this.authService.obterToken();
    }

    obterPerfil(){
     return this.navigateRy.obterPerfill();

    }
 }


  