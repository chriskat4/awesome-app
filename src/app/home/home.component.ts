import { Component, OnInit } from '@angular/core';
import { MyapiService } from '../services/myapi.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
type users = {
  id:number,
  email:string,
  name:string,
  password:string,
  tasks:string
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent /* implements OnInit */{
  emailLogin:string = '';
  passwordLogin:string = '';
  
  nameRegister:string = '';
  emailRegister:string = '';
  passwordRegister:string = '';
  loggedIn:boolean = false;
  Users: users = {id:0,email:'',name:'',password:'',tasks:''};


  printAll(){
    console.log(this.emailLogin,
                this.passwordLogin,
                this.nameRegister,
                this.emailRegister,
                this.passwordRegister
                );
  }

  constructor(private MyApiService: MyapiService, private router: Router) { }
  login(){
    /* ngOnInit(): void { */
        this.MyApiService.getUser(this.emailLogin).subscribe({
          next: (data: any) => {
            this.Users = data;
            if(this.Users.password == this.passwordLogin){
              this.loggedIn = true;
              this.router.navigate(['list']);
            }
          },
          error: (error: any) => {
            console.error('Erro ao obter USER:', error);
          }
        }
      );
    }
  /* } */
}
