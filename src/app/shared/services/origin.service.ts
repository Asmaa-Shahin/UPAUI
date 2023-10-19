import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  ListSupplierVM } from '../models/supplierVM';
import { CreateOriginVM, EditOriginVM, ListOriginVM, MainClass, SortOriginVM } from '../models/originVM';
import { AssetCountParam } from '../models/assetcountparam';


@Injectable({
  providedIn: 'root'
})

export class OriginService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetOrigins(): Observable<ListOriginVM[]> {
    return this.httpClient.get<ListOriginVM[]>(`${environment.GetOrigins}`, this.httpHeader);
  }
 ListOrigins(assetcountparam:AssetCountParam): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.ListOrigins}`,assetcountparam, this.httpHeader);
  }




  GetOriginById(id: number): Observable<EditOriginVM> {
    return this.httpClient.get<EditOriginVM>(`${environment.GetOriginById}${id}`, this.httpHeader);
  }
  CreateOrigin(OriginVM: CreateOriginVM): Observable<CreateOriginVM> {
    return this.httpClient.post<any>(`${environment.AddOrigin}`, OriginVM, this.httpHeader);
  }


  UpdateOrigin(OriginObj: EditOriginVM): Observable<EditOriginVM> {
    return this.httpClient.put<EditOriginVM>(`${environment.UpdateOrigin}`, OriginObj, this.httpHeader);
  }

  DeleteOrigin(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteOrigin}${id}`, this.httpHeader);
  }




  SortOrigins(pagenumber: number, pagesize: number, sortObj: SortOriginVM): Observable<ListSupplierVM[]> {
    return this.httpClient.post<ListSupplierVM[]>(`${environment.SortOrigins}${pagenumber}/${pagesize}`, sortObj, this.httpHeader);
  }
}
