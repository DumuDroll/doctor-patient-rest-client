import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "./core/services/token-storage.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./core/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  @Input() title = 'DoctorPatientRestClient';

  constructor(private tokenStorageService: TokenStorageService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
    this.authenticationService.eventSubject.subscribe(value => {
      this.isLoggedIn = value.isLoggedIn;
      this.roles = value.roles;
      this.showAdminBoard = value.showAdminBoard;
      this.username = value.username;
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.roles = [];
    this.showAdminBoard = false;
    this.isLoggedIn = false;
    this.router.navigate(['/']).then();
  }
}
