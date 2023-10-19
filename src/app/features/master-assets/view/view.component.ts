import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import {  MasterAssetAttachmentVM, ViewMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { environment } from 'src/environments/environment';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  currentUser: LoggedUser;
  public lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  masterAssetObj: ViewMasterAssetVM;
  lstAttachment: MasterAssetAttachmentVM[] = [];
  imgURL: string = "";


  constructor(
    private authenticationService: AuthenticationService,
    private masterAssetService: MasterAssetService,
    private config: DynamicDialogConfig, private activeRoute: ActivatedRoute,
    private uploadService: UploadFilesService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }

    this.masterAssetObj = {
      id: 0, code: '', name: '', nameAr: '', description: '', descriptionAr: '', expectedLifeTime: 0, modelNumber: '', versionNumber: '', ecriId: 0, ecriName: '', ecriNameAr: '', periorityId: 0, periorityName: '', periorityNameAr: '',
      originId: 0, originName: '', originNameAr: '', brandId: 0, brandName: '', brandNameAr: '', categoryId: 0, categoryName: '', categoryNameAr: '', subCategoryId: 0, subCategoryName: '', subCategoryNameAr: '',
      length: 0, height: 0, width: 0, weight: 0, title: '', power: '', voltage: '', ampair: '', frequency: '', electricRequirement: '', assetImg: ''
    }



    let id = this.config.data.id;
    //let id = this.activeRoute.snapshot.params['id'];

    this.masterAssetService.ViewMasterAssetById(id).subscribe((data) => {
      this.masterAssetObj = data;
console.log(this.masterAssetObj);
      if (this.masterAssetObj.assetImg == null) {
        this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/UnknownAsset.png`;
      }
      else if (this.masterAssetObj.assetImg == "") {
        this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/UnknownAsset.png`;
      }
      else {
        this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/` + data["assetImg"];
      }



      this.masterAssetService.GetAttachmentByMasterAssetId(this.masterAssetObj.id).subscribe((files) => {
        this.lstAttachment = files;
      }, (error) => console.log(error));


     
    });
  }

  downloadFile(fileName) {
    var filePath = `${environment.Domain}UploadedAttachments/`;
    this.uploadService.downloadMasterAssetFile(fileName).subscribe((file) => {
      var dwnldFile = filePath + 'MasterAssets/' + fileName;
      if (fileName != '' || fileName != null) window.open(dwnldFile);
    });
  }



}
