import { Component } from '@angular/core';
import { GameService } from './game.service';
import { CardData } from './card/card-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pairs-game';

  cards: CardData[];
  gameService: GameService;
  uiDisabled: Boolean = false;

  constructor(gameService: GameService) {
    this.cards = gameService.cards;
    this.gameService = gameService;
  }

  startGameClick() {
    console.log('start game');
    // if weve just finished a game, hide the cards for a second and then start
    if (this.gameService.state === 3) {
      this.gameService.hideAll();
      setTimeout(() => {
        this.gameService.startGame();
        this.peekAtCards();
      }, 2000);
    } else {
      this.gameService.startGame();
      this.peekAtCards();
    }

  }

  peekAtCards() {
    setTimeout(() => {
      this.gameService.hideAll();
    }, 2000);
  }

  cardClicked(card: CardData) {
    if (this.uiDisabled) {
      console.log('NOT READY YET!!! UIDISABLED');
      return;
    }

    if (this.gameService.state === 2) {
      // Reveal card and then delay final decision
      card.state = 1;
      this.uiDisabled = true;
      setTimeout(() => {
        this.makeMove(card);
        this.uiDisabled = false;
      }, 500);
    } else {
      this.makeMove(card);
    }
  }

  makeMove(card: CardData) {
    console.log('App makeMove ' + card.image);
    this.gameService.makeMove(card);
  }
}
