import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHospitalVM, DetailHospitalVM, EditHospitalVM, GenerateHospitalCode, ListHospitalVM, MainClass, SearchHospitalVM } from '../models/hospitalVM';
import { environment } from 'src/environments/environment';;
import { AssetCountParam, FiletrAssetCountParam } from '../models/assetcountparam';


@Injectable({
  providedIn: 'root'
})

export class HospitalService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetHospitals(assetCountParam:FiletrAssetCountParam): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.ListHospitals}`,assetCountParam, this.httpHeader);
  }
  GetAllLstHospitals(): Observable<ListHospitalVM[]> {
    return this.httpClient.get<ListHospitalVM[]>(`${environment.GetAllLstHospitals}`,this.httpHeader);
  }
  DeleteHospital(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteHospital}${id}`, this.httpHeader);
  }
  
  CreateHospital(HospitalVM: CreateHospitalVM): Observable<CreateHospitalVM> {
    return this.httpClient.post<any>(`${environment.AddHospital}`, HospitalVM, this.httpHeader);
  }
  UpdateHospital(HospitalVM: EditHospitalVM): Observable<EditHospitalVM> {
    return this.httpClient.put<EditHospitalVM>(`${environment.UpdateHospital}`, HospitalVM, this.httpHeader);
  }

  // GetHospitalByUserId(userId: string): Observable<ListHospitalVM[]> {
  //   return this.httpClient.post<ListHospitalVM[]>(`${environment.GetHospitalsByUserId}${userId}`, this.httpHeader);
  // }

  GetHospitalById(id: number): Observable<EditHospitalVM> {
    return this.httpClient.get<EditHospitalVM>(`${environment.GetHospitalById}${id}`, this.httpHeader);
  }
  GenerateHospitalCode(): Observable<GenerateHospitalCode> {
    return this.httpClient.get<GenerateHospitalCode>(`${environment.GenerateHospitalCode}`, this.httpHeader);
  }




    GetHospitalByUserId(userId: string): Observable<ListHospitalVM[]> {
    return this.httpClient.post<ListHospitalVM[]>(`${environment.GetHospitalsByUserId}${userId}`, null,this.httpHeader);
  }

  GetHospitalDetailById(id: number): Observable<DetailHospitalVM> {
    return this.httpClient.get<DetailHospitalVM>(`${environment.GetHospitalDetailById}${id}`, this.httpHeader);
  }

  GetHospitalsByCityId(cityId: number): Observable<ListHospitalVM[]> {
    return this.httpClient.get<ListHospitalVM[]>(`${environment.GetHospitalsByCityId}${cityId}`, this.httpHeader);
  }

  GetHospitalsBySubOrganizationId(subOrgId: number): Observable<ListHospitalVM[]> {
    return this.httpClient.get<ListHospitalVM[]>(`${environment.GetHospitalsBySubOrganizationId}${subOrgId}`, this.httpHeader);
  }

  AutoCompleteHospitalName(name:string):Observable<ListHospitalVM[]>{
    return this.httpClient.get<ListHospitalVM[]>(`${environment.AutoCompleteHospitalName}${name}`,this.httpHeader)
  }

  GetHospitalByAssetId(id: number): Observable<EditHospitalVM> {
    return this.httpClient.get<EditHospitalVM>(`${environment.GetHospitalByAssetId}${id}`, this.httpHeader);
  }

  getHospitalByGovId(govId: number): Observable<ListHospitalVM[]> {
    return this.httpClient.get<ListHospitalVM[]>(`${environment.GetHospitalByGovId}${govId}`, this.httpHeader);
  }

}
