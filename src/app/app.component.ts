import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CountdownComponent } from './countdown component/countdown.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
