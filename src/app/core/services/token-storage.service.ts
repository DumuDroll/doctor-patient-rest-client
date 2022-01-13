import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private authToken = 'auth-token';
  private authUser = 'auth-user';

  constructor() {
    //this is intentional
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.authToken);
    window.sessionStorage.setItem(this.authToken, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.authToken);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.authUser);
    window.sessionStorage.setItem(this.authUser, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.authUser);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
