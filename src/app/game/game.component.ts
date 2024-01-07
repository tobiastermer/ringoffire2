import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from '../../models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameListService } from '../firebase-services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit, OnDestroy {

  game: Game;

  private gameSubscription?: () => void;

  constructor(public dialog: MatDialog, private GameService: GameListService, private route: ActivatedRoute) {
    this.game = new Game();
    console.log(this.game);

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        this.gameSubscription = await this.GameService.callGame(params['id']);
        this.GameService.currentGame.subscribe(game => {
          if (game) {
            this.game = game;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) {
      this.gameSubscription(); // Beendet das Abonnement, wenn es definiert ist
    }
  }

  async newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  async takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      if (!this.game.currentPlayer) {
        this.game.currentPlayer = 0;
      }
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500);

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame(): void {
    if (this.game.toJSON) {
      this.GameService.updateGame(this.game.toJSON());
    }
  }

}