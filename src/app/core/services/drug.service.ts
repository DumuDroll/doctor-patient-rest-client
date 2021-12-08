import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  public findAllFiltered(name?: string, page?: number, size?: number): Observable<Drug[]> {
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
    return this.http.get<Drug[]>(`${baseUrl}filtered/`, {params});
  }

  public findById(id: number): Observable<Drug> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(patient: Drug) {
    return this.http.post<Drug>(baseUrl, patient);
  }

  public addDrugToPatient(patientId: number, drug: Drug) {
    return this.http.patch<Drug>(`${baseUrl}/${patientId}`, drug)
  }

  public update(data: Drug): Observable<Drug> {
    return this.http.put<Drug>(`${baseUrl}`, data);
  }

  public deleteById(id: number): Observable<Drug[]> {
    return this.http.delete<Drug[]>(`${baseUrl}/${id}`)
  }

}
