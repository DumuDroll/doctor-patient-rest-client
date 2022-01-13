import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Doctor} from "../models/doctor";
import {HttpParamsUtil} from "../../shared/utils/http-params-util";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'http://localhost:8080/api/doctors/';

  constructor(private http: HttpClient, private paramsUtil: HttpParamsUtil) {
  }

  public findAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  public findAllFiltered(name?: string, page?: number, size?: number): Observable<Doctor[]> {
    let params = this.paramsUtil.extracted(name, page, size);
    return this.http.get<Doctor[]>(`${this.baseUrl}filtered/`, {params: params});
  }

  public create(doctor: Doctor) {
    return this.http.post<Doctor>(this.baseUrl, doctor);
  }

  public update(data: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}`, JSON.stringify(data), httpOptions);
  }

  public deleteById(id: number): Observable<Doctor[]> {
    return this.http.delete<Doctor[]>(`${this.baseUrl}${id}`)
  }

}
