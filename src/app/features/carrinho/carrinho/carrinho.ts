import { Component, inject} from '@angular/core';
import { ItemCarrinho } from '../../../core/models/itens.carrinho';

import { MatButtonModule } from '@angular/material/button';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

import { RouterLink } from '@angular/router';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})

export class Carrinho {
// A página do carrinho passa a consumir o estado global do carrinho.
carrinhoFacade = inject(CarrinhoFacade);
removerItem(indice: number) {
// Remove um item específico da lista.
this.carrinhoFacade.limparCarrinho();
}

  limparCarrinho() {{ 
// Limpa todos os itens do carrinho.
this.carrinhoFacade.limparCarrinho();
}};
}
