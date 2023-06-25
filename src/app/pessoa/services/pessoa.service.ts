import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaInterface } from '../types/pessoa.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class PessoaService {
  constructor(private httpClient: HttpClient) { }

  getPessoa(id: number): Observable<PessoaInterface> {
    return this.httpClient.get<PessoaInterface>(
      `${environment.apiUrl}/pessoa/${id}`
    )
  }

  getPessoas(): Observable<PessoaInterface[]> {
    return this.httpClient.get<PessoaInterface[]>(
      `${environment.apiUrl}/pessoa`
    );
  }

  updatePessoa(pessoa: PessoaInterface): Observable<PessoaInterface> {
    return this.httpClient.put<PessoaInterface>(
      `${environment.apiUrl}/pessoa/${pessoa.id}`,
      pessoa
    )
  }

  savePessoa(pessoa: PessoaInterface): Observable<PessoaInterface> {
    return this.httpClient.post<PessoaInterface>(
      `${environment.apiUrl}/pessoa`,
      pessoa
    );
  }

  removePessoa(pessoa: PessoaInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/pessoa/${pessoa.id}`
    );
  }
}
