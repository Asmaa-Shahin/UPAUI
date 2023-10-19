import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGovernorateVM, EditGovernorateVM, ListGovernorateVM, ListGovernorateVM2 } from '../models/governorateVM';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class GovernorateService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetGovernorates(): Observable<ListGovernorateVM[]> {
    return this.httpClient.get<ListGovernorateVM[]>(`${environment.ListGovernorates}`, this.httpHeader);
  }

  ListGovernoratesModel(): Observable<ListGovernorateVM2[]> {
    return this.httpClient.get<ListGovernorateVM2[]>(`${environment.ListGovernoratesModel}`, this.httpHeader);
  }



  GetGovernorateById(id: number): Observable<EditGovernorateVM> {
    return this.httpClient.get<EditGovernorateVM>(`${environment.GetGovernorateById}${id}`, this.httpHeader);
  }
  CreateGovernorate(GovernorateVM: CreateGovernorateVM): Observable<CreateGovernorateVM> {
    return this.httpClient.post<any>(`${environment.AddGovernorate}`, GovernorateVM, this.httpHeader);
  }
  UpdateGovernorate(GovernorateVM: EditGovernorateVM): Observable<EditGovernorateVM> {
    return this.httpClient.put<EditGovernorateVM>(`${environment.UpdateGovernorate}`, GovernorateVM, this.httpHeader);
  }

  DeleteGovernorate(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteGovernorate}${id}`, this.httpHeader);
  }

}
