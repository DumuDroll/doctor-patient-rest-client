import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {Patient} from "../models/patient";
import {PatientPrescription} from "../models/patientPrescription";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/api/patients/';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
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
    return this.http.get<Patient[]>(`${this.baseUrl}filtered/`, {params});
  }

  public addDoctorToPatient(doctorId: any, patient: Patient) {
    return this.http.patch<Patient>(`${this.baseUrl}${doctorId}`, patient)
  }

  public addDrugToPatient(patientId: number, patientDrugs: PatientPrescription[]) {
    return this.http.patch<Patient>(`${this.baseUrl}${patientId}`, patientDrugs);
  }

  public findById(id: any): Observable<Patient> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  public create(patient: Patient) {
    return this.http.post<Patient>(this.baseUrl, patient);
  }

  public update(data: Patient): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }

  upload(file: File, id: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.baseUrl}diagnosis`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFile(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("id", id);

    return this.http.get(`${this.baseUrl}diagnosis`, {params: params});
  }

  public deleteById(id: any): Observable<Patient[]> {
    return this.http.delete<Patient[]>(`${this.baseUrl}${id}`)
  }

}
