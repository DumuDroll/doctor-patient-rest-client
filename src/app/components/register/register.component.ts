import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        username:  [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        repeatPassword: [null, Validators.required]
      },
      {
        validator: this.confirmedValidator('password', 'repeatPassword')
      });
  }

  onSubmit(): void {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    this.authService.register(username, password).subscribe({
        next: () => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/']).then();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      }
    );
  }

  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
