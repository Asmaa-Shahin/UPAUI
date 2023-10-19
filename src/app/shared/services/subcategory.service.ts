import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSubCategoryVM, EditSubCategoryVM, ListSubCategoryVM } from '../models/subCategoryVM';
import { Paging } from '../models/paging';


@Injectable({
  providedIn: 'root'
})

export class SubCategoryService {
  token = localStorage.getItem("userToken");
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };
  constructor(private httpClient: HttpClient) { }

 

  GetSubCategories(): Observable<ListSubCategoryVM[]> {
    return this.httpClient.get<ListSubCategoryVM[]>(`${environment.ListSubCategories}`, this.httpHeader);
  }


  GetSubCategoriesByCategoryId(categoryId): Observable<ListSubCategoryVM[]> {
    return this.httpClient.get<ListSubCategoryVM[]>(`${environment.GetSubCategoryByCategoryId}${categoryId}`, this.httpHeader);
  }

  GetSubCategoryById(id: number): Observable<EditSubCategoryVM> {
    return this.httpClient.get<EditSubCategoryVM>(`${environment.GetSubCategoryById}${id}`, this.httpHeader);
  }
  CreateSubCategory(subCatgoryVM: CreateSubCategoryVM): Observable<CreateSubCategoryVM> {
    return this.httpClient.post<any>(`${environment.AddSubCategory}`, subCatgoryVM, this.httpHeader);
  }


  UpdateSubCategory(SubCategoryObj: EditSubCategoryVM): Observable<EditSubCategoryVM> {
    return this.httpClient.put<EditSubCategoryVM>(`${environment.UpdateSubCategory}`, SubCategoryObj, this.httpHeader);
  }

  DeleteSubCategory(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteSubCategory}${id}`, this.httpHeader);
  }

  GenerateSubCategoryCode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.GenerateSubCategoryCode}`, this.httpHeader);
  }

}
