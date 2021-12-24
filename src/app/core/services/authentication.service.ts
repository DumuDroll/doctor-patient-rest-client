import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {User} from "../models/user";

const AUTH_API = 'http://localhost:8080/api/auth/';

class LoginInfo {
  isLoggedIn = false;
  roles: string[] = [];
  showAdminBoard = false;
  username = "";
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private eventSource = new BehaviorSubject<LoginInfo>(new LoginInfo());
  eventSubject = this.eventSource.asObservable();
  public username?: string;
  public password?: string;

  constructor(private http: HttpClient,
             private tokenStorageService: TokenStorageService) {
  }

  firstLogin(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'setPassword', {
      username,
      password
    }, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password?: string): Observable<any> {
    return this.http.post<User>(AUTH_API + 'signup', {
      username,
      password
    }, httpOptions);
  }

  updateLoggedInInfo() {
    let loginInfo = new LoginInfo();
    loginInfo.isLoggedIn = !!this.tokenStorageService.getToken();
    if (loginInfo.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      loginInfo.roles = user.roles;

      loginInfo.showAdminBoard = loginInfo.roles.includes('ROLE_ADMIN');

      loginInfo.username = user.username;
      this.eventSource.next(loginInfo)
    }
  }

}
