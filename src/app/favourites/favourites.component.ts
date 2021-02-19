import { Component, OnInit } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IJoke} from '../interfaces/joke.interface';
import { InitialState } from '../store/reducer';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  public favourites: Array<IJoke> = [];

  constructor(private ngRedux: NgRedux<InitialState>) {
    this.ngRedux
      .select<Array<IJoke>>('favourites')
      .subscribe((items: Array<IJoke>) => {
        this.favourites = items;
      });
  }

  ngOnInit(): void {
  }

}
