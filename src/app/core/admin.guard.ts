import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth.service";

export const adminGuard: CanActivateFn = () => {
    
    const router = inject(Router);
    const authService = inject(AuthService); 

    //! - 1) Verificar se o Usuários está logado
    if(!authService.usuarioLogado()){
        return router.createUrlTree(['/login']);
    }
    //! - 2) Verifica se o usuario atual (logado), se tem perfil adm
    if (!authService.admin()){
        return router.createUrlTree(['/acesso-negado'])
    }
    //! - 3) se o usuario estiver logado e for adm = ACESSO LOBERADO
    
    return true;
};