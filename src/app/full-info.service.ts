import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FullInfo} from "./full-info";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FullInfoService {

  private readonly fullInfoUrl: string;

  constructor(private http: HttpClient) {
    this.fullInfoUrl='http://localhost:8080/api/fullInfo';
  }

  public findAll(): Observable<FullInfo[]>{
    return this.http.get<FullInfo[]>(this.fullInfoUrl);
  }

  public save(fullInfo: FullInfo){
    return this.http.post<FullInfo>(this.fullInfoUrl, fullInfo);
  }
}
