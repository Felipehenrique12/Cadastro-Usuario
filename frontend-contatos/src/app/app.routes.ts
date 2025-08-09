import { Routes } from '@angular/router';
import { CadastroContatoComponent } from './components/cadastro-contato/cadastro-contato';
import { ContatoListaComponent }  from './components/lista-contatos/lista-contatos';

export const routes: Routes = [
  {
    path: 'cadastro', component: CadastroContatoComponent,
  },
  {
    path: 'lista-contatos', component: ContatoListaComponent},

  {
    path: '',
    redirectTo: 'lista-contatos',
    pathMatch: 'full'
  }
];
