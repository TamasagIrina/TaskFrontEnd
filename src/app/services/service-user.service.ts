import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTOResponse } from '../interfaces/UserDTOResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/users';

  getUsers() {
    return this.http.get<UserDTOResponse[]>(this.apiUrl);
  }
}
