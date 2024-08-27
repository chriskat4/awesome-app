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

type registration = {
  email:string,
  name:string,
  password:string
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

  btnRegister(){
    let nameR:string = this.nameRegister;
    let emailR:string = this.emailRegister;
    let passwordR:string = this.passwordRegister;
    let tasks:string = '';

    const objRegister:registration = {name: nameR, email:emailR, password: passwordR, tasks: ''};
    
    this.MyApiService.postRegistration(objRegister).subscribe({
      next: (data: any) => {
        console.log(data);
        alert("user criado com sucesso!");
      },
      error: (error: any) => {
        console.error('Erro ao cadastrar USER:', error);
      }
    });
  }



  constructor(private MyApiService: MyapiService, private router: Router) { }
  login(){
    /* ngOnInit(): void { */
        this.MyApiService.getUser(this.emailLogin).subscribe({
          next: (data: users) => {
            this.Users = data;
            if(this.Users.password == this.passwordLogin){
              this.loggedIn = true;
              this.MyApiService.saveIdToNextPage(data.id);
              this.MyApiService.saveNameToNextPage(data.name);
              this.MyApiService.saveEmailToNextPage(data.email);
              this.MyApiService.savePasswordToNextPage(data.password);
              this.MyApiService.saveTaskToNextPage(data.tasks);
              this.router.navigate(['list']);
            }else{
              alert("Invalid Password!");
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
