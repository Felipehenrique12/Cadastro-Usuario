import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contato {
  id?: number;
  nome: string;
  celular: string;
  telefone: string;
  favorito?: string;
  situacaoAtivo: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ContatoService {

  private apiUrl = 'http://localhost:8080/api/contatos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  cadastrarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  atualizar(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/inativar`, {});
  }

  favoritar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/favoritar`, {});
  }
}
