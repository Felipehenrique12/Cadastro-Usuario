import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContatoService } from '../../services/contato.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-cadastro-contato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    RouterModule
  ],
  templateUrl: './cadastro-contato.html',
  styleUrls: ['./cadastro-contato.css']
})
export class CadastroContatoComponent {
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private toastr: ToastrService,
    // private router : Router,
    private routerModule : RouterModule
  ) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      celular: ['', Validators.required],
      favorito: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {

    this.contatoService.cadastrarContato(this.contatoForm.value).subscribe({
      next: () => {
        this.toastr.success('Contato cadastrado com sucesso!', 'Sucesso');
        this.contatoForm.reset();
        // this.routerModule.(['/lista-contatos']);
      },
      error: (err: any) => {
        this.handleError(err);
      }
    });
  }

  private handleError(err: any) {
    const erros = err.error;

    if (err.status === 400 && typeof erros === 'object') {
      // Exibe cada erro como pop-up e marca no formulário
      Object.entries(erros).forEach(([campo, mensagem]) => {
        if (this.contatoForm.controls[campo]) {
          this.contatoForm.controls[campo].setErrors({ backend: mensagem });
        }
        this.toastr.error(String(mensagem), `Erro no campo "${campo}"`);
      });
    } else if (typeof erros === 'string') {
      this.toastr.error(erros, 'Erro');
    } else {
      this.toastr.error('Erro inesperado ao cadastrar o contato.', 'Erro');
    }
  }
}
