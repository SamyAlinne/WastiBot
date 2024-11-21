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

  extractName(message: string): string {
    // Lista de palabras comunes para ignorar
    const commonWords = ['me', 'llamo', 'soy', 'mi', 'nombre', 'es', 'hola', 'saludos', 'wasti', 'que', 'tal'];
    const words = message.toLowerCase().split(/\s+/);
    
    // Filtrar palabras comunes y seleccionar la primera palabra restante
    const potentialName = words.find(word => !commonWords.includes(word));
    
    // Capitalizar la primera letra del nombre
    return potentialName ? potentialName.charAt(0).toUpperCase() + potentialName.slice(1) : '';
  }

  sendMessage(message: string, isFirstMessage: boolean): Observable<any> {

    if (isFirstMessage) {
      const extractedName = this.extractName(message);
      this.setUserName(extractedName);
      return of({ message: `¡Encantado de conocerte, ${extractedName}! ¿En qué puedo ayudarte hoy con respecto a películas navideñas?` });
    }

    // Respuestas predeterminadas
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes')) {
      return of({ message: `¡Hola ${this.userName}! ¿En qué puedo ayudarte hoy?` });
    }
    /*if (lowerMessage.includes('mejor película') || lowerMessage.includes('película favorita')) {
      return this.http.post(`${this.apiUrl}/movies/chat`);
    }
    if (lowerMessage.includes('recomendar') || lowerMessage.includes('sugerir')) {
      return this.http.get(`${this.apiUrl}/movies/random`);
    }*/
    // Si no hay respuesta predeterminada, enviamos la consulta al backend
    return this.http.post(`${this.apiUrl}/chat`, { message });
  }

  getTopMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }
}
