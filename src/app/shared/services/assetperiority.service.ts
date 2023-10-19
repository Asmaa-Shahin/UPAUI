import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListAssetPeriorityVM } from '../models/assetPeriorityVM';


@Injectable({
  providedIn: 'root'
})

export class AssetPeriorityService {
  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("userToken");
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetAssetPeriorities(): Observable<ListAssetPeriorityVM[]> {
    return this.httpClient.get<ListAssetPeriorityVM[]>(`${environment.ListAssetPeriorities}`, this.httpHeader);
  }


  // GetSupplierById(id: number): Observable<EditSupplierVM> {
  //   return this.httpClient.get<EditSupplierVM>(`${environment.GetSupplierById}${id}`, this.httpHeader);
  // }
  // CreateSupplier(SupplierVM: CreateSupplierVM): Observable<CreateSupplierVM> {
  //   return this.httpClient.post<any>(`${environment.AddSupplier}`, SupplierVM, this.httpHeader);
  // }


  // UpdateSupplier(SupplierObj: EditSupplierVM): Observable<EditSupplierVM> {
  //   return this.httpClient.put<EditSupplierVM>(`${environment.UpdateSupplier}`, SupplierObj, this.httpHeader);
  // }

  // DeleteSupplier(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(`${environment.DeleteSupplier}${id}`, this.httpHeader);
  // }

}
