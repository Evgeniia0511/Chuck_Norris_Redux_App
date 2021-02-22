import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public indicatorSubject = new BehaviorSubject<boolean>(false);

  private headers = new HttpHeaders({
    'accept': 'application/json',
    'x-rapidapi-key': '53a61af534mshea943f753441ac9p1a9f6ejsnd6468530352c',
    'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  getCategories(): Promise<any> {
    this.indicatorSubject.next(true);
    return new Promise(resolve => {
      this.http.get('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories', {
        headers: this.headers
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.error(err);
      });
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.indicatorSubject.next(false);
    });
  }

  getJokesByCategory(category: string): Promise<any> {
    this.indicatorSubject.next(true);
    return new Promise(resolve => {
      this.http.get('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random', {
        headers: this.headers,
        params: { category: category }
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.error(err);
      });
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.indicatorSubject.next(false);
    });
  }

}
