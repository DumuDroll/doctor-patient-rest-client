import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PatientPrescription} from "../models/patientPrescription";

const baseUrl = 'http://localhost:8080/api/patientPrescriptions/';

@Injectable({
  providedIn: 'root'
})
export class PatientPrescriptionService {

  constructor(private http: HttpClient) {
  }

  public findAllFiltered(dateFrom?: string, dateTo?: string,page?: number, size?: number): Observable<PatientPrescription[]> {
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
    return this.http.get<PatientPrescription[]>(`${baseUrl}filtered/`, {params});
  }
}
