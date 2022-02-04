import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../core/services/token-storage.service";
import {UserService} from "../../core/services/user.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfo?: Observable<any>;

  currentUser: any;
  userToken: any;
  img: any;

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private sanitizer :DomSanitizer ) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userToken = this.token.getToken();
    this.fileInfo = this.userService.getFile(this.currentUser.id);
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.userService.upload(this.currentFile, this.currentUser.username).subscribe({
        next: ((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfo = this.userService.getFile(this.currentUser.id);
          }
        }),
        error: ((err: any) => {
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        })
      });
    }
  }

}
