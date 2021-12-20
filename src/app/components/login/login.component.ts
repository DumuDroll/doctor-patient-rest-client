import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {User} from "../../core/models/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder,
              public userService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  login() {
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.router.navigateByUrl('/patients');
      },
      error: () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        this.openSnackBar("Wrong username or password!", "");
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
