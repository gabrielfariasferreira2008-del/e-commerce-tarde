import { Component } from '@angular/core';
import { inject } from '@angular/core';

import { signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { ValidationErrors } from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.service';

import { RouterLink } from "@angular/router";
import { Router } from 'express';

import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/itens.carrinho';



  Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

type PedidoFinalizado = {
codigo: number;
cliente: string;
quantidadeItens: number;
total: number;
itens: ItemCarrinho[];
};

export class Checkout {
 pedidoFinalizado = signal<PedidoFinalizado | null>(null);
  carrinhoService = inject(CarrinhoService);
  
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

finalizar () {
  this.compraFinalizada.set(false);
  this.pedidoFinalizado.set(null);

  if(this.carrinhoService.carrinhoVazio()){
    console.log('Não é possivel finalizar a comprar com o carrinho vazio!');
    return;
  }
  if (this.formulario.invalid){
    console.log('Formulário Invalido!');
    this.formulario.markAllAsTouched();
    return;
  }
  
  const dados = this.formulario.value;
  const itens = this.carrinhoService.itens();
  const total = this.carrinhoService.totalIntens();

const pedido: PedidoFinalizado = {
codigo: Date.now(),
cliente: dados.nome ?? '',
quantidadeItens: itens.length,
total,
itens,
};  
  console.log('Compra finalizada com sucesso!');
  console.log('Dados do Formulario:', dados);
  console.log('Dados do Pedido:',pedido);

  this.carrinhoService.limpar();
  this.formulario.reset();
  this.compraFinalizada.set(true);

}

compraFinalizada = signal(false)


}

function nomeSemNumeros (control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;
  
  if (/\d/.test(valor)){
    return {numeroInvalido: true};
  }
  return null;
 }