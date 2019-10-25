import { Injectable } from '@angular/core';
import { CardData } from './card/card-data';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  cards: CardData[];
  status: string;
  message: string;
  state: number;
  card1: CardData;
  card2: CardData;
  score: number = 0;
  numPairs: number = 2;

  constructor() {
    this.cards = [];
    this.message = 'Click Play to start';
    this.state = 0;
    this.card1 = null;
    this.card2 = null;
    this.state = 0;
    this.score = 0;
    this.initCards();
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

  // initGame() {
  //   console.log('START GAME');
  //   this.shuffleCards();
  //   this.state = 0;

  // }

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
    this.state = 1;
  }

  shuffleCards() {
    this.cards.forEach((card, index, array) => {
      const rnd = Math.floor(Math.random() * array.length);
      const swap = array[rnd];
      array[index] = swap;
      array[rnd] = card;
    });
  }

  makeMove(card: CardData) {
    if (this.state === 0) {
      console.log('We havent started yet!!!!');
    } else if (this.state === 1) {
      // We are expecting first card in a pair
      this.card1 = card;
      card.state = 1;
      console.log('Now select another card');
      this.state = 2;
    } else if (this.state === 2) {
      this.card2 = card;
      card.state = 1;
      if (this.card1.image === this.card2.image) {
        console.log('YAAAAY!!! A match!!!!, now select another first card');
        // Set the cards to mathed (state 2) set game status to 1 (awaiting first card)
        this.card1.state = 2;
        this.card2.state = 2;
        this.state = 1;
        this.score ++;

        if (this.score === this.numPairs) {
          this.gameComplete();
        }

      } else {
        console.log('Nope start again');
        this.card1.state = 0;
        this.card2.state = 0;
        this.state = 1;
      }
    }
    console.log();
  }

  gameComplete() {
    console.log('You mathed them all!!!!');
    this.state = 3;
  }

}
