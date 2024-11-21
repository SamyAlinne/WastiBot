import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  title = 'WastiBot';

  ngOnInit() {
    this.initializeChat();
    this.loadTopMovies();
    const preloader = document.querySelector('#preloader');
    const animacionInicial = document.querySelector('#animacionInicial');
    const mainContent = document.querySelector('#main-content') as HTMLElement; // Convertimos explícitamente a HTMLElement

    window.addEventListener('load', () => {
      if (preloader) {
        preloader.remove(); // Elimina el preloader una vez cargada la página
      }

      if (animacionInicial) {
        animacionInicial.classList.add('visible'); // Muestra la animación inicial

        // Oculta la animación inicial después de 6 segundos y muestra el contenido principal
        setTimeout(() => {
          animacionInicial.classList.add('hidden'); // Agrega una clase para transiciones
          setTimeout(() => {
            animacionInicial.remove(); // Elimina el elemento después de la animación
            if (mainContent) {
              mainContent.style.display = 'block'; // Muestra el contenido principal
            }
          }, 600); // Coincide con la duración de la transición
        }, 4000); // Duración de la animación inicial
      }
    });
  }

  
  messages: { role: string, content: string }[] = [];
  inputMessage = '';
  topMovies: any[] = [];
  userName = '';
  isFirstMessage = true;

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  initializeChat() {
    this.messages.push({ role: 'bot', content: '¡Hola! Soy WastiBot. ¿Cómo te llamas?' });
  }

  loadTopMovies() {
    this.chatService.getTopMovies().subscribe(
      (movies) => {
        this.topMovies = movies;
      },
      (error) => {
        console.error('Error al cargar las películas:', error);
      }
    );
  }

  sendMessage() {
    if (this.inputMessage.trim() === '') return;

    this.messages.push({ role: 'user', content: this.inputMessage });

    this.chatService.sendMessage(this.inputMessage, this.isFirstMessage).subscribe(
      (response) => {
        this.messages.push({ role: 'bot', content: response.message });
        if (this.isFirstMessage) {
          this.isFirstMessage = false;
        }
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error al enviar mensaje:', error);
        this.messages.push({ role: 'bot', content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' });
        this.scrollToBottom();
      }
    );

    this.inputMessage = '';
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.error('Error al hacer scroll:', err);
    }
  }
}