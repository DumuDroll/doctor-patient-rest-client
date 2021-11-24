import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Patient} from "../models/patient";

const baseUrl = 'http://localhost:8080/api/patients/';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(baseUrl);
  }

  public findById(id: any): Observable<Patient> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(patient: Patient) {
    return this.http.post<Patient>(baseUrl, patient);
  }

  public addDoctorToPatient(doctorId:any, patient: Patient){
    return this.http.patch<Patient>(`${baseUrl}/${doctorId}`, patient)
  }

  public update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }

}
