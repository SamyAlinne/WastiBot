import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



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
  @ViewChild('backgroundMusic') backgroundMusic!: ElementRef<HTMLAudioElement>;
  title = 'WastiBot';

  ngOnInit() {
    this.initializeChat();
    this.loadTopMovies();
    const preloader = document.querySelector('#preloader');
    const animacionInicial = document.querySelector('#animacionInicial');
    const mainContent = document.querySelector('#main-content') as HTMLElement; // Convertimos explícitamente a HTMLElement

/*--------------------------------------------------------------
#                       ANIMACIÓN INICIAL
--------------------------------------------------------------*/
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

    this.initializeBackgroundMusic();
  }

/*--------------------------------------------------------------
#                     INICIALIZAR MENSAJES
--------------------------------------------------------------*/

  messages: { role: string, content: SafeHtml }[] = [];
  inputMessage = '';
  topMovies: any[] = [];
  userName = '';
  isFirstMessage = true;

  constructor(private chatService: ChatService, private sanitizer: DomSanitizer) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  initializeChat() {
    this.messages.push({ role: 'bot', content: '¡Hola! Me llamo <b>Wasti</b>. Tu confiable amigo para estas navidades. <br> ¿Cómo te llamas? c:' });
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
  
    // Mensaje del usuario
    this.messages.push({ role: 'user', content: this.sanitizer.bypassSecurityTrustHtml(this.inputMessage) });
  
    this.chatService.sendMessage(this.inputMessage, this.isFirstMessage).subscribe(
      (response) => {
        // Mensaje del bot con HTML sanitizado
        this.messages.push({ role: 'bot', content: this.sanitizer.bypassSecurityTrustHtml(response.message) });
  
        if (this.isFirstMessage) {
          this.isFirstMessage = false;
        }
  
        const currentMovie = this.chatService.getCurrentMovie();
        if (currentMovie) {
          const infoType = this.chatService.detectInfoType(this.inputMessage);
          if (infoType !== 'general') {
            const personalizedMessage = this.chatService.getPersonalizedMovieMessage(currentMovie, infoType);
            this.messages.push({ role: 'bot', content: this.sanitizer.bypassSecurityTrustHtml(personalizedMessage) });
          }
        }
  
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error al enviar mensaje:', error);
        this.messages.push({ role: 'bot', content: this.sanitizer.bypassSecurityTrustHtml('Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.') });
        this.scrollToBottom();
      }
    );
  
    this.inputMessage = '';
  }

/*--------------------------------------------------------------
#                      AUTO SCROLL
--------------------------------------------------------------*/

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.error('Error al hacer scroll:', err);
    }
  }

/*--------------------------------------------------------------
#                VENTANA DE NUEVA CONVERSACIÓN
--------------------------------------------------------------*/
  confirmNewConversation(event: Event): void {
    // Previene la acción por defecto del clic
    event.preventDefault();
  
    // Muestra el cuadro de confirmación
    const confirmationCard = document.querySelector('#confirmationCard') as HTMLElement;
    if (confirmationCard) {
      confirmationCard.style.display = 'block'; // Muestra la ventana
    }
  
    // Configura los botones
    const acceptButton = document.querySelector('#acceptButton') as HTMLButtonElement;
    const declineButton = document.querySelector('#declineButton') as HTMLButtonElement;
  
    // Configura las acciones para "Aceptar"
    acceptButton.onclick = () => {
      // Oculta la ventana de confirmación
      if (confirmationCard) {
        confirmationCard.style.display = 'none';
      }
  
      // Elimina la animación inicial
      const animacionInicial = document.querySelector('#animacionInicial');
      if (animacionInicial) {
        animacionInicial.remove();
      }
  
      // Recarga la página
      window.location.reload();
    };
  
    // Configura las acciones para "Cancelar"
    declineButton.onclick = () => {
      if (confirmationCard) {
        confirmationCard.style.display = 'none'; // Oculta la ventana
      }
    };
  }

/*--------------------------------------------------------------
#                MÚSICA DE FONDO
--------------------------------------------------------------*/
  initializeBackgroundMusic() {
    const audioElement = this.backgroundMusic.nativeElement;
    audioElement.volume = 0.1;
    audioElement.play().catch(err => console.error('Error al reproducir música:', err));
  }
}