import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskDTOResponse } from '../interfaces/TaskDTOResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceTasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tasks';

  getTasks() {
    return this.http.get<TaskDTOResponse[]>(this.apiUrl);
  }

  addTask(task: any) {
    return this.http.post(this.apiUrl, task);
  }
}
