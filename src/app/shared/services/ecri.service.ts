import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateECRIVM, EditECRIVM, ListECRIVM, } from '../models/ecriVM';


@Injectable({
  providedIn: 'root'
})

export class ECRIService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetECRIS(): Observable<ListECRIVM[]> {
    return this.httpClient.get<ListECRIVM[]>(`${environment.ListECRIs}`, this.httpHeader);
  }



  // sortECRI(pagenumber: number, pagesize: number, sortObj: SortECRIVM): Observable<ListECRIVM[]> {
  //   return this.httpClient.post<ListECRIVM[]>(`${environment.SortECRI}${pagenumber}/${pagesize}`, sortObj, this.httpHeader);
  // }



  GetECRIById(id: number): Observable<EditECRIVM> {
    return this.httpClient.get<EditECRIVM>(`${environment.GetECRIById}${id}`, this.httpHeader);
  }
  CreateECRI(ECRIVM: CreateECRIVM): Observable<CreateECRIVM> {
    return this.httpClient.post<any>(`${environment.AddECRI}`, ECRIVM, this.httpHeader);
  }


  UpdateECRI(ECRIObj: EditECRIVM): Observable<EditECRIVM> {
    return this.httpClient.put<EditECRIVM>(`${environment.UpdateECRI}`, ECRIObj, this.httpHeader);
  }

  DeleteECRI(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteECRI}${id}`, this.httpHeader);
  }

}
