import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtendimentoInterface } from '../types/atendimento.interface';

@Injectable()
export class AtendimentoService {
  constructor(private httpClient: HttpClient) { }

  getAtendimento(id: number): Observable<AtendimentoInterface> {
    return this.httpClient.get<AtendimentoInterface>(
      `${environment.apiUrl}/atendimento/${id}`
    )
  }

  getAtendimentos(): Observable<AtendimentoInterface[]> {
    return this.httpClient.get<AtendimentoInterface[]>(
      `${environment.apiUrl}/atendimento`
    );
  }

  updateAtendimento(atendimento: AtendimentoInterface): Observable<AtendimentoInterface> {
    return this.httpClient.put<AtendimentoInterface>(
      `${environment.apiUrl}/atendimento/${atendimento.id}`,
      atendimento
    )
  }

  saveAtendimento(atendimento: AtendimentoInterface): Observable<AtendimentoInterface> {
    return this.httpClient.post<AtendimentoInterface>(
      `${environment.apiUrl}/atendimento`,
      atendimento
    );
  }

  removeAtendimento(atendimento: AtendimentoInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/atendimento/${atendimento.id}`
    );
  }
}
