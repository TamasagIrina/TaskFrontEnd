import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyTasksComponent } from './components/pages/my-tasks/my-tasks.component';
import { SearchComponent } from './components/pages/search/search.component';
import { NewTaskComponent } from './components/pages/new-task/new-task.component';

export const routes: Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'my-tasks',component: MyTasksComponent},
    {path: 'search',component: SearchComponent},
    {path: 'new-task',component: NewTaskComponent},

];
