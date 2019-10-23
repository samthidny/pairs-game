import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardData } from './card-data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: CardData;
  @Output() cardClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  clickHandler() {
    console.log('clicked ' + this.card.image);
    if (this.card.state === 0) {
      this.cardClick.emit(this.card);
    }
  }

}
