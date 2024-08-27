import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {
  apiUrl = `http://localhost:8080/User/Users/`;


  constructor(private http: HttpClient) {  
  }
  getUser(email: string): Observable<any> {
    return this.http.get(this.apiUrl.concat(email));
  }
}
