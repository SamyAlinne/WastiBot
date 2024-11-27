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
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api';
  private userName: string = '';
  private currentMovie: Movie | null = null;
  private movieContext: string | null = null;
  private badWords: string[] = [];

  constructor(private http: HttpClient) {
    this.loadBadWords();
  }

  // Cargar las malas palabras desde el archivo JSON
  private loadBadWords() {
    this.http
      .get<{ badWords: string[] }>('/assets/bad-words.json')
      .subscribe((data) => {
        this.badWords = data.badWords;
      });
  }

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

  setMovieContext(context: string) {
    this.movieContext = context;
  }

  extractName(message: string): string {
    const commonWords = [ 'me','llamo', 'soy','mi','nombre','es','hola','saludos','holi','holiwis','holis','buenas','wenas','¡hola!','¡holis!','eres','wasti', ];
    const cleanMessage = message.replace(/[.,\/#¡!¿?$%\^&\*;:{}=\-_`~()0-9]/g,'');
    // Verificar si el mensaje está vacío
    if (!cleanMessage) {
      return 'Vacio';
    }
    const words = cleanMessage.toLowerCase().split(/\s+/);
    const potentialName = words.find(
      (word) => !commonWords.includes(word) && word.length > 1
    );

    if (potentialName && this.badWords.includes(potentialName.toLowerCase())) {
      return 'WastiAmigo'; // Si es una mala palabra, se asigna el nombre WastiAmigo
    }
    // Si no se encuentra un nombre válido
    if (!potentialName) {
      return 'Vacio';
    }

    return potentialName
      ? potentialName.charAt(0).toUpperCase() + potentialName.slice(1)
      : '';
  }

  sendMessage(message: string, isFirstMessage: boolean): Observable<any> {
    if (isFirstMessage) {
      const extractedName = this.extractName(message);
      this.setUserName(extractedName);
      // Respuesta personalizada si el nombre es una mala palabra
      if (extractedName === 'WastiAmigo') {
        return of({
          message: `Siento mucho que te llames así :c, pero lamentablemente mi Wasti programación no me permite ser malo, así que te llamaré WastiAmigo ;D. <br> <br> ¡Hola <b>WastiAmigo!</b> Encantado de conocerte. ¿Qué película navideña te gustaría descubrir hoy?`,
        });
      }
      if (extractedName === 'Vacio') {
        return of({
          message: `Lamento que no tengas nombre :c, pero por eso estoy aquí, para ayudarte :D. Ahora serás... ¡WastiAmigo! <br> <br> ¡Hola <b>WastiAmigo!</b>  Encantado de conocerte. ¿Qué película navideña te gustaría descubrir hoy?`,
        });
      }

      // Respuesta estándar si el nombre es válido
      return of({
        message: `¡Hola <b>${extractedName}</b>! Encantado de conocerte. ¿Quieres que te ayude a descubrir tu próxima película navideña favorita?`,
      });
    }

    return this.http
      .post<{ message: string; movie?: Movie; movieContext?: string }>(
        `${this.apiUrl}/chat`,
        { message }
      )
      .pipe(
        map((response) => {
          if (response.movie) {
            this.setCurrentMovie(response.movie);
          }
          if (response.movieContext) {
            this.setMovieContext(response.movieContext);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Error en la comunicación con el servidor:', error);
          return of({
            message:
              'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
          });
        })
      );
  }

  getTopMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovieDetails(title: string): Observable<Movie | null> {
    return this.getTopMovies().pipe(
      map(
        (movies) =>
          movies.find((m) => m.titulo.toLowerCase() === title.toLowerCase()) ||
          null
      )
    );
  }

  getPersonalizedMovieMessage(movie: Movie, infoType: string): string {
    const userName = this.getUserName();
    switch (infoType) {
      case 'año':
        return ``;
      case 'director':
        return ``;
      case 'calificación':
        return ``;
      case 'género':
        return ``;
      case 'trama':
        return ``;
      default:
        return ``;
    }
  }

  detectInfoType(message: string): string {
    const cleanMessage = message
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g, '')
      .replace(/[¿¡]/g, '');
    const lowerMessage = cleanMessage.toLowerCase();
    const words = lowerMessage.split(/\s+/);

    const infoTypes = {
      año: [],
      director: [],
      calificación: [],
      género: [],
      trama: [],
    };

    for (const [type, keywords] of Object.entries(infoTypes)) {
      if (keywords.some((keyword) => words.includes(keyword))) {
        return type;
      }
    }

    return 'general';
  }  
}
