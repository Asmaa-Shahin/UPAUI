import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AssetDetailAttachmentVM, AssetDetailVM,  ChartFilter,  CreateAssetDetailAttachmentVM, CreateAssetDetailVM, EditAssetDetailVM,
  FilterAssetDetail,
  GeneratedAssetDetailBCVM, HospitalAssetAge, ListAssetDetailVM, MainClass, SortAndSearchAssetVM, SortAssetDetailsVM, SortAssetVM, ViewAssetDetailVM
} from '../models/assetDetailVM';
import { AssetCountParam, FiletrAssetCountParam } from '../models/assetcountparam';
import { ChartCountOfAssetDetailVM, CountAssetsVM } from '../models/countOfAssetVM';
import { BrandGroupVM } from '../models/brandVM';
import { LoggedUser } from '../models/userVM';
import { DrawChart, DrawChartByGov, DrawChartForGovAndPopulation } from '../models/DrawChartVM';



@Injectable({
  providedIn: 'root'
})

export class AssetDetailService {
   token = localStorage.getItem("userToken");
  
  constructor(private httpClient: HttpClient) { 
  // Replace with the actual token

 
  }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };
  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('userToken');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }
  //  httpheaders = {headers:this.getHeaders()};
  GroupAssetDetailsByBrand(data: FilterAssetDetail): Observable<BrandGroupVM[]> {
  
    return this.httpClient.post<BrandGroupVM[]>(`${environment.GroupAssetDetailsByBrand}`, data,this.httpHeader)
  }

  GetHospitalAssets(hospitalId: number, statusId: number, userId: string, page: number, pageSize: number, sortObj: SortAssetVM): Observable<ListAssetDetailVM[]> {
    return this.httpClient.post<ListAssetDetailVM[]>(`${environment.GetHospitalAssets}${hospitalId}/${statusId}/${userId}/${page}/${pageSize}`, sortObj, this.httpHeader);
  }

  SortAssetDetailAfterSearch(sortObject: SortAssetDetailsVM, filteredObj: FilterAssetDetail, pageNumber: number, pageSize: number): Observable<MainClass> {
    const data = { sortObject, filteredObj };
    return this.httpClient.post<MainClass>(`${environment.SortAssetDetailAfterSearch}/${pageNumber}/${pageSize}`, data,this.httpHeader)
  }

  AutoCompleteAssetBarCode(barcode: string, hospitaId: number): Observable<AssetDetailVM[]> {
    return this.httpClient.get<AssetDetailVM[]>(`${environment.AutoCompleteAssetBarCode}${barcode}/${hospitaId}`, this.httpHeader);
  }

  GetAssetsByBrandId(brandId: number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.GetAssetsByBrandId}/${brandId}`,this.httpHeader);
  }
  GetAssetsByGovId(govId: number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.GetAssetsByGovId}/${govId}`,this.httpHeader);
  }
  GetAssetsByHosId(govId: number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.GetAssetsByHosId}/${govId}`,this.httpHeader);
  }
  GetAssetsByOrgId(govId: number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.GetAssetsByOrgId}/${govId}`,this.httpHeader);
  }
  GetAssetsBySubOrgId(govId: number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.GetAssetsBySubOrgId}/${govId}`,this.httpHeader);
  }
  AutoCompleteAssetSerial(serial: string, hospitaId: number): Observable<AssetDetailVM[]> {
    return this.httpClient.get<AssetDetailVM[]>(`${environment.AutoCompleteAssetSerial}${serial}/${hospitaId}`, this.httpHeader);
  }

  GetAssetById(id: number): Observable<EditAssetDetailVM> {
    return this.httpClient.get<EditAssetDetailVM>(`${environment.GetAssetById}${id}`, this.httpHeader);
  }

  ViewAssetById(id: number): Observable<ViewAssetDetailVM> {
    return this.httpClient.get<ViewAssetDetailVM>(`${environment.ViewAssetById}${id}`, this.httpHeader);
  }

  GenerateAssetDetailBarcode(): Observable<GeneratedAssetDetailBCVM> {
    return this.httpClient.get<GeneratedAssetDetailBCVM>(`${environment.GenerateAssetDetailBarcode}`, this.httpHeader);
  }


  FilterDataByDepartmentBrandSupplierIdAndPaging(filteredObj: FilterAssetDetail, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.FilterDataByDepartmentBrandSupplierIdAndPaging}/${pageNumber}/${pageSize}`, filteredObj, this.httpHeader);
  }


  SortAssetDetail(sortObject: SortAssetDetailsVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.SortAssetDetail}/${pageNumber}/${pageSize}/`, sortObject, this.httpHeader);
  }
  CreateAsset(AssetVM: CreateAssetDetailVM): Observable<number> {

 
    return this.httpClient.post<any>(`${environment.AddAsset}`, AssetVM,this.httpHeader);
  }

  GetAssetsByUserIdAndPaging( pageNumber: number, pageSize: number): Observable<MainClass> {
   
    console.log(this.httpHeader);
    return this.httpClient.post<MainClass>(`${environment.GetAssetsByUserIdAndPaging}${pageNumber}/${pageSize}`,null,this.httpHeader);
  }
  UpdateAsset(AssetVM: EditAssetDetailVM): Observable<EditAssetDetailVM> {
    return this.httpClient.put<EditAssetDetailVM>(`${environment.UpdateAsset}`, AssetVM, this.httpHeader);
  }
  DeleteAsset(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteAsset}${id}`, this.httpHeader);
  }

  CreateAssetDetailAttachments(attachObj: CreateAssetDetailAttachmentVM): Observable<CreateAssetDetailAttachmentVM> {
    return this.httpClient.post<any>(`${environment.CreateAssetDetailAttachments}`, attachObj, this.httpHeader);
  }
  GetAttachmentByAssetDetailId(assetId: number): Observable<AssetDetailAttachmentVM[]> {
    return this.httpClient.get<AssetDetailAttachmentVM[]>(`${environment.GetAttachmentByAssetDetailId}${assetId}`, this.httpHeader);
  }
  DeleteAssetDetailAttachmentById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteAssetDetailAttachment}${id}`, this.httpHeader);
  }

  GetLastDocumentForAssetDetailId(assetDetailId: Number): Observable<AssetDetailAttachmentVM> {
    return this.httpClient.get<AssetDetailAttachmentVM>(`${environment.GetLastDocumentForAssetDetailId}${assetDetailId}`, this.httpHeader);
  }


  GetAssets(assetCountParam: FiletrAssetCountParam): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.GetAllAssets}`, assetCountParam, this.httpHeader);
  }

  
  PyramidGovernorateChart(): Observable<CountAssetsVM[]> {
    return this.httpClient.get<CountAssetsVM[]>(`${environment.PyramidGovernorateChart}`,  this.httpHeader);
  }



  PyramidGovernorateChartByParams(assetCountParam: FiletrAssetCountParam): Observable<CountAssetsVM[]> {
    return this.httpClient.post<CountAssetsVM[]>(`${environment.PyramidGovernorateChartByParams}`,assetCountParam,  this.httpHeader);
  }

  PyramidGovernoratePopulationChartByParams(assetCountParam: FiletrAssetCountParam): Observable<CountAssetsVM[]> {
    return this.httpClient.post<CountAssetsVM[]>(`${environment.PyramidGovernoratePopulationChartByParams}`,assetCountParam,  this.httpHeader);
  }
  GetAssetsCountByOrganizationsAndCategories(assetCountParam: FiletrAssetCountParam): Observable<ChartCountOfAssetDetailVM[]> {
    return this.httpClient.post<ChartCountOfAssetDetailVM[]>(`${environment.GetAssetsCountByOrganizationsAndCategories}`,assetCountParam,  this.httpHeader);
  }
  
  GroupAssetDetailsByGovernorate(data: FilterAssetDetail): Observable<BrandGroupVM[]> {
    return this.httpClient.post<BrandGroupVM[]>(`${environment.GroupAssetDetailsByGovernorate}`, data,this.httpHeader)
  }

  GroupAssetDetailsByOrganization(data: FilterAssetDetail): Observable<BrandGroupVM[]> {
    return this.httpClient.post<BrandGroupVM[]>(`${environment.GroupAssetDetailsByOrganization}`, data,this.httpHeader)
  }
  GroupAssetDetailsBySubOrganization(data: FilterAssetDetail): Observable<BrandGroupVM[]> {
    return this.httpClient.post<BrandGroupVM[]>(`${environment.GroupAssetDetailsBySubOrganization}`, data,this.httpHeader)
  }
  GroupAssetDetailsByHospital(data: FilterAssetDetail): Observable<BrandGroupVM[]> {
    return this.httpClient.post<BrandGroupVM[]>(`${environment.GroupAssetDetailsByHospital}`, data,this.httpHeader)
  }
  
  GetAssetDetailsByGovIdAndHospitalIdAndDepartmentId2(departmentId: number, govId: number, hospitalId: number, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.GetHospitalAssetsByGovIdAndDeptIdAndHospitalId2}${departmentId}/${govId}/${hospitalId}/${pageNumber}/${pageSize}`,null, this.httpHeader);
  }
  sortAssetWithoutSearch(sortObj: SortAssetVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.SortAssetsWithoutSearch}${pageNumber}/${pageSize}`, sortObj, this.httpHeader);
  }

  setting(){

    return this.httpClient.get<LoggedUser>(`${environment.setting}`,this.httpHeader);
  }
  DrawingChart():Observable<DrawChart[]>{

    return this.httpClient.get<DrawChart[]>(`${environment.DrawChart}`,this.httpHeader);
  }
  DrawingChartByGov():Observable<DrawChartByGov[]>{

    return this.httpClient.get<DrawChartByGov[]>(`${environment.DrawChartByGov}`,this.httpHeader);
  }
  DrawChartForGovAndPopulation(chart:ChartFilter):Observable<DrawChartForGovAndPopulation[]>{

    return this.httpClient.post<DrawChartForGovAndPopulation[]>(`${environment.DrawChartForGovAndPopulation}`,chart,this.httpHeader);
  }
  SortAssetsafterSearch(sortAndSearchAssetVM:SortAndSearchAssetVM ,pageSize:Number,pageNumber:number):Observable<MainClass>{

    return this.httpClient.post<MainClass>(`${environment.SortAssetsafterSearch}/${pageNumber}/${pageSize}`,sortAndSearchAssetVM,this.httpHeader)
  }
  GetAssetsByAgeGroup(chartFilter:ChartFilter): Observable<HospitalAssetAge[]> {
    return this.httpClient.post<HospitalAssetAge[]>(`${environment.GetAssetsByAgeGroup}`,chartFilter, this.httpHeader);
  }
}
