import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem("userToken");
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };
  uploadMasterAssetImage(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const req = new HttpRequest('POST', `${environment.Domain}api/MasterAsset/UploadMasterAssetImage`, formData, {
      headers:httpHeader,
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadMasterAssetFiles(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const req = new HttpRequest('POST', `${environment.Domain}api/MasterAsset/UploadMasterAssetFiles`, formData, {
      headers:httpHeader,
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadAssetDetailFiles(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const req = new HttpRequest('POST', `${environment.Domain}api/AssetDetails/UploadAssetDetailFiles`, formData, {
      headers:httpHeader,
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  
  uploadSupplierFile(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const req = new HttpRequest('POST', `${environment.Domain}api/Supplier/UploadSupplierFile`, formData, {
      headers:httpHeader,
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.Domain}UploadedAttachments/MasterAssets`,this.httpHeader);
  }
  downloadMasterAssetFile(fileName): any {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${environment.Domain}UploadedAttachments/MasterAssets/${fileName}`, { headers:httpHeader,responseType: 'blob' });
  }

  downloadAssetDetailFile(fileName): any {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${environment.Domain}UploadedAttachments/AssetDetails/${fileName}`, { headers:httpHeader, responseType: 'blob' });
  }

  downloadSupplierFile(fileName): any {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${environment.Domain}UploadedAttachments/SupplierAttachments/${fileName}`, {  headers:httpHeader,responseType: 'blob' });
  }
}