import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBrandVM, EditBrandVM, ListBrandVM } from '../models/brandVM';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  GetBrands(): Observable<ListBrandVM[]> {
    return this.httpClient.get<ListBrandVM[]>(`${environment.ListBrands}`, this.httpHeader);
  }



  // sortBrands(pagenumber: number, pagesize: number, sortObj: SortBrandVM): Observable<ListBrandVM[]> {
  //   return this.httpClient.post<ListBrandVM[]>(`${environment.SortBrands}${pagenumber}/${pagesize}`, sortObj, this.httpHeader);
  // }





  GetBrandById(id: number): Observable<EditBrandVM> {
    return this.httpClient.get<EditBrandVM>(`${environment.GetBrandById}${id}`, this.httpHeader);
  }
  CreateBrand(BrandVM: CreateBrandVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.AddBrand}`, BrandVM, this.httpHeader);
  }


  UpdateBrand(BrandObj: EditBrandVM): Observable<EditBrandVM> {
    return this.httpClient.put<EditBrandVM>(`${environment.UpdateBrand}`, BrandObj, this.httpHeader);
  }

  DeleteBrand(id: number): Observable<EditBrandVM> {
    return this.httpClient.delete<EditBrandVM>(`${environment.DeleteBrand}${id}`, this.httpHeader);
  }


  // GenerateBrandCode(): Observable<GenerateBrandCode> {
  //   return this.httpClient.get<GenerateBrandCode>(`${environment.GenerateBrandCode}`, this.httpHeader);
  // }
}
