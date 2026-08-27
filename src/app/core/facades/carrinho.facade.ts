
import { Injectable, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import { ItemCarrinho } from '../models/itens.carrinho';




@Injectable({
providedIn: 'root',
})
export class CarrinhoFacade {
// A facade passa a ser a camada usada pelos componentes,
// evitando que as telas dependam diretamente dos detalhes internos do service.
private carrinhoFacade = inject(CarrinhoService);
// Sinais expostos para leitura pelas telas.
itens = this.carrinhoFacade.itens;
quantidade = this.carrinhoFacade.quantidadeItens;
total = this.carrinhoFacade.totalIntens;
carrinhoVazio = this.carrinhoFacade.carrinhoVazio;
// Ação de alto nível para adicionar produto ao carrinho.
adicionarProduto(produto: ItemCarrinho) {
this.carrinhoFacade.adicionar(produto);
}
// Ação de alto nível para limpar o carrinho.
limparCarrinho() {
this.carrinhoFacade.limpar();
}
}