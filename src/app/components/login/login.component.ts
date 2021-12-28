import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../core/services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = 'Invalid Credentials';
  successMessage?: string;
  invalidLogin = false;
  loginSuccess = false;
  message = '';

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService,
              public authenticationService: AuthenticationService) {
    const navigation = this.router.getCurrentNavigation();
    if(typeof navigation !='undefined' && navigation!=null){
      const state = navigation.extras.state as {message: string};
      if(typeof state !='undefined'){
        this.message = state.message;
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (data) => {
        this.tokenStorageService.saveToken(data.jwt);
        this.tokenStorageService.saveUser(data);
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.authenticationService.updateLoggedInInfo();
        this.router.navigateByUrl("/patients");
      },
      error: (err) => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        this.openSnackBar("Error: " + err.error.detail, "Got it");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['red-snackbar'],
    });
  }
}
