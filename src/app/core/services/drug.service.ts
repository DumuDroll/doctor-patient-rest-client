import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Drug} from "../models/drug";
import {HttpParamsUtil} from "../../shared/utils/http-params-util";

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private baseUrl = 'http://localhost:8080/api/drugs/';

  constructor(private http: HttpClient, private paramsUtil: HttpParamsUtil) {
  }

  public findAll(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.baseUrl);
  }

  public findAllFiltered(name?: string, page?: number, size?: number): Observable<Drug[]> {
    let params = this.paramsUtil.extracted(name, page, size);
    return this.http.get<Drug[]>(`${this.baseUrl}filtered/`, {params});
  }

  public create(patient: Drug) {
    return this.http.post<Drug>(this.baseUrl, patient);
  }

  public addDrugToPatient(patientId: number, drug: Drug) {
    return this.http.patch<Drug>(`${this.baseUrl}${patientId}`, drug)
  }

  public update(data: Drug): Observable<Drug> {
    return this.http.put<Drug>(`${this.baseUrl}`, data);
  }

  public deleteById(id: number): Observable<Drug[]> {
    return this.http.delete<Drug[]>(`${this.baseUrl}${id}`)
  }

}
