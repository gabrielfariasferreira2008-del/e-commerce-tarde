import { Component, inject, signal } from '@angular/core';  
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-favoritos',
  imports: [FormsModule,],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  //Página para favorita Item(Produto).
  adicionarFavoritos = signal<Favoritos[]>([]);
  //?=========== Remover =============
  removerFavoritos= signal<Favoritos[]>([]);//Remover Produto de Favoritos
  
}

