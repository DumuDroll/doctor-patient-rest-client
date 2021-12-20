import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../models/user";

const baseUrl = 'http://localhost:8080/api/users/';
const loginUrl = 'http://localhost:8080/api/login/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public username?: string;
  public password?: string;

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

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
    return this.http.get<User[]>(`${baseUrl}filtered/`, {params: params});
  }

  public login(username: string, password: string){
    return this.http.get(loginUrl, { headers: { authorization:
          this.createBasicAuthToken(username, password) } }).pipe(map(() => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username);
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
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
