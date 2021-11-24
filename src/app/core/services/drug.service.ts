import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Drug} from "../models/drug";

const baseUrl = 'http://localhost:8080/api/drugs/';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Drug[]> {
    return this.http.get<Drug[]>(baseUrl);
  }

  public findById(id: number): Observable<Drug> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(patient: Drug) {
    return this.http.post<Drug>(baseUrl, patient);
  }

  public addDoctorToPatient(patientId:number, drug: Drug){
    return this.http.patch<Drug>(`${baseUrl}/${patientId}`, drug)
  }

  public update(data: Drug): Observable<Drug> {
    return this.http.put<Drug>(`${baseUrl}`, data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }

}
