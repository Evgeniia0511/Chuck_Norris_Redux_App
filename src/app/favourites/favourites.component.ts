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
  }

  ngOnInit(): void {
    this.ngRedux
      .select<Array<IJoke>>('favourites')
      .subscribe((items: Array<IJoke>) => {
        this.favourites = this.sort(items);
      });
  }

  private sort(items: any) {
    return items.sort(function(a, b) {
      if (a.value < b.value) { return -1; }
      if (a.value > b.value) { return 1; }
      return 0;
    });
  }
}
