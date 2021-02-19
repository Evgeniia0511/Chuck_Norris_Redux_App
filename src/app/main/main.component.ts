import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ICategory } from '../interfaces/category.interface'
import { IJoke } from '../interfaces/joke.interface'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public categories: ICategory[] = [];
  public recentJokes: any[] = [];
  public isAllCategoriesSelected = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCategories().then(res => {
      this.categories = res.map((el: string) => {
        return {
          value: el,
          checked: false
        }
      });
    });
  }

  selectAll(selectedAll: boolean) {
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
      Promise.all(promises).finally(() => { });
    } else {
      this.recentJokes = [];
    }
  }

  public updateSelectedCategories(category: ICategory) {
    this.isAllCategoriesSelected = this.categories.every(c => c.checked === true);

    if (category.checked) {
      this.apiService.getJokesByCategory(category.value).then(res => {
        this.recentJokes.push(res);
      })
    } else {
      this.recentJokes = this.recentJokes.filter(el => el.categories[0] !== category.value);
    }
  }
}
