import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AssetDetailAttachmentVM,  CreateAssetDetailAttachmentVM, EditAssetDetailVM } from 'src/app/shared/models/assetDetailVM';
import { EditHospitalVM, ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { ListMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { ListSupplierVM } from 'src/app/shared/models/supplierVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { SupplierService } from 'src/app/shared/services/supplierService.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListCityVM } from 'src/app/shared/models/cityVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { AutoComplete } from 'primeng/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSupplierComponent } from '../../suppliers/create-supplier/create-supplier.component';
import { Paging } from 'src/app/shared/models/paging';
import { AssetCountParam, FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  assetObj: EditAssetDetailVM;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fname = '';
  abbr: any;
  fileInfos: Observable<any>;
  savedfilesdisplay: boolean = false;
  dateError: boolean = false;
  display: boolean = false;
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;
  lstMasterAssets: ListMasterAssetVM[] = [];
  masterAssetObj: any;
  hospitalAssetObj: any;
  lstHospitals: ListHospitalVM[] = [];
  hospitalss: EditHospitalVM;
  lstSuppliers: ListSupplierVM[] = [];
  lstAttachment: AssetDetailAttachmentVM[] = [];
  lstGovernorates: ListGovernorateVM[];
  lstCities: ListCityVM[];
  lstOrganizations: ListOrganizationVM[];
  lstSubOrganizations: ListSubOrganizationVM[];
  assetDetailDocument: CreateAssetDetailAttachmentVM
  lstAssetDetailDocument: CreateAssetDetailAttachmentVM[] = [];
  lstAssetDetailDocumentToAdd: CreateAssetDetailAttachmentVM[] = [];
  selectedEmployees: number[] = [];
  errorMessage: string;
  errorDisplay: boolean = false;
  loading: boolean = true;
  assetId: number;
  selectedHospitalId: number;
  purchaseDateStr: string = "";
  installDateStr: string = "";
  WarrantyDateStr: string = "";
  WarrantyEndDateStr: string = "";
  today = new Date();
  isDisabled: boolean = false;

  listOwners: number[];

  isAdmin: boolean = false;
  isHospitalManager: boolean = false;
  isAssetOwner: boolean = false;
  isEngManager: boolean = false;
  lstRoleNames: string[] = [];

  isGov: boolean = false;
  isCity: boolean = false;
  isOrg: boolean = false;
  isSubOrg: boolean = false;
  isHospital: boolean = false;
  canAddSupplier: boolean = false;
  canAddDepartment: boolean = false;
  page: Paging;
  count: number;

  startDateTime: Date;
  startStamp: number;
  newDate: Date = new Date();
  newStamp = this.newDate.getTime();
  timer;
  sortStatus: string = "ascending";
  uploadFileName: string;
  fileToUpload: File;
  selectedAssetStatusId: number = 0;

  formData = new FormData();
  itmIndex: any[] = [];
  selectedValue = null;
  imgURL: string = "";
   //assetcountparam2: AssetCountParam;
 assetcountparam: FiletrAssetCountParam;
  selectedPage: Paging;
  pageNumber: number;
  pageSize: number;
  incremant: number = 0;
  @ViewChild('autoItems', { static: false }) public autoItems: AutoComplete;

  constructor(private authenticationService: AuthenticationService, private dialogService: DialogService,
    private assetDetailService: AssetDetailService, private masterAssetService: MasterAssetService, private supplierService: SupplierService, private uploadService: UploadFilesService,
    private datePipe: DatePipe,
    private config: DynamicDialogConfig, private ref: DynamicDialogRef, private confirmationService: ConfirmationService, private route: Router,
    private organizationService: OrganizationService, private subOrganizationService: SubOrganizationService, private cityService: CityService, private governorateService: GovernorateService,
    private messageService: MessageService,
    private hospitalService: HospitalService, private activeRoute: ActivatedRoute) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {

    this.assetObj = { hospitalNameAr: '', createdBy: '', hospitalName: '', id: 0, assetStatusId: 0, barcode: '', cityId: 0, code: '', costCenter: '', departmentId: 0, 
     governorateId: 0, hospitalId: 0, masterAssetId: 0, organizationId: 0, poNumber: '', price: 0, purchaseDate: '', remarks: '', serialNumber: '', subOrganizationId: 0, warrantyExpires: '', buildingId: 0, floorId: 0, installationDate: '',  roomId: 0, supplierId: 0,  assetName: '', assetNameAr: '', qrFilePath: '' }
    this.hospitalss = {
      governorateName: '', governorateId: 0, id: 0, code: '', name: '', nameAr: '', mobile: '', email: '', address: '', addressAr: '', managerName: '', managerNameAr: '', latitude: 0, longtitude: 0,
      cityId: 0, subOrganizationId: 0, organizationId: 0, departments: [],
      enableDisableDepartments: [], contractName: '', contractStart: new Date(), contractEnd: new Date(), strContractStart: '', strContractEnd: '',
      governorateNameAr: '', cityName: '', cityNameAr: '', orgName: '', orgNameAr: '', subOrgName: '', subOrgNameAr: '',
    }

    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    this.initPage();

    this.governorateService.GetGovernorates().subscribe(items => {
      this.lstGovernorates = items;
    });

    this.organizationService.GetOrganizations().subscribe(items => {
      this.lstOrganizations = items;
    });

     let id = this.config.data.id;
   // let id = this.activeRoute.snapshot.params['id'];
    this.assetId = id;
    this.assetDetailService.GetAssetById(this.assetId).subscribe(
      data => {

        this.assetObj = data;
        this.masterAssetService.GetMasterAssetById(data["masterAssetId"]).subscribe(masterObj => {
          this.masterAssetObj = masterObj;
          if (this.lang == "en") {
            this.masterAssetObj.name = masterObj.name + " - " + masterObj.model + " - " + masterObj.brandName;
          } else {
            this.masterAssetObj.name = masterObj.nameAr + " - " + masterObj.model + " - " + masterObj.brandNameAr;
          }
        });


        this.hospitalService.GetHospitalByAssetId(this.assetObj.id).subscribe(hospitalObj => {
          this.hospitalAssetObj = hospitalObj;
          if (this.lang == "en") {
            this.hospitalAssetObj.name = hospitalObj.name;
          } else {
            this.hospitalAssetObj.name = hospitalObj.nameAr;
          }

          this.assetObj.hospitalId = hospitalObj.id;

        });
        this.hospitalService.GetHospitalById(this.assetObj.hospitalId).subscribe(item => {
          this.hospitalss = item;
        });

        this.assetObj.installationDate = this.datePipe.transform(this.assetObj.installationDate, "MM/dd/yyyy");
        this.assetObj.purchaseDate = this.datePipe.transform(this.assetObj.purchaseDate, "MM/dd/yyyy");
    
        if (data["assetImg"] == "" || data["assetImg"] == null) {
          this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/UnknownAsset.png`;
        }
        else {
          this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/` + data["assetImg"];
        }

        this.assetDetailService.GetAttachmentByAssetDetailId(this.assetObj.id).subscribe(
          (files => {
            this.lstAttachment = files;
            console.log(files);
          }), (error => console.log(error)));


      });



  }
 
  initPage() {
    this.assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };

    this.assetObj = {
      hospitalNameAr: '', hospitalName: '', id: 0, assetName: '', assetNameAr: '', qrFilePath: '', assetStatusId: 0, createdBy: '',
      barcode: '', code: '', departmentId: 0, hospitalId: 0, installationDate: '', masterAssetId: 0, price: 0,
      purchaseDate: '', remarks: '', serialNumber: '', supplierId: 0, warrantyExpires: '', poNumber: '',  roomId: 0, floorId: 0, buildingId: 0,
      cityId: 0, governorateId: 0, organizationId: 0, subOrganizationId: 0, costCenter: ''
    }
    this.supplierService.GetSuppliers().subscribe(suppliers => {
      this.lstSuppliers = suppliers
    });
    this.assetcountparam =  {name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
//this.assetcountparam2 =  { pageIndex: 1, pageSize: 10, brandId: 0, isPagingEnabled: true, search: '', sort: '', skip: 0, take: 10, typeId: 0, govId: [], orgId: [], categoryId: [], count: [], sortStatus: 'descending' }


    this.masterAssetService.ListMasterAssets(this.assetcountparam).subscribe(masters => {
      this.lstMasterAssets = masters.results;
      if (this.lang == "en") {
        this.lstMasterAssets.forEach(item => item.name = item.name + " - " + item.model + " - " + item.brandName);
      }
      else {
        this.lstMasterAssets.forEach(item => item.name = item.nameAr + " - " + item.model + " - " + item.brandNameAr);
      }
    });



    this.hospitalService.GetHospitals(this.assetcountparam).subscribe(hosts => {
      this.lstHospitals = hosts.results;
    });




  }
  getSubOrgByOrgId($event) {
    this.subOrganizationService.GetSubOrganizationByOrgId($event.target.value).subscribe(suborgs => {
      this.lstSubOrganizations = suborgs;
    });
  }
  getCitiesByGovId($event) {
    this.cityService.GetCitiesByGovernorateId($event.target.value).subscribe(cities => {
      this.lstCities = cities;
    });
  }
  getHospitalsBySubOrgId($event) {
    this.hospitalService.GetHospitalsBySubOrganizationId($event.target.value).subscribe(hospitals => {
      this.lstHospitals = hospitals;
    });
  }

  changeInstallationDate(event: MatDatepickerInputEvent<Date>) {
    this.assetObj.installationDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
  }
  changePurchaseDate(event: MatDatepickerInputEvent<Date>) {
    this.assetObj.purchaseDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
  }
 
  onSubmit(): any {

    this.assetObj.installationDate = this.datePipe.transform(this.assetObj.installationDate, "yyyy-MM-dd");
    this.assetObj.purchaseDate = this.datePipe.transform(this.assetObj.purchaseDate, "yyyy-MM-dd");
    this.assetObj.hospitalId = this.hospitalAssetObj.id;
    console.log(this.assetObj.hospitalId);
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

    if (this.assetObj.hospitalId == undefined) {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "Please select hospital";
      }
      else {
        this.errorMessage = "من فضلك اختر مستشفى";
      }
      return false;
    }
    this.assetDetailService.UpdateAsset(this.assetObj).subscribe(savedId => {
      if (this.lstAssetDetailDocument.length > 0) {
        this.lstAssetDetailDocument.forEach((elemnt, index) => {

          elemnt.assetDetailId = this.assetObj.id;
          elemnt.hospitalId = this.assetObj.hospitalId;
          this.assetDetailService.CreateAssetDetailAttachments(elemnt).subscribe(lstfiles => {
            this.uploadService.uploadAssetDetailFiles(elemnt.assetFile, elemnt.fileName).subscribe(
              (event) => {
                this.display = true;
              },
              (err) => {
                if (this.lang == "en") {
                  this.errorDisplay = true;
                  this.errorMessage = 'Could not upload the file:' + elemnt[index].fileName;
                }
                else {
                  this.errorDisplay = true;
                  this.errorMessage = 'لا يمكن رفع ملف ' + elemnt[index].fileName;
                }
              });
          });
        });

        this.display = true;
        this.lstAssetDetailDocument = [];
 
      }
      else {
        this.display = true;
      
      }
    }, error => {
      this.errorDisplay = true;
      console.log("err",error)
      // if (this.lang == "en") {
      //   if (error.error.status == 'code') {
      //     this.errorMessage = error.error.message;
      //   }
      //   if (error.error.status == 'serial') {
      //     this.errorMessage = error.error.message;
      //   }
      // }
      // else {
      //   if (error.error.status == 'code') {
      //     this.errorMessage = error.error.messageAr;
      //   }
      //   if (error.error.status == 'serial') {
      //     this.errorMessage = error.error.messageAr;
      //   }
      // }
      return false;
    }
    );
  }
 
  close() {
    this.page.pagenumber = this.pageNumber;
    this.page.pagesize = this.pageSize;
    this.ref.close(this.page);
  }
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
  onDialogClose(){
 
    this.ref.close();

  }
  validateWarrantyDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      if (this.lang == "en") {
        this.error = { isError: true, errorMessage: 'Warranty start date should be less than warranty end date.' };
      }
      else {
        this.error = { isError: true, errorMessage: ' تاريخ البداية لابد أن يكون قبل تاريخ الضمان' };
      }
      this.isValidDate = false;
    }
    return this.isValidDate;
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
  DeleteFile(id: number) {
    if (this.lang == 'en') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this file?',
        header: 'Delete Item Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.assetDetailService.DeleteAssetDetailAttachmentById(id).subscribe(result => {
            this.lstAttachment=   this.lstAttachment.filter(item => item.id != id);
       
          });
    

        },
        reject: () => {
          this.confirmationService.close();
        }
      });
    }
    else {
      this.confirmationService.confirm({
        message: 'هل أنت متأكد من مسح هذا الملف',
        header: "تأكيد المسح",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.assetDetailService.DeleteAssetDetailAttachmentById(id).subscribe(result => {
            console.log(this.lstAttachment.filter(item => item.id != id));

         this.lstAttachment=   this.lstAttachment.filter(item => item.id != id);
            console.log(this.lstAttachment);
          });
        },
        reject: () => {
          this.confirmationService.close();
        }
      });
    }
  }
  downloadFile(fileName) {
    var filePath = `${environment.Domain}UploadedAttachments/`;

    this.uploadService.downloadAssetDetailFile(fileName).subscribe(file => {
      var dwnldFile = filePath + 'AssetDetails/' + fileName;
      if (fileName != "" || fileName != null)
        window.open(dwnldFile);
    });
  }
 uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.assetDetailDocument.fileName = fileToUpload.name;
    this.assetDetailDocument.assetFile = fileToUpload;


    this.addFileToList();

  }
  addFileToList() {

      this.assetDetailDocument.assetDetailId = Number(this.assetId);
      let ext = this.assetDetailDocument.fileName.split('.').pop();
      let lastdocumentName = "";
      let imageIndex = "";

      if (this.itmIndex.length == 0) {
        console.log(1);
        this.assetDetailService.GetLastDocumentForAssetDetailId(Number(this.assetId)).subscribe(lastDoc => {
          lastdocumentName = lastDoc.fileName;
          if (lastdocumentName == null) {

            var last_element = 1;
            this.itmIndex.push(last_element);
            // let ext = this.assetDetailDocument.fileName.split('.').pop();
            // var hCode = this.pad(this.currentUser.hospitalCode, 4);
            // var srCode = this.pad(this.assetObj.barcode, 10);
            // let newIndex = this.pad((last_element).toString(), 2);
            // let WOFileName = hCode + "HA" + srCode + newIndex;
            // this.assetDetailDocument.fileName = WOFileName + "." + ext;
          }
          else if (lastdocumentName != "") {
            imageIndex = lastdocumentName.split('.').slice(0, -1).join('.');
            imageIndex = imageIndex.substring(imageIndex.length - 2);
            this.itmIndex.push(imageIndex);

            var newImageIndex = parseInt(imageIndex) + 1;
            this.itmIndex.push(newImageIndex);

            // var hCode = this.pad(this.currentUser.hospitalCode, 4);
            // var srCode = this.pad(this.assetObj.barcode, 10);
            // var last = this.itmIndex[this.itmIndex.length - 1];
            // let newIndex = this.pad((last).toString(), 2);
            // let woRFileName = hCode + "HA" + srCode + newIndex + "." + ext;
            // this.assetDetailDocument.fileName = woRFileName;

          }
          else if (lastdocumentName == "") {

            var last_element = 1;
            this.itmIndex.push(last_element);
            // let ext = this.assetDetailDocument.fileName.split('.').pop();
            // var hCode = this.pad(this.currentUser.hospitalCode, 4);
            // var srCode = this.pad(this.assetObj.barcode, 10);
            // let newIndex = this.pad((last_element).toString(), 2);
            // let WOFileName = hCode + "HA" + srCode + newIndex;
            // this.assetDetailDocument.fileName = WOFileName + "." + ext;
          }
          this.lstAssetDetailDocument.push(this.assetDetailDocument);
          this.assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };
        });
      }
      else if (this.itmIndex.length > 0) {
        var last_element = this.itmIndex[this.itmIndex.length - 1];
        last_element = parseInt(last_element) + 1;
        this.itmIndex.push(last_element);

        // var hCode = this.pad(this.currentUser.hospitalCode, 4);
        // var srCode = this.pad(this.assetObj.barcode, 10);
        // let newIndex = this.pad((last_element).toString(), 2);
        // let SRFileName = hCode + "HA" + srCode + newIndex;
        // this.assetDetailDocument.fileName = SRFileName + "." + ext;
        this.lstAssetDetailDocument.push(this.assetDetailDocument);
        this.assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };
      }
    
    else {
      if (this.lang == "en") {
        this.messageService.add({ key: 'files', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Please Complete Data' });
      }
      else {
        this.messageService.add({ key: 'files', severity: 'خطأ', summary: 'انتبه !!!', sticky: true, detail: 'من فضلك أدخل اسم الملف وعنوانه' });
      }
    }
  }
  onSelectionChanged(event) {
    this.masterAssetService.AutoCompleteMasterAssetName(event.query).subscribe(masters => {
      this.lstMasterAssets = masters;
      if (this.lang == "en") {
        this.lstMasterAssets.forEach(item => item.name = item.name + " - " + item.modelNumber + " - " + item.brandName);
      }
      else {
        this.lstMasterAssets.forEach(item => item.name = item.nameAr + " - " + item.modelNumber + " - " + item.brandNameAr);
      }
    });

  }
  onHospitalSelectionChanged(event) {

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
  getHospitalObj($event) {
    this.assetObj.hospitalId = $event["id"];
    this.hospitalService.GetHospitalById($event.id).subscribe(item => {
      this.hospitalss = item;
    });
  }




  getObject(event) {
    this.assetObj.masterAssetId = event["id"];
  }


  pad(num: string, size: number): string {
    while (num.length < size) num = "0" + num;
    return num;
  }


  addSupplier() {
    const dialogRef2 = this.dialogService.open(CreateSupplierComponent, {
      // header: this.lang == "en" ? 'Add New Brand' : "بيان إضافة ماركة جديدة",
      width: '50%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      if (res != this.assetObj.supplierId) {
        this.lstSuppliers = [];
        this.supplierService.GetSuppliers().subscribe(suppliers => {
          this.lstSuppliers = suppliers;
          this.assetObj.supplierId = res;
        });
      }
      else {
        this.assetObj.supplierId = this.assetObj.supplierId;
      }
    });
  }




  uploadMultipleFile = (event: any) => {
    const files: FileList = event.target.files;

    if (files.length === 0) {
      return;
    }
    else {

      for (var i = 0; i < files.length; i++) {
        let fileToUpload = <File>files[i];
        var assetDetailDoc = new CreateAssetDetailAttachmentVM();
        this.formData.append('file', fileToUpload, fileToUpload.name);
        assetDetailDoc.fileName = fileToUpload.name;
        assetDetailDoc.assetFile = fileToUpload;
        // make document title as the file name 
        assetDetailDoc.title = fileToUpload.name.split('.')[0];
        this.lstAssetDetailDocumentToAdd.push(assetDetailDoc);
      }
    }
    this.addMultiFilesToList();
  }
  addMultiFilesToList() {

    this.lstAssetDetailDocumentToAdd.forEach(assetDetailDocument => {
      if (assetDetailDocument.title != "" && assetDetailDocument.fileName != "") {

        assetDetailDocument.assetDetailId = Number(this.assetId);
        let ext = assetDetailDocument.fileName.split('.').pop();
        let lastdocumentName = "";
        let imageIndex = "";

        if (this.itmIndex.length == 0) {
          this.assetDetailService.GetLastDocumentForAssetDetailId(Number(this.assetId)).subscribe(lastDoc => {
            lastdocumentName = lastDoc.fileName;
            if (lastdocumentName == null) {


              var last_element = ++this.incremant;
              this.itmIndex.push(last_element);
              // let ext = assetDetailDocument.fileName.split('.').pop();
              // var hCode = this.pad(this.currentUser.hospitalCode, 4);
              // var srCode = this.pad(this.assetObj.barcode, 10);
              // let newIndex = this.pad((last_element).toString(), 2);
              // let WOFileName = hCode + "HA" + srCode + newIndex;
              // assetDetailDocument.fileName = WOFileName + "." + ext;

            }
            else if (lastdocumentName != "") {

              imageIndex = lastdocumentName.split('.').slice(0, -1).join('.');
              imageIndex = imageIndex.substring(imageIndex.length - 2);
              this.itmIndex.push(imageIndex);
              //
              var newImageIndex = parseInt(imageIndex) + (++this.incremant);
              this.itmIndex.push(newImageIndex);

              // var hCode = this.pad(this.currentUser.hospitalCode, 4);
              // var srCode = this.pad(this.assetObj.barcode, 10);
              // var last = this.itmIndex[this.itmIndex.length - 1];
              // let newIndex = this.pad((last).toString(), 2);
              // let woRFileName = hCode + "HA" + srCode + newIndex + "." + ext;
              // assetDetailDocument.fileName = woRFileName;
              //  var newImageIndex = parseInt(imageIndex) + 1;


            }
            else if (lastdocumentName == "") {

              var last_element = 1;
              this.itmIndex.push(last_element);
              // let ext = assetDetailDocument.fileName.split('.').pop();
              // var hCode = this.pad(this.currentUser.hospitalCode, 4);
              // var srCode = this.pad(this.assetObj.barcode, 10);
              // let newIndex = this.pad((last_element).toString(), 2);
              // let WOFileName = hCode + "HA" + srCode + newIndex;
              // assetDetailDocument.fileName = WOFileName + "." + ext;

            }
            this.lstAssetDetailDocument.push(assetDetailDocument);
            assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };
          });
        }
        else if (this.itmIndex.length > 0) {
          var last_element = this.itmIndex[this.itmIndex.length - 1];
          last_element = parseInt(last_element) + (++this.incremant);
          this.itmIndex.push(last_element);

          // var hCode = this.pad(this.currentUser.hospitalCode, 4);
          // var srCode = this.pad(this.assetObj.barcode, 10);
          // let newIndex = this.pad((last_element).toString(), 2);
          // let SRFileName = hCode + "HA" + srCode + newIndex;
          // assetDetailDocument.fileName = SRFileName + "." + ext;
          this.lstAssetDetailDocument.push(assetDetailDocument);
          assetDetailDocument = { fileName: '', assetDetailId: 0, title: '', assetFile: File, hospitalId: 0 };
        }
      }
      else {
        if (this.lang == "en") {
          this.messageService.add({ key: 'files', severity: 'error', summary: 'Attention !!!', sticky: true, detail: 'Please Complete Data' });
        }
        else {
          this.messageService.add({ key: 'files', severity: 'خطأ', summary: 'انتبه !!!', sticky: true, detail: 'من فضلك أدخل اسم الملف وعنوانه' });
        }
      }

    });
  }

  removeFileFromObjectArray(doc) {
    const index: number = this.lstAssetDetailDocument.indexOf(doc);
    if (index !== -1) {
      this.lstAssetDetailDocument.splice(index, 1);
    }
  }
}