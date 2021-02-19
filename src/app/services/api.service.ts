import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({
    'accept': 'application/json',
    'x-rapidapi-key': '53a61af534mshea943f753441ac9p1a9f6ejsnd6468530352c',
    'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  getCategories(): Promise<any> {
    return new Promise(resolve => {
      this.http.get('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories', {
        headers: this.headers
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getJokesByCategory(category: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random', {
        headers: this.headers,
        params: { category: category }
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
