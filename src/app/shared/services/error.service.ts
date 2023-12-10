import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateECRIVM, EditECRIVM, ListECRIVM, } from '../models/ecriVM';


@Injectable({
  providedIn: 'root'
})

export class ErrorService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  validateMacAddress(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.getMacAddress}`, this.httpHeader);
}


}
