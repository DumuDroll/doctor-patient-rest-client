import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

const baseUrl = 'http://localhost:8080/api/users/';
const loginUrl = 'http://localhost:8080/api/login/';

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
    console.log("params", params);
    return this.http.get<User[]>(`${baseUrl}filtered/`, {params: params});
  }

  public login(user: User){
    return this.http.post<User>(loginUrl, user);
  }

  public create(user: User) {
    return this.http.post<User>(baseUrl, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(`${baseUrl}`, user);
  }

  public deleteById(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${baseUrl}${id}`)
  }

}
