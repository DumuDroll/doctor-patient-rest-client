import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {User} from "../models/user";

class LoginInfo {
  id=0;
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

  private authApiUrl = 'http://localhost:8080/api/auth/';

  private eventSource = new Subject<LoginInfo>();
  eventSubject = this.eventSource.asObservable();
  public username?: string;
  public password?: string;

  constructor(private http: HttpClient,
             private tokenStorageService: TokenStorageService) {
  }

  firstLogin(username: string, password: string): Observable<any> {
    return this.http.post(this.authApiUrl + 'setPassword', {
      username,
      password
    }, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authApiUrl + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password?: string): Observable<any> {
    return this.http.post<User>(this.authApiUrl + 'signup', {
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
      loginInfo.id = user.id;
      loginInfo.showAdminBoard = loginInfo.roles.includes('ROLE_ADMIN');

      loginInfo.username = user.username;
      this.eventSource.next(loginInfo)
    }
  }

}
