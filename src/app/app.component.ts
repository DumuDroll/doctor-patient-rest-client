import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "./core/services/token-storage.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./core/services/authentication.service";
import {UserService} from "./core/services/user.service";
import {DomSanitizer} from "@angular/platform-browser";

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
  img: any;

  @Input() title = 'DoctorPatientRestClient';

  constructor(private tokenStorageService: TokenStorageService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private sanitizer :DomSanitizer,
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
      this.userService.getFile(value.id).subscribe(data =>{
        let objectURL = 'data:image/jpg;base64,' + data.icon;
        if(objectURL==='data:image/jpg;base64,'){
          this.img=null;
        }else {
          this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });
    })

  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.roles = [];
    this.showAdminBoard = false;
    this.isLoggedIn = false;
    this.img = null;
    this.router.navigate(['/']).then();
  }
}
