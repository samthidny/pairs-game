import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { GameState } from '../game.game-state';
import { stat } from 'fs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  gameService: GameService;
  message: string;
  gameState: string;
  showStart: boolean;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.gameService.stateChange.subscribe((state: string) => {
      this.stateChangeHandler(state);
    });
    this.message = gameService.message;

    // initialise state
    this.stateChangeHandler(gameService.state);

  }

  ngOnInit() {
  }

  startGameClick() {
    console.log('start game');
    // if weve just finished a game, hide the cards for a second and then start
    if (this.gameService.state === GameState.COMPLETE) {
      this.gameService.hideAll();
      setTimeout(() => {
        this.gameService.startGame();
      }, 1000);
    } else {
      // First game
      this.gameService.startGame();
    }

  }

  // // shows a message briefly and then return to game state message;
  // flashMessage(message) {
  //   this.message = message;
  //   setTimeout(() => {
  //     this.updateMessage();
  //   }, 2000);
  // }

  stateChangeHandler(state: string) {
    this.updateControl(state);
    this.updateMessage(state);
  }

  updateControl(state: string) {
    this.showStart = (state === GameState.READY_TO_START || state === GameState.COMPLETE);
  }

  updateMessage(state: string) {
    console.log('APP updateMessage ' + this.gameService.state);
    switch (state) {
      case GameState.READY_TO_START: this.message = 'Click Start'; break;
      case GameState.AWAITING_FIRST_MOVE: this.message = 'Pick a card!'; break;
      case GameState.AWAITING_SECOND_MOVE: this.message = 'Try and match that card'; break;
      case GameState.COMPLETE: this.message = 'Well done you matched them all.  Click start to play again.'; break;
    }

    console.log('message updated to ' + this.message);
  }

}
