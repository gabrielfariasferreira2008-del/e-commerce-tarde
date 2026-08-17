import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CarrinhoService } from '../../../core/services/carrinho.service';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, MatCardModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {

//? ============ SIGNALS =============
  
    produtos = signal < { nome: string ; preco: number } []> ([]); //! API (INICIA VAZIO)
    
    carregando = signal(true); //! CONTROLE DE CARREGAMENTO
    
    produtoSelecionado = signal < string | null > (null); //! CONTINUA IGUAL
    
    erro = signal < string | null > (null);

//? ============ COMPUTED =============
    
    totalProdutos = computed(() => this.produtos().length); //! CONTINUA IGUAL
    
    valorTotal = computed( () => { 
      return this.produtos()
      .reduce((total, item) => total + item.preco,0)});  //! CONTINUA IGUAL

//? ============ CONSTRUCTOR =============

constructor(){
  
  //! Carregar a API
  this.carregarProdutos();
  
  //! effects continuam iguais
  effect(() => {
    console.log('Lista de Produtos Alterados: ', this.produtos());
  });
  effect(() => {
    console.log('Valor total atualizado: ', this.valorTotal());
  });
  effect(()=> {
    if (typeof document !== 'undefined') {
          document.title = `(${this.totalProdutos()}) Minha Loja`;
    }
  });
 }
//? ============ MÉTODO HTTP (API) Foi Modificado para (ProdutosService) =============

carregarProdutos(){
  
  this.carregando.set(true); //! Ativa Loading
  this.erro.set(null); //? limpa o erro anterior

  this.produtosService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtosService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao carregar os Produtos:, ', erro);
          this.erro.set('Erro ao carregar Produtos. Verifique sua conexão e tente novamente!');
          this.carregando.set(false);
        },
  });
}

//? ============ MÉTODOS EXISTENTES Ñ ALTERAR =============

  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      { nome:'Processador Intel Core i5 14550FS', preco: 2500 }
    ]);
  }
substituirProdutos (){
  this.produtos.set([
    { nome: 'Teclado', preco: 40 },
      { nome: 'Mouse', preco: 10 },
        { nome: 'Monitor', preco: 100 },
          { nome: 'Desktop', preco: 500 },
            { nome: 'Headset', preco: 25 },
  ]);
}
 
 adicionarAoCarrinho (produto: { nome:string; preco: number }){
  this.carrinhoService.adicionar(produto);
 }

//? ============ INJECT =============
private produtosService = inject(produtosService);
carrinhoService = inject(CarrinhoService);

quantidadeCarrinho = this.carrinhoService.quantidadeItens;
totalCarrinho = this.carrinhoService.totalItens;
}
