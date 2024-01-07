import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import von Router
import { GameListService } from '../firebase-services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  constructor(private router: Router, private GameService: GameListService) { }

  async newGame() {
    // start Game
    let game = new Game();
    if (game.toJSON) {
      let gameId = await this.GameService.addNewGame(game.toJSON());
      this.router.navigateByUrl('/game/' + gameId);
    }
  }
}
