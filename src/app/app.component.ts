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

  constructor(gameService: GameService) {
    this.cards = gameService.cards;
    this.gameService = gameService;
  }

  startGameClick() {
    console.log('start game');
    this.gameService.startGame();
  }

  cardClicked(card:CardData) {
    this.makeMove(card);
  }

  makeMove(card: CardData) {
    console.log('App makeMove ' + card.image);
    this.gameService.makeMove(card);
  }
}
