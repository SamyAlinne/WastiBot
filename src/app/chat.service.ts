import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Movie {
  id: number;
  titulo: string;
  anio: number;
  director: string;
  calificacion: number;
  subgenero: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api';
  private userName: string = '';
  private currentMovie: Movie | null = null;

  constructor(private http: HttpClient) { }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }

  getCurrentMovie(): Movie | null {
    return this.currentMovie;
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }

  extractName(message: string): string {
    const commonWords = ['me', 'llamo', 'soy', 'mi', 'nombre', 'es', 'hola', 'saludos'];
    const cleanMessage = message.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, "");
    const words = cleanMessage.toLowerCase().split(/\s+/);
    const potentialName = words.find(word => !commonWords.includes(word) && word.length > 1);
    return potentialName ? potentialName.charAt(0).toUpperCase() + potentialName.slice(1) : '';
  }

  sendMessage(message: string, isFirstMessage: boolean): Observable<any> {
    if (isFirstMessage) {
      const extractedName = this.extractName(message);
      this.setUserName(extractedName);
      return of({ message: `¡Encantado de conocerte, ${extractedName}! ¿En qué puedo ayudarte hoy con respecto a películas navideñas?` });
    }

    return this.http.post<{ message: string, movie?: Movie }>(`${this.apiUrl}/chat`, { message }).pipe(
      map(response => {
        if (response.movie) {
          this.setCurrentMovie(response.movie);
        }
        return response;
      }),
      catchError(error => {
        console.error('Error en la comunicación con el servidor:', error);
        return of({ message: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' });
      })
    );
  }

  getTopMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovieDetails(title: string): Observable<Movie | null> {
    return this.getTopMovies().pipe(
      map(movies => movies.find(m => m.titulo.toLowerCase() === title.toLowerCase()) || null)
    );
  }

  getPersonalizedMovieMessage(movie: Movie, infoType: string): string {
    switch (infoType.toLowerCase()) {
      case 'año':
        return `¡Viajemos en el tiempo! "${movie.titulo}" se estrenó en ${movie.anio}. ¿Te imaginas cómo era el mundo en ese entonces?`;
      case 'director':
        return `¡Aplausos para el genio detrás de la cámara! "${movie.titulo}" fue dirigida por el talentoso ${movie.director}. ¿Has visto otras películas suyas?`;
      case 'calificación':
        return `¡Momento de críticos! "${movie.titulo}" tiene una calificación de ${movie.calificacion} sobre 10. ¿Estás de acuerdo con esta puntuación?`;
      case 'género':
        return `¡Prepárate para sumergirte en un mundo mágico! "${movie.titulo}" pertenece al subgénero de ${movie.subgenero}. ¿Es tu tipo favorito de película navideña?`;
      case 'trama':
        return `¡Agárrate a tu asiento! La trama de "${movie.titulo}" es: ${movie.descripcion} ¿No te dan ganas de verla ahora mismo?`;
      default:
        return `"${movie.titulo}" es una película fascinante. ¿Qué más te gustaría saber sobre ella?`;
    }
  }

  detectInfoType(message: string): string {
    const lowerMessage = message.toLowerCase();
    const cleanMessage = lowerMessage.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, "");
    if (cleanMessage.includes('año') || cleanMessage.includes('cuando') || cleanMessage.includes('estreno')) {
      return 'año';
    } else if (cleanMessage.includes('director') || cleanMessage.includes('dirigió') || cleanMessage.includes('dirigio')) {
      return 'director';
    } else if (cleanMessage.includes('calificación') || cleanMessage.includes('calificacion') || cleanMessage.includes('puntaje') || cleanMessage.includes('rating')) {
      return 'calificación';
    } else if (cleanMessage.includes('género') || cleanMessage.includes('genero') || cleanMessage.includes('tipo de película') || cleanMessage.includes('tipo de pelicula')) {
      return 'género';
    } else if (cleanMessage.includes('trama') || cleanMessage.includes('de qué trata') || cleanMessage.includes('de que trata') || cleanMessage.includes('argumento') || cleanMessage.includes('historia')) {
      return 'trama';
    }
    return 'general';
  }
}