import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PatientPrescription} from "../models/patientPrescription";

@Injectable({
  providedIn: 'root'
})
export class PatientPrescriptionService {
  private baseUrl = 'http://localhost:8080/api/patientPrescriptions/';

  constructor(private http: HttpClient) {
  }

  public findAllFiltered(dateFrom?: string, dateTo?: string, page?: number, size?: number, patientId?: string): Observable<PatientPrescription[]> {
    let params = new HttpParams();
    if (typeof dateFrom !== 'undefined') {
      params = params.append('dateFrom', dateFrom);
    }
    if (typeof dateTo !== 'undefined') {
      params = params.append('dateTo', dateTo);
    }
    if (typeof page !== 'undefined') {
      params = params.append('page', page);
    }
    if (typeof size !== 'undefined') {
      params = params.append('size', size);
    }
    if (typeof patientId !== 'undefined') {
      params = params.append('patientId', patientId);
    }
    return this.http.get<PatientPrescription[]>(`${this.baseUrl}filtered/`, {params});
  }
}
