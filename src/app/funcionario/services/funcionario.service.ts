import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuncionarioInterface } from '../types/funcionario.interface';

@Injectable()
export class FuncionarioService {
  constructor(private httpClient: HttpClient) { }

  getFuncionario(id: string): Observable<FuncionarioInterface> {
    return this.httpClient.get<FuncionarioInterface>(
      `${environment.apiUrl}/funcionarios/${id}`
    )
  }

  getFuncionarios(): Observable<FuncionarioInterface[]> {
    return this.httpClient.get<FuncionarioInterface[]>(
      `${environment.apiUrl}/funcionarios`
    );
  }

  updateFuncionario(funcionario: FuncionarioInterface): Observable<FuncionarioInterface> {
    return this.httpClient.put<FuncionarioInterface>(
      `${environment.apiUrl}/funcionarios/${funcionario.id}`,
      funcionario
    )
  }

  saveFuncionario(funcionario: FuncionarioInterface): Observable<FuncionarioInterface> {
    return this.httpClient.post<FuncionarioInterface>(
      `${environment.apiUrl}/funcionarios`,
      funcionario
    );
  }

  removeFuncionario(funcionario: FuncionarioInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/funcionarios/${funcionario.id}`
    );
  }

}
