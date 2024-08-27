import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

type registration = {
  email:string,
  name:string,
  password:string,
  tasks: string
}
type putService = {
  /* id:number,
  email:string,
  name:string,
  password:string, */
  tasks: string
}


@Injectable({
  providedIn: 'root'
})
export class MyapiService {
  apiUrl = `http://localhost:8080/User/Users/`;

  apiUrlpost = `http://localhost:8080/User/Users`;
  
  idLogged:number = 0;
  emailLogged:string = '';
  nameLogged:string = '';
  passwordLogged:string = '';
  taskLogged:string = '';


  constructor(private http: HttpClient) {  
  }
  saveIdToNextPage(idIntoData: number){
    this.idLogged = idIntoData;
    return null;
  }

  saveEmailToNextPage(emailIntoData: string){
    this.emailLogged = emailIntoData;
    return null;
  }
  
  saveNameToNextPage(nameIntoData: string){
    this.nameLogged = nameIntoData;
    return null;
  }

  savePasswordToNextPage(passwordIntoData: string){
    this.passwordLogged = passwordIntoData;
    return null;
  }

  saveTaskToNextPage(taskIntoData: string){
  this.taskLogged = taskIntoData;
  return null;
}
  putAfterAttArray(putService: putService): Observable<any> {
    return this.http.put(this.apiUrl.concat(this.idLogged.toString()), putService);
  }

  postRegistration(register: registration): Observable<any> {
    return this.http.post(this.apiUrlpost, register);
  }
  getUser(email: string): Observable<any> {
    return this.http.get(this.apiUrl.concat(email));
  }
}
