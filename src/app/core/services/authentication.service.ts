import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

const USERS_URL = 'http://localhost:8080/api/users/';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public username?: string;
  public password?: string;

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      password
    }, httpOptions);
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

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  public create(user: User) {
    return this.http.post<User>(USERS_URL, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(`${USERS_URL}`, user);
  }

  public deleteById(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${USERS_URL}${id}`)
  }

  registerSuccessfulLogin(username: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    return user !== null;
  }

}
