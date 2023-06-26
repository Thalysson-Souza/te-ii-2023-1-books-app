import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtendimentoInterface } from '../types/atendimento.interface';

@Injectable()
export class AtendimentoService {
  constructor(private httpClient: HttpClient) { }

  getAtendimento(id: string): Observable<AtendimentoInterface> {
    return this.httpClient.get<AtendimentoInterface>(
      `${environment.apiUrl}/atendimentos/${id}`
    )
  }

  getAtendimentos(): Observable<AtendimentoInterface[]> {
    return this.httpClient.get<AtendimentoInterface[]>(
      `${environment.apiUrl}/atendimentos`
    );
  }

  updateAtendimento(atendimento: AtendimentoInterface): Observable<AtendimentoInterface> {
    return this.httpClient.put<AtendimentoInterface>(
      `${environment.apiUrl}/atendimentos/${atendimento.id}`,
      atendimento
    )
  }

  saveAtendimento(atendimento: AtendimentoInterface): Observable<AtendimentoInterface> {
    return this.httpClient.post<AtendimentoInterface>(
      `${environment.apiUrl}/atendimentos`,
      atendimento
    );
  }

  removeAtendimento(atendimento: AtendimentoInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/atendimentos/${atendimento.id}`
    );
  }
}
