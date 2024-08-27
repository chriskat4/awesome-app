import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from '../home/home.component';


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
export class HelloWorldComponent extends HomeComponent implements OnInit{


  tasks: Array<task> = [];
  id:number = 0;
  idTask:number = 0;
  newTask:string = '';
  delTask:number = 0;

  public ngOnInit(): void {
    this.populingTasks();
  }

  populingTasks(){
    let populing: string = this.Users.tasks;
    console.log(populing);
    let populingId: number = Math.floor(Math.random() * 10000);
    this.tasks.push({task: populing, id: populingId});

    return this.tasks;
  };
  
  newTaskAdd(){
    let newTaskvar: string = this.newTask;
    /* this.id = this.tasks.length; */
    this.id = Math.floor(Math.random() * 10000);
    this.tasks.push({task: newTaskvar, id: this.id});
    this.id = 0;


    console.log(this.tasks);
    return this.tasks;
  } 
  
  deleteTask(){
    for(let i:number = 0; i < this.tasks.length; i++){
      if(this.delTask == this.tasks[i]["id"]){
        this.tasks.splice(i, 1);
       /*  alert("Task Removida!"); */
      }
    }
    return this.tasks;
  }

  deleteAllTasks(){
    let len = this.tasks.length;
    this.tasks.splice(0, len);
    return this.tasks;
  }

}
