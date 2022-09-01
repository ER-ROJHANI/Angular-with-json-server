import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/modles/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText = '';
  sohwForm = false;
  editForm = false;

  myTask: Task = {
    label:'',
    completed: false
  };

  tasks: Task[] = [];
  resultTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
        .subscribe(tasks => {
          this.resultTasks = this.tasks = tasks;
        })
  }

  deleteTask(id: any){
    this.taskService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id )
    })
  }


  persistTask(){
    this.taskService.persist(this.myTask)
        .subscribe((task) => {
          this.tasks = [task, ...this.tasks];
          this.resetTask();
          this.sohwForm = false;
        } )
  }

  resetTask(){
    this.myTask = {
      label: '',
      completed: false
    }
  }

  
  editTask(task: any){
    this.myTask = task
    this.editForm = true;
    this.sohwForm = true;
  } 

  updateTask(){
    this.taskService.update(this.myTask)
        .subscribe(task => {
          this.resetTask();
          this.editForm = false;
        })
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
