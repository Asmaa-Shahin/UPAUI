import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  CreateOrganizationVM, EditOrganizationVM, ListOrganizationVM } from '../models/organizationVM';
import { environment } from 'src/environments/environment';
import { GeneratedAssetDetailBCVM } from '../models/assetDetailVM';


@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetOrganizations(): Observable<ListOrganizationVM[]> {
    return this.httpClient.get<ListOrganizationVM[]>(`${environment.ListOrganizations}`, this.httpHeader);
  }

  GetOrganizationById(id: number): Observable<EditOrganizationVM> {
    return this.httpClient.get<EditOrganizationVM>(`${environment.GetOrganizationById}${id}`, this.httpHeader);
  }

  CreateOrganization(organizationVM: CreateOrganizationVM): Observable<CreateOrganizationVM> {
    return this.httpClient.post<any>(`${environment.AddOrganization}`, organizationVM, this.httpHeader);
  }

  UpdateOrganization(organizationVM: EditOrganizationVM): Observable<EditOrganizationVM> {
    return this.httpClient.put<EditOrganizationVM>(`${environment.UpdateOrganization}`, organizationVM, this.httpHeader);
  }

  DeleteOrganization(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteOrganization}${id}`, this.httpHeader);
  }
  GenerateOrgcode(): Observable<GeneratedAssetDetailBCVM> {
    return this.httpClient.get<GeneratedAssetDetailBCVM>(`${environment.GenerateOrgcode}`, this.httpHeader);
  }
}
