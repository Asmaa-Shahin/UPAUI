import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  CreateMasterAssetAttachmentVM, CreateMasterAssetVM,  EditMasterAssetVM, ListMasterAssetVM,  MainClass,  MasterAssetAttachmentVM, MasterAssetVM, SortAndSearchMasterAssetVM, ViewMasterAssetVM } from '../models/masterAssetVM';
import { environment } from 'src/environments/environment';
import { AssetCountParam, FiletrAssetCountParam } from '../models/assetcountparam';
import { mainClass } from '../models/countOfAssetVM';



@Injectable({
  providedIn: 'root'
})

export class MasterAssetService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  ListMasterAssets(assetCountParam:FiletrAssetCountParam): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.ListMasterAssets}`,assetCountParam, this.httpHeader);
  }

  GetMasterAssetById(id: number): Observable<EditMasterAssetVM> {
    return this.httpClient.get<EditMasterAssetVM>(`${environment.GetMasterAssetById}${id}`, this.httpHeader);
  }

 
  GetMasterAssets(): Observable<ListMasterAssetVM[]> {
    return this.httpClient.get<ListMasterAssetVM[]>(`${environment.ListMasterAssetsWithNofilter}`, this.httpHeader);
  }

  // GetMasterAssetWithPaging(page: Paging): Observable<ListMasterAssetVM[]> {
  //   return this.httpClient.put<ListMasterAssetVM[]>(`${environment.getMasterAssetWithPaging}`, page, this.httpHeader);
  // }



  // SearchInMasterAssets(pagenumber: number, pagesize: number, searchObj: SearchMasterAssetVM): Observable<ListMasterAssetVM[]> {
  //   return this.httpClient.post<ListMasterAssetVM[]>(`${environment.SearchInMasterAssets}${pagenumber}/${pagesize}`, searchObj, this.httpHeader);
  // }


  // sortMasterAsset(pagenumber: number, pagesize: number, sortObj: SortMasterAssetVM): Observable<ListMasterAssetVM[]> {
  //   return this.httpClient.post<ListMasterAssetVM[]>(`${environment.SortMasterAssets}${pagenumber}/${pagesize}`, sortObj, this.httpHeader);
  // }


  ListMasterAssetsByHospitalId(hospitalId: number): Observable<ListMasterAssetVM[]> {
    return this.httpClient.get<ListMasterAssetVM[]>(`${environment.ListMasterAssetsByHospitalId}${hospitalId}`, this.httpHeader);
  }




  

  AutoCompleteMasterAssetName(name: string): Observable<ListMasterAssetVM[]> {
    return this.httpClient.get<ListMasterAssetVM[]>(`${environment.AutoCompleteMasterAssetName}${name}`, this.httpHeader);
  }

  DistinctAutoCompleteMasterAssetName(name: string): Observable<ListMasterAssetVM[]> {
    return this.httpClient.get<ListMasterAssetVM[]>(`${environment.DistinctAutoCompleteMasterAssetName}${name}`, this.httpHeader);
  }

  ViewMasterAssetById(id: number): Observable<ViewMasterAssetVM> {
    return this.httpClient.get<ViewMasterAssetVM>(`${environment.ViewMasterAssetById}${id}`, this.httpHeader);
  }

  

  GenerateMasterAssetcode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.GenerateMasterAssetcode}`, this.httpHeader);
  }


  CreateMasterAsset(MasterAssetVM: CreateMasterAssetVM): Observable<number> {
    return this.httpClient.post<any>(`${environment.AddMasterAsset}`, MasterAssetVM, this.httpHeader);
  }

  UpdateMasterAsset(MasterAssetVM: EditMasterAssetVM): Observable<EditMasterAssetVM> {
    return this.httpClient.put<EditMasterAssetVM>(`${environment.UpdateMasterAsset}`, MasterAssetVM, this.httpHeader);
  }

  UpdateMasterAssetImageAfterInsert(MasterAssetVM: CreateMasterAssetVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.UpdateMasterAssetImageAfterInsert}`, MasterAssetVM, this.httpHeader);
  }



  DeleteMasterAsset(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteMasterAsset}${id}`, this.httpHeader);
  }


  CreateMasterAssetAttachments(attachObj: CreateMasterAssetAttachmentVM): Observable<CreateMasterAssetAttachmentVM> {
    return this.httpClient.post<any>(`${environment.CreateMasterAssetAttachments}`, attachObj, this.httpHeader);
  }


  GetAttachmentByMasterAssetId(assetId: number): Observable<MasterAssetAttachmentVM[]> {
    return this.httpClient.get<MasterAssetAttachmentVM[]>(`${environment.GetAttachmentByMasterAssetId}${assetId}`, this.httpHeader);
  }



  DeleteMasterAssetAttachmentById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteMasterAssetAttachmentById}${id}`, this.httpHeader);
  }



 

  GetLastDocumentForMsterAssetId(masterId: number): Observable<MasterAssetAttachmentVM> {
    return this.httpClient.get<MasterAssetAttachmentVM>(`${environment.GetLastDocumentForMsterAssetId}${masterId}`, this.httpHeader);
  }








  SortMasterAssetafterSearch(sortAndSearchMasterAssetVM:SortAndSearchMasterAssetVM ,pageSize:Number,pageNumber:number):Observable<MainClass>{

    return this.httpClient.post<MainClass>(`${environment.SortMasterAssetafterSearch}/${pageNumber}/${pageSize}`,sortAndSearchMasterAssetVM,this.httpHeader)
  }




  DeleteMasterAssetImage(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteMasterAssetImage}${id}`, this.httpHeader);
  }
}
