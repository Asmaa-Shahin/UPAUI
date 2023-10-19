import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSupplierVM, EditSupplierVM, GenerateSupplierCode, ListSupplierVM } from '../models/supplierVM';
import { CreateSupplierAttachment, ListSupplierAttachmentVM } from '../models/SupplierAttachmentVM';


@Injectable({
  providedIn: 'root'
})

export class SupplierService {
  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("userToken");
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetSuppliers(): Observable<ListSupplierVM[]> {
    return this.httpClient.get<ListSupplierVM[]>(`${environment.ListSuppliers}`, this.httpHeader);
  }


  // sortSuppliers(pagenumber: number, pagesize: number, sortObj: SortSupplierVM): Observable<ListSupplierVM[]> {
  //   return this.httpClient.post<ListSupplierVM[]>(`${environment.SortSuppliers}${pagenumber}/${pagesize}`, sortObj, this.httpHeader);
  // }



  GetSupplierById(id: number): Observable<EditSupplierVM> {
    return this.httpClient.get<EditSupplierVM>(`${environment.GetSupplierById}${id}`, this.httpHeader);
  }



  CreateSupplier(SupplierVM: CreateSupplierVM): Observable<CreateSupplierVM> {
    return this.httpClient.post<any>(`${environment.AddSupplier}`, SupplierVM, this.httpHeader);
  }


  UpdateSupplier(SupplierObj: EditSupplierVM): Observable<EditSupplierVM> {
    return this.httpClient.put<EditSupplierVM>(`${environment.UpdateSupplier}`, SupplierObj, this.httpHeader);
  }

  DeleteSupplier(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteSupplier}${id}`, this.httpHeader);
  }

  CreateSupplierAttachment(attachObj: CreateSupplierAttachment): Observable<number> {
    return this.httpClient.post<number>(`${environment.CreateSupplierAttachment}`, attachObj, this.httpHeader);
  }
  GetSupplierAttachmentsBySupplierId(supplierId: number): Observable<ListSupplierAttachmentVM[]> {
    return this.httpClient.get<ListSupplierAttachmentVM[]>(`${environment.GetSupplierAttachmentsBySupplierId}${supplierId}`, this.httpHeader);
  }

  GenerateSupplierCode(): Observable<GenerateSupplierCode> {
    return this.httpClient.get<GenerateSupplierCode>(`${environment.GenerateSupplierCode}`, this.httpHeader);
  }
}
