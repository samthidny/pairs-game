import { Component } from '@angular/core';
import { GameService } from './game.service';
import { CardData } from './card/card-data';
import { GameState } from './game.game-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pairs-game';
  message: string = '';
  cards: CardData[];
  gameService: GameService;


  constructor(gameService: GameService) {
    this.cards = gameService.cards;
    this.gameService = gameService;
    this.gameService.stateChange.subscribe(() => {
      this.updateMessage();
    });
    this.message = gameService.message;
  }

  startGameClick() {
    console.log('start game');
    // if weve just finished a game, hide the cards for a second and then start
    if (this.gameService.state === GameState.COMPLETE) {
      this.gameService.hideAll();
      setTimeout(() => {
        this.gameService.startGame();
        //this.peekAtCards();
      }, 1000);
    } else {
      // First game
      this.gameService.startGame();
      //this.peekAtCards();
    }

  }

  

  makeMove(card: CardData) {
    console.log('App makeMove ' + card.image);
    const result = this.gameService.makeMove(card);
    if (result === 1) {
      this.flashMessage('WELL DONE!');
    }
  }

  // shows a message briefly and then return to game state message;
  flashMessage(message) {
    this.message = message;
    setTimeout(() => {
      this.updateMessage();
    }, 2000);
  }

  updateMessage() {
    console.log('APP updateMessage ' + this.gameService.state);
    switch (this.gameService.state) {
      case GameState.READY_TO_START: this.message = 'Click Start'; break;
      case GameState.AWAITING_FIRST_MOVE: this.message = 'Pick a card!'; break;
      case GameState.AWAITING_SECOND_MOVE: this.message = 'Try and match that card'; break;
      case GameState.COMPLETE: this.message = 'Well done you matched them all.  Click start to play again.'; break;
    }

    console.log('message updated to ' + this.message);
  }
}
