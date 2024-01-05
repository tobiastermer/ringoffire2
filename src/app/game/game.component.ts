import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from '../../models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameListService } from '../firebase-services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string | undefined = undefined;
  game: Game;

  constructor(public dialog: MatDialog, private GameService: GameListService) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  async newGame() {
    this.game = new Game();
    console.log(this.game);
    if (this.game.toJSON) {
      let gameData = this.game.toJSON();
      if (gameData.id === undefined) {
        delete gameData.id;
      }
      await this.GameService.addGame(gameData);
    }
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      if (!this.game.currentPlayer) {
        this.game.currentPlayer = 0;
      }
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}