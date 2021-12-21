import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

const API_URL = 'http://localhost:8080/api/test/';

class LoginInfo {
  isLoggedIn = false;
  roles: string[] = [];
  showAdminBoard = false;
  username = "";
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private eventSource = new BehaviorSubject<LoginInfo>(new LoginInfo());
  eventSubject = this.eventSource.asObservable();

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  updateLoggedInInfo() {
    let loginInfo= new LoginInfo();
    loginInfo.isLoggedIn  = !!this.tokenStorageService.getToken();
    if (loginInfo.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      loginInfo.roles = user.roles;

      loginInfo.showAdminBoard = loginInfo.roles.includes('ROLE_ADMIN');

      loginInfo.username = user.username;
      this.eventSource.next(loginInfo)
    }
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
