import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CreateAssetDetailAttachmentVM, CreateAssetDetailVM } from 'src/app/shared/models/assetDetailVM';
import { ListCityVM } from 'src/app/shared/models/cityVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { EditHospitalVM, ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { ListMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';
import { ListSupplierVM } from 'src/app/shared/models/supplierVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { SupplierService } from 'src/app/shared/services/supplierService.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { CreateSupplierComponent } from '../../suppliers/create-supplier/create-supplier.component';
import { AssetCountParam, FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {


  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  assetObj: CreateAssetDetailVM;
  assetId: number;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fname = '';
  abbr: any;
  fileInfos: Observable<any>;
  savedfilesdisplay: boolean = false;
  errorDisplay: boolean = false;
  dateError: boolean = false;
  isSaved: boolean = false;
  display: boolean = false;
  error: any = { isError: false, errorMessage: '' };
  errorMessage: string = "";
  hospitalss: EditHospitalVM;
  isValidDate: any;
  isValidDate2: any;
  lstMasterAssets: ListMasterAssetVM[] = [];
  masterAssetObj: ListMasterAssetVM;
  lstHospitals: ListHospitalVM[] = [];
  lstGovernorates: ListGovernorateVM[];
  lstCities: ListCityVM[];
  lstOrganizations: ListOrganizationVM[];
  lstSubOrganizations: ListSubOrganizationVM[];
  lstSuppliers: ListSupplierVM[] = [];
  assetDetailDocument: CreateAssetDetailAttachmentVM;
  lstAssetDetailDocument: CreateAssetDetailAttachmentVM[] = [];
  selectedGovernorateId: number;
  selectedCityId: number;
  selectedDepartmentId: number;
  today = new Date();
  isDisabled: boolean = false;
  hospitalAssetObj: any;
  selectedAssetStatusId: number;
  isGov: boolean = false;
  isCity: boolean = false;
  isOrg: boolean = false;
  isSubOrg: boolean = false;
  isHospital: boolean = false;
  masterAssetId: number;
  assetCountParam: FiletrAssetCountParam;
  isAdmin: boolean = false;
  isHospitalManager: boolean = false;
  canAddSupplier: boolean = false;
  canAddDepartment: boolean = false;
  lstRoleNames: string[] = [];


  fileToUpload: File;
  uploadFileName: string;
  itmIndex: any[] = [];
  formData = new FormData();

  constructor(
    private authenticationService: AuthenticationService, private assetDetailService: AssetDetailService, private masterAssetService: MasterAssetService,
    private supplierService: SupplierService, private uploadService: UploadFilesService, private ref: DynamicDialogRef,
    private messageService: MessageService,
    private datePipe: DatePipe, private config: DynamicDialogConfig,
    private route: Router, private hospitalService: HospitalService, private dialogService: DialogService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {


    this.hospitalss = {
      governorateName: '', governorateId: 0, id: 0, code: '', name: '', nameAr: '', mobile: '', email: '', address: '', addressAr: '', managerName: '', managerNameAr: '', latitude: 0, longtitude: 0,
      cityId: 0, subOrganizationId: 0, organizationId: 0, departments: [], enableDisableDepartments: [], contractName: '', contractStart: new Date(), contractEnd: new Date(), strContractStart: '', strContractEnd: '',
      governorateNameAr: '', cityName: '', cityNameAr: '', orgName: '', orgNameAr: '', subOrgName: '', subOrgNameAr: '',
    }

    this.assetObj = { createdBy: '', assetConditionId: 0, assetStatusId: 0, barcode: '', cityId: 0, code: '', costCenter: '', departmentId: 0, depreciationRate: 0, governorateId: 0, hospitalId: 0, listOwners: [], masterAssetId: 0, organizationId: 0, poNumber: '', price: 0, purchaseDate: '', remarks: '', serialNumber: '', subOrganizationId: 0, warrantyExpires: '', buildingId: 0, floorId: 0, installationDate: '', operationDate: '', receivingDate: '', roomId: 0, supplierId: 0, warrantyEnd: '', warrantyStart: '' }


    this.onLoad();
  }
  onLoad() {
    this.assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };

    this.assetObj = {
      assetConditionId: 0, assetStatusId: 0, createdBy: '',
      barcode: '', code: '', departmentId: 0, hospitalId: 0, installationDate: '', costCenter: '', depreciationRate: 0,
      masterAssetId: 0, price: 0, purchaseDate: '', remarks: '', serialNumber: '', supplierId: null, warrantyExpires: '',
      warrantyStart: '', warrantyEnd: '', buildingId: null, floorId: null, roomId: null, operationDate: '', poNumber: '', receivingDate: '',
      listOwners: [], cityId: 0, governorateId: 0, organizationId: 0, subOrganizationId: 0
    }

    this.assetCountParam =  { name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
    this.hospitalService.GetHospitals(this.assetCountParam).subscribe(hosts => {
      this.lstHospitals = hosts.results;
    });
    this.supplierService.GetSuppliers().subscribe(items => {
      this.lstSuppliers = items;
    });


    this.assetDetailService.GenerateAssetDetailBarcode().subscribe(code => {
      this.assetObj.barcode = code["barCode"];
      this.assetObj.code = code["barCode"];
    });
  }




  // getLastWarrantyDate(value) {
  //   var date = new Date(this.assetObj.warrantyStart.toString());
  //   date.setMonth(date.getMonth() + Number(value));
  //   var endDate = date.toISOString().slice(0, 10);
  //   this.assetObj.warrantyEnd = endDate;
  // }
  // getSubOrgByOrgId($event) {
  //   this.subOrganizationService.GetSubOrganizationByOrgId($event.target.value).subscribe(suborgs => {
  //     this.lstSubOrganizations = suborgs;
  //   });
  // }
  // getCitiesByGovId($event) {
  //   this.cityService.GetCitiesByGovernorateId($event.target.value).subscribe(cities => {
  //     this.lstCities = cities;
  //   });
  // }
  // getHospitalsBySubOrgId($event) {
  //   this.hospitalService.GetHospitalsBySubOrganizationId($event.target.value).subscribe(hospitals => {
  //     this.lstHospitals = hospitals;
  //   });

  onSubmit(): any {
    this.assetObj.governorateId = this.selectedGovernorateId;
    this.assetObj.cityId = this.selectedCityId;
    this.assetObj.assetStatusId = this.selectedAssetStatusId;

    let today = this.datePipe.transform(this.today, "yyyy-MM-dd");
    if (this.assetObj.warrantyEnd != "" && this.assetObj.warrantyStart != "") {
      let end = this.datePipe.transform(this.assetObj.warrantyEnd, "yyyy-MM-dd");
      let start = this.datePipe.transform(this.assetObj.warrantyStart, "yyyy-MM-dd");


    }
    if (this.assetObj.installationDate != "" && this.assetObj.purchaseDate == "") {
      let installDate = this.datePipe.transform(this.assetObj.installationDate, "yyyy-MM-dd");
      if (installDate != null) {
        this.isValidDate = this.validateIntallationDates(installDate, today);
        if (!this.isValidDate) {
          this.dateError = true;
          return false;
        }
      }
    }
    if (this.assetObj.purchaseDate != "" && this.assetObj.installationDate == "") {
      let purchaseDate = this.datePipe.transform(this.assetObj.purchaseDate, "yyyy-MM-dd");
      this.isValidDate2 = this.validatePurchaseDates(purchaseDate, today);
      if (!this.isValidDate2) {
        this.dateError = true;
        return false;
      }
    }
    else if (this.assetObj.purchaseDate != "" && this.assetObj.installationDate != "") {
      let purchase = this.datePipe.transform(this.assetObj.purchaseDate, "yyyy-MM-dd");
      let install = this.datePipe.transform(this.assetObj.installationDate, "yyyy-MM-dd");
      this.isValidDate = this.validatePurchaseInstallDates(purchase, install);
      if (!this.isValidDate) {
        this.dateError = true;
        return false;
      }
    }


    if (this.assetObj.code == "" || this.assetObj.code == null) {
      this.errorDisplay = true;
      this.errorMessage = "Please insert code";
      return false;
    }

    if (this.assetObj.masterAssetId == 0) {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "Please select asset";
      }
      else {
        this.errorMessage = "من فضلك اختر أصل";
      }
      return false;
    }

    if (this.assetObj.hospitalId == 0) {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "Please select hospital";
      }
      else {
        this.errorMessage = "من فضلك اختر مستشفى";
      }
      return false;
    }




    this.assetDetailService.CreateAsset(this.assetObj).subscribe(assetObj => {
      this.assetId = assetObj;
      if (this.lstAssetDetailDocument.length > 0) {
        this.lstAssetDetailDocument.forEach((elemnt, index) => {
          elemnt.hospitalId = this.assetObj.hospitalId;
          elemnt.assetDetailId = this.assetId;
          this.assetDetailService.CreateAssetDetailAttachments(elemnt).subscribe(lstfiles => {
            this.uploadService.uploadAssetDetailFiles(elemnt.assetFile, elemnt.fileName).subscribe(
              (event) => {
                this.display = true;
       
           
                this.lstAssetDetailDocument = [];
               
              },
              (err) => {
                if (this.lang == "en") {
                  this.errorDisplay = true;
                  console.log(this.errorDisplay);
                  this.errorMessage = 'Could not upload the file:' + elemnt[index].fileName;
                }
                else {
                  this.errorDisplay = true;
                  this.errorMessage = 'لا يمكن رفع ملف ' + elemnt[index].fileName;
                }
              });
          });
        });

      }
      else {
        this.display = true;

        this.lstAssetDetailDocument = [];
        
    
      
        
      }
      // });
    },
      error => {
        this.errorDisplay = true;
        console.log(this.errorDisplay);
        if (this.lang == 'en') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.message;
          }
        } else {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.messageAr;
          }
        }
        return false;
      }
    );
  }

  validateIntallationDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      if (this.lang == "en") {
        this.error = { isError: true, errorMessage: 'Install date should be less than today date.' };
      }
      else {
        this.error = { isError: true, errorMessage: 'تاريخ إعداد الجهاز لابد أن يكون أقل من تاريخ اليوم' };
      }
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  validatePurchaseInstallDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      if (this.lang == "en") {
        this.error = { isError: true, errorMessage: 'Purchase date should be less than install date.' };
      }
      else {
        this.error = { isError: true, errorMessage: 'تاريخ شراء الجهاز لابد أن يكون قبل  تاريخ الإعداد' };
      }
      this.isValidDate = false;
    }
    return this.isValidDate;
  }


  validatePurchaseDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      if (this.lang == "en") {
        this.error = { isError: true, errorMessage: 'Purchase date should be less than today date.' };
      }
      else {
        this.error = { isError: true, errorMessage: 'تاريخ شراء الجهاز لابد أن يكون قبل  تاريخ اليوم' };
      }

      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  uploadFile = (files) => {
  
    let fileToUpload = <File>files[0];
    console.log(files[0]);
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.assetDetailDocument.fileName = fileToUpload.name;
    this.assetDetailDocument.assetFile = fileToUpload;

    this.addFileToList();


  }
  addFileToList(): any {
   
    

      console.log(this.lstAssetDetailDocument);
   
      // let ext = this.assetDetailDocument.fileName.split('.').pop();
     
     
          if (this.itmIndex.length === 0) {
            last_element = 1;
          }
          else if (this.itmIndex.length > 0) {
            var last_element = this.itmIndex[this.itmIndex.length - 1];
            last_element = last_element + 1;
          }
          this.itmIndex.push(last_element);
          // var hCode = this.pad(this.currentUser.hospitalCode, 4);
          // var srCode = this.pad(this.assetObj.barcode, 10);
          // var last = this.itmIndex[this.itmIndex.length - 1];
          // let newIndex = this.pad((last).toString(), 2);
          // let HospitalAssetFileName = hCode + "HA" + srCode + newIndex;
          // this.assetDetailDocument.fileName = HospitalAssetFileName + "." + ext;
          this.lstAssetDetailDocument.push(this.assetDetailDocument);
         
          this.assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };
        
      
    
    

         

         
        
      
 
  }
  removeFileFromObjectArray(doc) {
    const index: number = this.lstAssetDetailDocument.indexOf(doc);
    if (index !== -1) {
      this.lstAssetDetailDocument.splice(index, 1);
    }
  }
  pad(num: string, size: number): string {
    while (num.length < size) num = "0" + num;
    return num;
  }
  onDialogClose(){
    this.reload();
    this.ref.close();

  }
  onSelectionChanged(event) {
    this.masterAssetService.AutoCompleteMasterAssetName(event.query).subscribe(masters => {
      this.lstMasterAssets = masters;
      if (this.lang == "en") {
        this.lstMasterAssets.forEach(item => item.name = item.name + " - " + item.model + " - " + item.brandName);
      }
      else {
        this.lstMasterAssets.forEach(item => item.name = item.nameAr + " - " + item.model + " - " + item.brandNameAr);
      }

    });

  }
  getObject(event) {
    this.assetObj.masterAssetId = event["id"];
  }

  addSupplier() {
    const dialogRef2 = this.dialogService.open(CreateSupplierComponent, {
      // header: this.lang == "en" ? 'Add New Brand' : "بيان إضافة ماركة جديدة",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.lstSuppliers = [];
      this.supplierService.GetSuppliers().subscribe(suppliers => {
        this.lstSuppliers = suppliers;
        this.assetObj.supplierId = res;
      });
    });
  }
  getHospitalObj($event) {
    this.assetObj.hospitalId = $event["id"];
    this.hospitalService.GetHospitalById($event.id).subscribe(item => {
      this.hospitalss = item;
      console.log(item);
    });
  }


  onSelectionChanged1(event) {

    this.hospitalService.AutoCompleteHospitalName(event.query).subscribe(masters => {
      this.lstHospitals = masters;
      if (this.lang == "en") {
        this.lstHospitals.forEach(item => item.name = item.name);
      }
      else {
        this.lstHospitals.forEach(item => item.name = item.nameAr);
      }
    });
  }


  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }

}
