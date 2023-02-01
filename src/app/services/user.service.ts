import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user.model';

export interface ReqresResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<ReqresResponse>(`${this._url}/users?per_page=6`)
      .pipe(map((resp) => resp.data));
  }
}
