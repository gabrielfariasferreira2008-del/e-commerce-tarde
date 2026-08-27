import { Component, signal } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-favoritos',
  imports: [FormsModule,],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  //Página para favorita Item(Produto).
    favoritos = Inject (Favoritos)
}
