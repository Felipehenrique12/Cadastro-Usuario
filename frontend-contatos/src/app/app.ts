import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelefoneFormatPipe } from './telefone-format.pipe';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TelefoneFormatPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-contatos');
}
