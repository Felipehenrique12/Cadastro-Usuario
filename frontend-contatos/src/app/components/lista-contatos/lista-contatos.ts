import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ContatoService, Contato } from '../../services/contato.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TelefoneFormatPipe } from '../../telefone-format.pipe';




@Component({
  selector: 'app-contato-lista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TelefoneFormatPipe
  ],
  templateUrl: './lista-contatos.html',
  styleUrls: ['./lista-contatos.css']
})
export class ContatoListaComponent implements OnInit {
  contatos: Contato[] = [];
  searchControl = new FormControl('');

  constructor(
    private contatoService: ContatoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.carregarContatos();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(term => this.buscarContatos(term));
  }

  carregarContatos() {
    this.contatoService.listar().subscribe({
      next: (data) => {
        this.contatos = data;
      },
      error: () => {
        this.toastr.error('Erro ao carregar contatos', 'Erro');
      }
    });
  }

  buscarContatos(term: string | null) {
    if (!term || term.trim() === '') {
      this.carregarContatos();
      return;
    }

    this.contatoService.listar().subscribe({
      next: (data) => {
        const termo = term.toLowerCase();
        this.contatos = data.filter(contato =>
          contato.nome.toLowerCase().includes(termo) ||
          contato.celular.includes(term)
        );
      },
      error: () => {
        this.toastr.error('Erro ao buscar contatos', 'Erro');
      }
    });
  }

  inativar(id: number) {
    if (!confirm('Tem certeza que deseja inativar este contato?')) {
      return;
    }



    this.contatoService.inativar(id).subscribe({
      next: () => {
        this.toastr.success('Contato inativado com sucesso', 'Sucesso');
        this.carregarContatos();
      },
      error: () => {
        this.toastr.error('Erro ao inativar contato', 'Erro');
      }
    });

  }

  alternarFavorito(contato: Contato) {
    this.contatoService.favoritar(contato.id!).subscribe({
      next: () => {
        contato.favorito = contato.favorito === 'S' ? 'N' : 'S';
        const msg = contato.favorito === 'S' ? 'Contato favoritado' : 'Contato desfavoritado';
        this.toastr.success(msg, 'Favorito');
      },
      error: () => {
        this.toastr.error('Erro ao atualizar favorito', 'Erro');
      }
    });
  }

}
