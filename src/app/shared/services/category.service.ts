import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCategoryVM, EditCategoryVM, ListCategoryVM } from '../models/categoryVM';
import { Paging } from '../models/paging';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  token = localStorage.getItem("userToken");
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };
  

  GetCategories(): Observable<ListCategoryVM[]> {
    return this.httpClient.get<ListCategoryVM[]>(`${environment.ListCategories}`, this.httpHeader);
  }

  GetCategoryByCategoryTypeId(typeId: number): Observable<ListCategoryVM[]> {
    return this.httpClient.get<ListCategoryVM[]>(`${environment.GetCategoryByCategoryTypeId}${typeId}`, this.httpHeader);
  }


  GetCategoryById(id: number): Observable<EditCategoryVM> {
    return this.httpClient.get<EditCategoryVM>(`${environment.GetCategoryById}${id}`, this.httpHeader);
  }
  CreateCategory(categoryVM: CreateCategoryVM): Observable<CreateCategoryVM> {
    return this.httpClient.post<CreateCategoryVM>(`${environment.AddCategory}`, categoryVM, this.httpHeader);
  }


  UpdateCategory(CategoryObj: EditCategoryVM): Observable<EditCategoryVM> {
    return this.httpClient.put<EditCategoryVM>(`${environment.UpdateCategory}`, CategoryObj, this.httpHeader);
  }

  DeleteCategory(id: number): Observable<EditCategoryVM> {
    return this.httpClient.delete<EditCategoryVM>(`${environment.DeleteCategory}${id}`, this.httpHeader);
  }


    

  GenerateCategoryCode(): Observable<any> {
    return this.httpClient.get<any>(`${environment.GenerateCategoryCode}`, this.httpHeader);
  }

}
