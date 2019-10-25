import { Injectable, EventEmitter, Output } from '@angular/core';
import { CardData } from './card/card-data';
import {GameState} from './game.game-state'


@Injectable({
  providedIn: 'root'
})
export class GameService {

  public static readonly STATE_CHANGE:string = 'STATE_CHANGE';

  cards: CardData[];
  status: string;
  message: string;
  state: string;
  card1: CardData;
  card2: CardData;
  score: number = 0;
  numPairs: number = 4;

  @Output() stateChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.cards = [];
    this.message = 'Click Play to start';
    this.card1 = null;
    this.card2 = null;
    this.score = 0;
    this.initCards();
    this.setState(GameState.READY_TO_START);
  }

  initCards() {
    this.cards.length = 0;

    for (let i = 0; i < this.numPairs; i++) {
      for (let p = 0; p < 2; p++) {
        const card = new CardData();
        card.image = i + 1;
        card.state = 0;
        this.cards.push(card);
      }
    }
  }

  private setState(state: string) {
    this.state = state;
    this.stateChange.emit(state);
  }

  revealAll() {
    this.cards.forEach((card) => {
      card.state = 1;
    });
  }

  hideAll() {
    this.cards.forEach((card) => {
      card.state = 0;
    });
  }

  // shuffle and show all the cards
  startGame() {
    this.shuffleCards();
    this.revealAll();
    this.score = 0;
    this.setState(GameState.AWAITING_FIRST_MOVE);
  }

  shuffleCards() {
    this.cards.forEach((card, index, array) => {
      const rnd = Math.floor(Math.random() * array.length);
      const swap = array[rnd];
      array[index] = swap;
      array[rnd] = card;
    });
  }

  makeMove(card: CardData): number {
    if (this.state === GameState.READY_TO_START) {
      console.log('We havent started yet!!!!');
      return -1;
    } else if (this.state === GameState.AWAITING_FIRST_MOVE) {
      // We are expecting first card in a pair
      this.card1 = card;
      card.state = 1;
      console.log('Now select another card');
      this.setState(GameState.AWAITING_SECOND_MOVE);
      return -1;
    } else if (this.state === GameState.AWAITING_SECOND_MOVE) {
      this.card2 = card;
      card.state = 1;
      if (this.card1.image === this.card2.image) {
        console.log('YAAAAY!!! A match!!!!, now select another first card');
        // Set the cards to mathed (state 2) set game status to 1 (awaiting first card)
        this.card1.state = 2;
        this.card2.state = 2;
        this.setState(GameState.AWAITING_FIRST_MOVE);
        this.score ++;

        if (this.score === this.numPairs) {
          this.gameComplete();
        }

        return 1;

      } else {
        console.log('Nope start again');
        this.card1.state = 0;
        this.card2.state = 0;
        this.setState(GameState.AWAITING_FIRST_MOVE);
        return 0;
      }
    }
    console.log();
  }

  gameComplete() {
    console.log('You mathed them all!!!!');
    this.setState(GameState.COMPLETE);
  }

}
