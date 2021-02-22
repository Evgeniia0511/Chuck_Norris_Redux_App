import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgRedux } from '@angular-redux/store';
import { ICategory } from '../interfaces/category.interface';
import { IJoke } from '../interfaces/joke.interface';
import { InitialState } from '../store/reducer';
import { LoadItems, SelectCategory } from '../store/actions';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public categories: ICategory[] = [];
  public recentJokes: IJoke[] = [];
  public isAllCategoriesSelected = false;
  public isLoading = false;

  constructor(
    private apiService: ApiService,
    private ngRedux: NgRedux<InitialState>
  ) {
  }

  ngOnInit(): void {
    this.apiService.indicatorSubject.pipe(distinctUntilChanged()).subscribe(data => {
     this.isLoading = data;
    });
    this.ngRedux
      .select<Array<IJoke>>('jokes')
      .subscribe((items: Array<IJoke>) => {
        this.recentJokes = items;
      });
    this.ngRedux
      .select<Array<ICategory>>('categories')
      .subscribe((items: Array<ICategory>) => {
        this.categories = items;
      });

    if (!this.categories.length) {
      this.apiService.getCategories().then(res => {
        this.categories = res.map((el: string) => {
          return {
            value: el,
            checked: false
          };
        });
      });
    }
  }

  public selectAll(selectedAll: boolean) {
    this.isAllCategoriesSelected = selectedAll;
    if (selectedAll) {
      const promises: any = [];
      this.categories.forEach(category => {
        if (!category.checked) {
          const request = this.apiService.getJokesByCategory(category.value).then(res => {
            this.recentJokes.push(res);
          });
          promises.push(request);
        }
      });
      Promise.all(promises).finally(() => {
        this.ngRedux.dispatch(LoadItems(this.recentJokes));
      });
    } else {
      this.recentJokes = [];
      this.ngRedux.dispatch(LoadItems(this.recentJokes));
    }
    this.categories.forEach(category => {
      category.checked = selectedAll;
    });
    this.ngRedux.dispatch(SelectCategory(this.categories));
  }

  public updateSelectedCategories(category: ICategory, checked: boolean) {
    this.categories.forEach(function(obj) {
      if (obj.value === category.value) {
        obj.checked = checked;
      }
    });

    if (checked) {
      this.apiService.getJokesByCategory(category.value).then(res => {
        this.recentJokes.push(res);
        this.ngRedux.dispatch(LoadItems(this.recentJokes));
      });
    } else {
      this.recentJokes = this.recentJokes.filter(el => el.categories[0] !== category.value);
      this.ngRedux.dispatch(LoadItems(this.recentJokes));
    }

    this.ngRedux.dispatch(SelectCategory(this.categories));
  }

  public isAllSelected() {
    return this.categories.every(c => c.checked === true);
  }
}
