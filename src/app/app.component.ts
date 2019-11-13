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
  cards: CardData[];
  gameService: GameService;


  constructor(gameService: GameService) {
    this.cards = gameService.cards;
    this.gameService = gameService;

  }

  

  // makeMove(card: CardData) {
  //   console.log('App makeMove ' + card.image);
  //   const result = this.gameService.makeMove(card);
  //   if (result === 1) {
  //     this.flashMessage('WELL DONE!');
  //   }
  // }

  
}
