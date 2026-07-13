import { Component, inject, OnInit } from '@angular/core';
import { ServiceTasksService } from '../../services/service-tasks.service';
import { TaskDTOResponse } from '../../interfaces/TaskDTOResponse';

@Component({
  selector: 'app-my-tasks',
  imports: [],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css'
})
export class MyTasksComponent implements OnInit {

  tasks: TaskDTOResponse[] = [];

  private service = inject(ServiceTasksService);

  ngOnInit() {
    this.service.getTasks().subscribe((data: TaskDTOResponse[]) => {
      this.tasks = data;
      console.log('Tasks:', this.tasks);
    });
  }

}
