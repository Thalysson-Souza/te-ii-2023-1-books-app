import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeInterface } from '../types/home.interface';

@Injectable()
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  getInfoCount(): Observable<HomeInterface> {
    return this.httpClient.get<HomeInterface>(
      `${environment.apiUrl}/dashboard`
    );
  }

}
