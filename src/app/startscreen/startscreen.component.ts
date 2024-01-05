import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import von Router

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  constructor(private router: Router) { }

  newGame() {
    // start Game
    this.router.navigateByUrl('/game');
  }
}
