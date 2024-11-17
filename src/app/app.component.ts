import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WastiBot';

  ngOnInit() {
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
}
