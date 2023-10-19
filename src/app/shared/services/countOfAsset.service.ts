import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountAssetsVM, CreateCountOfAssetsVM, EditCountOfAssetsVM, MainClass, mainClass  } from '../models/countOfAssetVM';
import { AssetCountParam, FiletrAssetCountParam } from '../models/assetcountparam';

@Injectable({
  providedIn: 'root'
})

export class CountOfAssetService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  SaveCountOfAssets(model: CreateCountOfAssetsVM[]): Observable<number> {
    return this.httpClient.post<number>(`${environment.CreateCountOfAssets}`, model, this.httpHeader);
  }


  SaveRecordCountOfAssets(model: CreateCountOfAssetsVM): Observable<number> {
    return this.httpClient.post<number>(`${environment.SaveRecordCountOfAssets}`, model, this.httpHeader);
  }

  GetCountOfAssetById(id: number): Observable<EditCountOfAssetsVM> {
    return this.httpClient.get<EditCountOfAssetsVM>(`${environment.GetCountOfAssetById}${id}`, this.httpHeader);
  }

  UpdateCountOfAsset(model: CreateCountOfAssetsVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.UpdateCountOfAsset}`, model, this.httpHeader);
  }
  DeleteCountOfAsset(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${environment.DeleteCountOfAsset}${id}`, this.httpHeader);
  }
  GetCountOfAssets(assetcountParam: AssetCountParam): Observable<MainClass> {
    let params = new HttpParams()
    const headers = this.getHeaders();
    params = params.append('pageIndex', assetcountParam.pageIndex.toString());
    params = params.append('pageSize', assetcountParam.pageSize.toString());
    return this.httpClient.get<MainClass>(`${environment.GetCountOfAssets}`, {headers, params });
  }
  CategoryPivotTable(assetcountParam: AssetCountParam): Observable<MainClass> {
    let params = new HttpParams()
    const headers = this.getHeaders();

    params = params.append('pageIndex', assetcountParam.pageIndex.toString());
    params = params.append('pageSize', assetcountParam.pageSize.toString());
    return this.httpClient.get<MainClass>(`${environment.CategoryPivotTable}`, { headers,params });
  }



  GetCountOfAssetByCategoryGovernorate(assetcountParam: FiletrAssetCountParam): Observable<CountAssetsVM[]> {
    return this.httpClient.post<CountAssetsVM[]>(`${environment.GetCountOfAssetByCategoryGovernorate}`, assetcountParam,this.httpHeader);
  }


  GetCountOfAssetByOrganizationGovernorate(): Observable<CountAssetsVM[]> {
    return this.httpClient.get<CountAssetsVM[]>(`${environment.GetCountOfAssetByOrganizationGovernorate}`, this.httpHeader);
  }

  FilterCountOfAssets(assetcountParam: FiletrAssetCountParam): Observable<mainClass> {
    return this.httpClient.post<mainClass>(`${environment.FilterCountOfAssets}`, assetcountParam,this.httpHeader);
  }
  FilterCountOfAssetByOrganizationGovernorate(assetcountParam: FiletrAssetCountParam): Observable<CountAssetsVM[]> {
    return this.httpClient.post<CountAssetsVM[]>(`${environment.FilterCountOfAssetByOrganizationGovernorate}`, assetcountParam,this.httpHeader);
  }
}
