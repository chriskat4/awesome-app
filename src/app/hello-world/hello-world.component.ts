import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MyapiService } from '../services/myapi.service';

type putService = {
  /* id:number,
  email:string,
  name:string,
  password:string, */
  tasks: string
} 
type task = {
  task: string;
  id: number;
}

@Component({
  selector: 'helloworld',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.scss'
})
export class HelloWorldComponent implements OnInit{
  
  
  ///~~join in put~~, and grow all task buttorn with this;


  constructor(private MyApiService: MyapiService) { }

  tasks: Array<task> = [];
  taskLikeStringIntoArray: Array<string> = [];
  id:number = 0;
  idTask:number = 0;
  newTask:string = '';
  delTask:number = 0;
  taskLikeString:string = '';
  

  public ngOnInit(): void {
    this.populingTasks();
  }

  populingTasks(){
    if(!this.MyApiService.taskLogged){return}
    let populing: string = this.MyApiService.taskLogged;

    const populingArray: Array<string> = populing.split('|');
    console.log(populing);
    let populingId:number = 0;
    populingArray.forEach((populingEach)=>{
      populingId = Math.floor(Math.random() * 10000);
      this.tasks.push({task: populingEach, id: populingId});
    })

    return this.tasks;
  };
  
  newTaskAdd(){
    let newTaskvar: string = this.newTask;
    /* this.id = this.tasks.length; */
    this.id = Math.floor(Math.random() * 10000);
    this.tasks.push({task: newTaskvar, id: this.id});
    this.id = 0;


    console.log(this.tasks);

    this.putTasksToApi();

    return this.tasks;
  } 
  
  deleteTask(){
    for(let i:number = 0; i < this.tasks.length; i++){
      if(this.delTask == this.tasks[i]["id"]){
        this.tasks.splice(i, 1);
       /*  alert("Task Removida!"); */
      }
    }
    
    this.putTasksToApi();

    return this.tasks;
  }

  deleteAllTasks(){
    let len = this.tasks.length;
    this.tasks.splice(0, len);
    
    this.putTasksToApi();

    return this.tasks;
  }



  putTasksToApi(){
    
    this.tasks.forEach((task)=>{
      this.taskLikeStringIntoArray.push(task.task);
    });
    
    this.taskLikeString = this.taskLikeStringIntoArray.join("|");
    this.taskLikeStringIntoArray = [];
    console.log(this.taskLikeString);
    const objPut: putService = {tasks: this.taskLikeString};
    this.MyApiService.putAfterAttArray(objPut).subscribe({
      next: (data: any) =>{ 
          console.log(data);
      },
      error: (error: any) => {
        console.error('Erro ao obter USER:', error);
      }
    }
    );
  }
}

