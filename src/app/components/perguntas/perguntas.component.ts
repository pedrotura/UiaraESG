import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-perguntas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './perguntas.component.html',
  styleUrl: './perguntas.component.css'
})
export class PerguntasComponent {

}
