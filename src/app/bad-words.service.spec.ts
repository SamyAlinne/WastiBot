import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadWordsService {

  constructor(private http: HttpClient) { }

  // Método para cargar malas palabras desde el archivo JSON
  loadBadWords(): Observable<any> {
    return this.http.get<any>('assets/bad-words.json');
  }
}