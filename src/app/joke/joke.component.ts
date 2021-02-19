import { Component, Input, OnInit } from '@angular/core';
import { AddToFavourites, RemoveFromFavourites } from '../store/actions';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../store/reducer';
import { IJoke } from '../interfaces/joke.interface'

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {
  @Input() joke: any = [];
  public inFavourites = false;

  constructor(private ngRedux: NgRedux<InitialState>) { }

  ngOnInit(): void {
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
