import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FullInfo} from "../models/full-info";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/api/fullInfo/';

@Injectable({
  providedIn: 'root'
})
export class FullInfoService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<FullInfo[]> {
    return this.http.get<FullInfo[]>(baseUrl);
  }

  public findById(id: any): Observable<FullInfo> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(fullInfo: FullInfo) {
    return this.http.post<FullInfo>(baseUrl, fullInfo);
  }

  public update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }

  public deleteById(id: any): Observable<FullInfo[]> {
    return this.http.delete<FullInfo[]>(`${baseUrl}/${id}`)
  }

}
