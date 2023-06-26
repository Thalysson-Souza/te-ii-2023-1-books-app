import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnimalInterface } from '../types/animal.interface';

@Injectable()
export class AnimalService {
  constructor(private httpClient: HttpClient) { }

  getAnimal(id: string): Observable<AnimalInterface> {
    return this.httpClient.get<AnimalInterface>(
      `${environment.apiUrl}/animais/${id}`
    )
  }

  getAnimais(): Observable<AnimalInterface[]> {
    return this.httpClient.get<AnimalInterface[]>(
      `${environment.apiUrl}/animais`
    );
  }

  updateAnimal(animal: AnimalInterface): Observable<AnimalInterface> {
    return this.httpClient.put<AnimalInterface>(
      `${environment.apiUrl}/animais/${animal.id}`,
      animal
    )
  }

  saveAnimal(animal: AnimalInterface): Observable<AnimalInterface> {
    return this.httpClient.post<AnimalInterface>(
      `${environment.apiUrl}/animais`,
      animal
    );
  }

  removeAnimal(animal: AnimalInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/animais/${animal.id}`
    );
  }
}
