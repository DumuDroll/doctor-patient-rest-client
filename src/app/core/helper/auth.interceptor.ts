import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "../services/token-storage.service";
import {Observable} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  navigationExtras?: NavigationExtras;

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      httpRequest = httpRequest.clone({setHeaders:{ Authorization: `Bearer ${token}`}});
    } else {
      this.navigationExtras = {state: {message: 'Unauthorized access is forbidden'}};
      this.router.navigate(['/'], this.navigationExtras);
    }
    return next.handle(httpRequest);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
