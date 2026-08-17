import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import  {Header} from './shared/layout/header/header';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
