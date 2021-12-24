import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

const USERS_URL = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public findAllFiltered(name?: string, page?: number, size?: number): Observable<User[]> {
    let params = new HttpParams();
    if (typeof name !== 'undefined') {
      params = params.append('name', name);
    }
    if (typeof page !== 'undefined') {
      params = params.append('page', page);
    }
    if (typeof size !== 'undefined') {
      params = params.append('size', size);
    }
    return this.http.get<User[]>(`${USERS_URL}filtered/`, {params: params});
  }

  public create(user: User) {
    return this.http.post<User>(USERS_URL, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(USERS_URL, user);
  }

  public deleteById(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${USERS_URL}${id}`)
  }
}
