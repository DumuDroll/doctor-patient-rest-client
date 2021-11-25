import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  public findById(id: number): Observable<Doctor> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(doctor: Doctor) {
    return this.http.post<Doctor>(baseUrl, doctor);
  }

  public update(data: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${baseUrl}`, data);
  }

  public deleteById(id: number): Observable<Doctor[]> {
    return this.http.delete<Doctor[]>(`${baseUrl}/${id}`)
  }

}
