import { Component } from '@angular/core';
import {IJoke} from "./interfaces/joke.interface";
import {NgRedux} from "@angular-redux/store";
import {InitialState} from "./store/reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'chuck-norris-redux-store';

  public favourites: Array<IJoke> = [];

  constructor(private ngRedux: NgRedux<InitialState>) {
    this.ngRedux
      .select<Array<IJoke>>('favourites')
      .subscribe((items: Array<IJoke>) => {
        this.favourites = items;
      });
  }
}
