import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AssetDetailAttachmentVM, ViewAssetDetailVM } from 'src/app/shared/models/assetDetailVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { DatePipe } from '@angular/common';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  assetObj: ViewAssetDetailVM;
  public assetName: string = "";
  public hospitalName: string = "";
  lstAttachment: AssetDetailAttachmentVM[] = [];
  imgURL: string = "";

  public width = 80;
  constructor(private uploadService: UploadFilesService, private datePipe: DatePipe, private assetDetailService: AssetDetailService, private config: DynamicDialogConfig, private authenticationService: AuthenticationService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }

    this.assetObj = {
      governorateNameAr: '', cityNameAr: '', orgNameAr: '', subOrgNameAr: '', contractDate: '', contractEndDate: '', contractStartDate: '', categoryNameAr: '', periorityName: '', periorityNameAr: '', remainWarrantyExpires: '', remainWarrantyExpiresAr: '', warrantyExpiresAr: '', buildId: 0, roomId: 0, floorId: 0, masterAssetId: 0,
      hospitalId: 0, id: 0, assetImg: '', code: '', masterCode: '', purchaseDate: '', price: '', serialNumber: '', remarks: '', barCode: '', installationDate: '', warrantyExpires: '', room: '',
      floor: '', assetName: '', assetNameAr: '', supplierName: '', brandName: '', brandNameAr: '', hospitalName: '', originName: '', originNameAr: '', categoryName: '', subCategoryName: '', governorateName: '', cityName: '', orgName: '', subOrgName: '', length: '', height: '', width: '', weight: '', modelNumber: '',
      versionNumber: '', description: '', descriptionAr: '', costCenter: '', depreciationRate: '', expectedLifeTime: '', warrantyEnd: '', warrantyStart: '', departmentName: '', departmentNameAr: '', hospitalNameAr: '', supplierNameAr: '', buildName: '', receivingDate: '', operationDate: '', poNumber: '', buildNameAr: '', floorName: '', floorNameAr: '', roomName: '', roomNameAr: ''
      , assetStatusAr: '', assetStatus: '', qrFilePath: '', createdBy: ''
    }

    let id = this.config.data.id;

    this.assetDetailService.ViewAssetById(id).subscribe(
      data => {
      
        this.assetObj = data;
        if(this.lang=='en'){
          if (this.assetObj.purchaseDate) {
            this.assetObj.purchaseDate = this.convertArabicDateToEnglishFormat(this.assetObj.purchaseDate);
          }
          if (this.assetObj.installationDate) {
            this.assetObj.installationDate = this.convertArabicDateToEnglishFormat(this.assetObj.installationDate);
          }
        }
       
        else{
          if (this.assetObj.purchaseDate != "") {
            let splitPurchaseDate = this.datePipe.transform(this.assetObj.purchaseDate, "MM/dd/yyyy").split('/');
            let pmonth = splitPurchaseDate[0];
            let pday = splitPurchaseDate[1];
            let pyear = splitPurchaseDate[2];
            let newPurchaseDate = Number(pyear).toLocaleString("ar-SA", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: false }) + "/" + Number(pmonth).toLocaleString("ar-SA") + "/" + Number(pday).toLocaleString("ar-SA");
            this.assetObj.purchaseDate = newPurchaseDate;
          }
          if (this.assetObj.installationDate != "") {
            let splitInstallDate = this.assetObj.installationDate.split('/');
            let inmonth = splitInstallDate[0];
            let inday = splitInstallDate[1];
            let inyear = splitInstallDate[2];
            let newInstallDate = Number(inyear).toLocaleString("ar-SA", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: false }) + "/" + Number(inmonth).toLocaleString("ar-SA") + "/" + Number(inday).toLocaleString("ar-SA");
            
            this.assetObj.installationDate = newInstallDate;
            console.log(newInstallDate);
          }
        }


        this.assetName = this.assetObj["assetName"];

        if (this.lang == "en")
          this.hospitalName = this.assetObj["hospitalName"];
        else
          this.hospitalName = this.assetObj["hospitalNameAr"];


        if (data["assetImg"] == "" || data["assetImg"] == null) {
          this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/UnknownAsset.png`;
        }
        else {
          this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/` + data["assetImg"];
        }
      });

    this.assetDetailService.GetAttachmentByAssetDetailId(id).subscribe(
      (files => {
        this.lstAttachment = files;
      }), (error => console.log(error)));
  }
  convertArabicDateToEnglishFormat(arabicDate: string): string {
    // Replace Arabic numerals with English numerals
    const englishDateStr = arabicDate.replace(/[٠-٩]/g, (match) => {
      return String.fromCharCode(match.charCodeAt(0) - 1632);
    });
  
    // Create a Date object from the formatted string
    const date = new Date(englishDateStr);
  
    // Format the date as needed (e.g., 'MM/dd/yyyy')
    const formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
    
    return formattedDate;
  }
}
