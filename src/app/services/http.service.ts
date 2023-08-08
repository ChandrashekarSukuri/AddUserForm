import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}
  getUsers(): Observable<any> {
    return this.httpClient.get('../../assets/users.json');
  }
  getProducts(): Observable<any> {
    return this.httpClient.get('../../assets/shopping.json');
  }
  getComments(id: number): Observable<any> {
    return this.httpClient.get(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }
}
