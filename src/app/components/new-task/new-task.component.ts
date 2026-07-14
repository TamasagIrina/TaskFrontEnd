import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { TaskDTOResponse } from '../../interfaces/TaskDTOResponse';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceTasksService } from '../../services/service-tasks.service';
import { TaskCreateDTO } from '../../interfaces/TaskDTOCreate';
import { UserDTOResponse } from '../../interfaces/UserDTOResponse';
import { StatusTypeDTO } from '../../interfaces/StatusTypeDTO';
import { ServiceStatusTypeService } from '../../services/service-status-type.service';
import { ServiceUserService } from '../../services/service-user.service';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {

  private fb = inject(FormBuilder);

  private serviceTask = inject(ServiceTasksService);

  private serviceUser = inject(ServiceUserService);

  private serviceStatusType = inject(ServiceStatusTypeService);

  users = signal<UserDTOResponse[]>([]);
  statusTypes = signal<StatusTypeDTO[]>([]);

  isLoadingUsers = signal(false);
  errorUsers = signal<string | null>(null);

  isLoadingStatusTypes = signal(false);
  errorStatusTypes = signal<string | null>(null);

  taskForm = this.fb.nonNullable.group({
    taskName: ['', [Validators.required, Validators.maxLength(500)]],
    statusTypeId: ['', [Validators.required, Validators.maxLength(255)]],
    userId: [0, [Validators.required, Validators.min(1)]],
    dueDate: ['', Validators.required]
  });

  ngOnInit() {
    this.isLoadingUsers.set(true);
    this.errorUsers.set(null);
    this.serviceUser.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoadingUsers.set(false);
      },
      error: (err) => {
        this.errorUsers.set('Eroare la încărcarea utilizatorilor.');
        this.isLoadingUsers.set(false);
        console.error(err);
      }
    });

    this.isLoadingStatusTypes.set(true);
    this.errorStatusTypes.set(null);
    
    this.serviceStatusType.getStatusTypes().subscribe({
      next: (data) => {
        this.statusTypes.set(data);
        this.isLoadingStatusTypes.set(false);
      },
      error: (err) => {
        this.errorStatusTypes.set('Eroare la încărcarea statusurilor.');
        this.isLoadingStatusTypes.set(false);
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.getRawValue() as TaskCreateDTO;

    this.serviceTask.addTask(formValue).subscribe({
      next: () => {
        console.log('Task adăugat cu succes!');
      },
      error: (err) => {
        console.error('Eroare la salvare:', err);
      }
    });

  }



}
