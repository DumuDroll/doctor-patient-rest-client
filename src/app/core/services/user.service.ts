import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {HttpParamsUtil} from "../../shared/utils/http-params-util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient, private paramsUtil: HttpParamsUtil) {
  }

  public findAllFiltered(name?: string, page?: number, size?: number, blocked?: boolean): Observable<User[]> {
    let params = this.paramsUtil.extracted(name, page, size);
    if (typeof blocked !== 'undefined') {
      params = params.append('blocked', blocked);
    }
    return this.http.get<User[]>(`${this.baseUrl}filtered/`, {params: params});
  }

  public create(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl, user);
  }

  public deleteById(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}${id}`)
  }

  upload(file: File, email: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('email', email);

    const req = new HttpRequest('POST', `${this.baseUrl}icon`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFile(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("id", id);

    return this.http.get(`${this.baseUrl}icon`, {params: params});
  }
}
