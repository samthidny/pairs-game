import { Component, OnInit, Input } from '@angular/core';
import { CardData } from '../card/card-data';
import { GameService } from '../game.service';
import { GameState } from '../game.game-state';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() cards: CardData[];
  gameService: GameService;
  uiDisabled: boolean = false;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.gameService.stateChange.subscribe((state: string) => {
      console.log('TABLE HEARD GAME STATE CHANGED ' + state);
      if (state === GameState.AWAITING_FIRST_MOVE) {
        if(this.gameService.gos === 0) {
          // Very first go, so peek cards
          console.log('table peekcards');
          this.peekAtCards();
        } else {
          console.log('table, await first card');
        }
        
      }
    });
  }

  ngOnInit() {
  }

  cardClicked(card: CardData) {
    console.log('clicked!!');
    if (this.uiDisabled) {
      console.log('NOT READY YET!!! UIDISABLED');
      return;
    }

    if (this.gameService.state === GameState.AWAITING_SECOND_MOVE) {
      // Reveal card for a few seconds and then show win or lose
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
    const result = this.gameService.makeMove(card);
    if (result === 1) {
      //this.flashMessage('WELL DONE!');
    }
  }

  peekAtCards() {
    this.revealAll();
    setTimeout(() => {
      this.hideAll();
    }, 2000);
  }

  revealAll() {
    this.cards.forEach((card) => {
      card.state = 1;
    });
  }

  hideAll() {
    console.log('gameservice hiding all the cards so that we are ready to play');
    this.cards.forEach((card) => {
      card.state = 0;
    });
  }

}
