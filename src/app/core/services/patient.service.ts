import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Patient} from "../models/patient";
import {PatientDrug} from "../models/patientDrug";

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

  public findAllFiltered(fNameLName?: string, page?: number, size?: number): Observable<Patient[]> {
    let params = new HttpParams();
    if (typeof fNameLName !== 'undefined') {
      params = params.append('fNameLName', fNameLName);
    }
    if (typeof page !== 'undefined') {
      params = params.append('page', page);
    }
    if (typeof size !== 'undefined') {
      params = params.append('size', size);
    }
    return this.http.get<Patient[]>(`${baseUrl}filtered/`, {params});
  }

  public addDoctorToPatient(doctorId: any, patient: Patient) {
    return this.http.patch<Patient>(`${baseUrl}${doctorId}`, patient)
  }

  public addDrugToPatient(patientId: number, patientDrugs: PatientDrug[]) {
    console.log("dataApi", patientDrugs);
    return this.http.patch<Patient>(`${baseUrl}${patientId}`, patientDrugs);
  }

  public findById(id: any): Observable<Patient> {
    return this.http.get(`${baseUrl}${id}`);
  }

  public create(patient: Patient) {
    return this.http.post<Patient>(baseUrl, patient);
  }

  public update(data: Patient): Observable<any> {
    console.log("dataPatientsPut", data);
    return this.http.put(`${baseUrl}`, data);
  }

  public deleteById(id: any): Observable<Patient[]> {
    return this.http.delete<Patient[]>(`${baseUrl}${id}`)
  }

}
