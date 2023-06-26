import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaInterface } from '../types/pessoa.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class PessoaService {
  constructor(private httpClient: HttpClient) { }

  getPessoa(id: string): Observable<PessoaInterface> {
    return this.httpClient.get<PessoaInterface>(
      `${environment.apiUrl}/pessoas/${id}`
    )
  }

  getPessoas(): Observable<PessoaInterface[]> {
    return this.httpClient.get<PessoaInterface[]>(
      `${environment.apiUrl}/pessoas`
    );
  }

  updatePessoa(pessoa: PessoaInterface): Observable<PessoaInterface> {
    return this.httpClient.put<PessoaInterface>(
      `${environment.apiUrl}/pessoas/${pessoa.id}`,
      pessoa
    )
  }

  savePessoa(pessoa: PessoaInterface): Observable<PessoaInterface> {
    return this.httpClient.post<PessoaInterface>(
      `${environment.apiUrl}/pessoas`,
      pessoa
    );
  }

  removePessoa(pessoa: PessoaInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/pessoas/${pessoa.id}`
    );
  }
}
