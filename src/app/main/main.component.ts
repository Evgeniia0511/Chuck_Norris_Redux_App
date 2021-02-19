import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgRedux } from '@angular-redux/store';
import { ICategory } from '../interfaces/category.interface'
import { IJoke } from '../interfaces/joke.interface'
import { InitialState } from '../store/reducer';
import { LoadItems } from '../store/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public categories: ICategory[] = [];
  public recentJokes: IJoke[] = [];
  public isAllCategoriesSelected = false;

  constructor(
    private apiService: ApiService,
    private ngRedux: NgRedux<InitialState>
  ) { }

  ngOnInit(): void {
    this.apiService.getCategories().then(res => {
      this.categories = res.map((el: string) => {
        return {
          value: el,
          checked: false
        };
      });
    });
  }

  public selectAll(selectedAll: boolean) {
    this.isAllCategoriesSelected = selectedAll;
    this.categories.forEach(c => c.checked = selectedAll);
    if (selectedAll) {
      this.recentJokes = [];
      const promises: any = [];
      this.categories.forEach(category => {
        const request = this.apiService.getJokesByCategory(category.value).then(res => {
          this.recentJokes.push(res);
        })
        promises.push(request);
      })
      Promise.all(promises).finally(() => {
        this.ngRedux.dispatch(LoadItems(this.recentJokes));
      });
    } else {
      this.recentJokes = [];
      this.categories.forEach(category => {
        category.checked = false;
      });
    }
  }

  public updateSelectedCategories(category: ICategory, checked: boolean) {
    this.isAllCategoriesSelected = this.categories.every(c => c.checked === true);

    this.categories.forEach(function(obj) {
      if (obj.value === category.value) {
        obj.checked = checked;
      }
    });

    if (checked) {
      this.apiService.getJokesByCategory(category.value).then(res => {
        this.recentJokes.push(res);
      });
    } else {
      this.recentJokes = this.recentJokes.filter(el => el.categories[0] !== category.value);
    }
  }
}
