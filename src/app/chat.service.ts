import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api';
  private userName: string = '';

  constructor(private http: HttpClient) { }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }

  sendMessage(message: string): Observable<any> {
    // Respuestas predeterminadas
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes')) {
      return of({ message: `¡Hola ${this.userName}! ¿En qué puedo ayudarte hoy?` });
    }
    if (lowerMessage.includes('mejor película') || lowerMessage.includes('película favorita')) {
      return this.http.get(`${this.apiUrl}/movies/best`);
    }
    if (lowerMessage.includes('recomendar') || lowerMessage.includes('sugerir')) {
      return this.http.get(`${this.apiUrl}/movies/random`);
    }
    // Si no hay respuesta predeterminada, enviamos la consulta al backend
    return this.http.post(`${this.apiUrl}/chat`, { message, userName: this.userName });
  }

  getTopMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }
}
