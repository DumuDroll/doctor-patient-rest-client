import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FullInfo} from "../models/full-info";
import {Observable} from "rxjs";
import {HttpParamsUtil} from "../../shared/utils/http-params-util";

@Injectable({
  providedIn: 'root'
})
export class FullInfoService {
  private baseUrl = 'http://localhost:8080/api/fullInfo/';

  constructor(private http: HttpClient, private paramsUtil: HttpParamsUtil) {
  }

  public findAllFiltered(name?: string, page?: number, size?: number): Observable<FullInfo[]> {
    let params = this.paramsUtil.extracted(name, page, size);
    return this.http.get<FullInfo[]>(`${this.baseUrl}filtered/`, {params});
  }

  public findById(id: any): Observable<FullInfo> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  public create(fullInfo: FullInfo) {
    return this.http.post<FullInfo>(this.baseUrl, fullInfo);
  }

  public update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }

  public deleteById(id: any): Observable<FullInfo[]> {
    return this.http.delete<FullInfo[]>(`${this.baseUrl}${id}`)
  }

}
