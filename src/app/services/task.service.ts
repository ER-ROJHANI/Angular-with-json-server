import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../modles/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:5000/tasks";

  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(task: any) {
    return this.http.post<Task>(this.apiUrl, task);
  }
  update(task: any){
    return this.http.put(`${this.apiUrl}/${task.id}`,task)
  }
}
