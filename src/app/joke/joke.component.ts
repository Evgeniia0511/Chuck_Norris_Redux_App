import { Component, Input, OnInit } from '@angular/core';
import { AddToFavourites, RemoveFromFavourites } from '../store/actions';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../store/reducer';
import { IJoke } from '../interfaces/joke.interface';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {
  @Input() joke: IJoke = null;
  @Input() tab = 'facts';
  public inFavourites = false;

  constructor(private ngRedux: NgRedux<InitialState>) {
  }

  ngOnInit(): void {
    this.ngRedux
      .select<Array<IJoke>>('favourites')
      .subscribe((items: Array<IJoke>) => {
        this.inFavourites = !!items.find(el => el.id === this.joke.id);
      });
  }

  public addToFavourites(joke: IJoke) {
    this.ngRedux.dispatch(AddToFavourites(joke));
    this.inFavourites = true;
  }

  public removeFromFavourites(joke: IJoke) {
    this.ngRedux.dispatch(RemoveFromFavourites(joke));
    this.inFavourites = false;
  }
}
