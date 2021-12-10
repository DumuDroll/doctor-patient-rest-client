import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Doctor} from "../models/doctor";

const baseUrl = 'http://localhost:8080/api/doctors/';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(baseUrl);
  }

  public findAllFiltered(name?: string, page?: number, size?: number): Observable<Doctor[]> {
    let params = new HttpParams();
    if (typeof name !== 'undefined') {
      params = params.append('name', name);
    }
    if (typeof page !== 'undefined') {
      params = params.append('page', page);
    }
    if (typeof size !== 'undefined') {
      params = params.append('size', size);
    }
    console.log("params", params);
    return this.http.get<Doctor[]>(`${baseUrl}filtered/`, {params: params});
  }

  public findById(id: number): Observable<Doctor> {
    return this.http.get(`${baseUrl}${id}`);
  }

  public create(doctor: Doctor) {
    return this.http.post<Doctor>(baseUrl, doctor);
  }

  public update(data: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${baseUrl}`, data);
  }

  public deleteById(id: number): Observable<Doctor[]> {
    return this.http.delete<Doctor[]>(`${baseUrl}${id}`)
  }

}
