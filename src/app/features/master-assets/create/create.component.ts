import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListAssetPeriorityVM } from 'src/app/shared/models/assetPeriorityVM';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { ListECRIVM } from 'src/app/shared/models/ecriVM';
import { CreateMasterAssetAttachmentVM, CreateMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { ListOriginVM } from 'src/app/shared/models/originVM';
import { ListSubCategoryVM } from 'src/app/shared/models/subCategoryVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetPeriorityService } from 'src/app/shared/services/assetperiority.service';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ECRIService } from 'src/app/shared/services/ecri.service';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { OriginService } from 'src/app/shared/services/origin.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateBrandComponent } from '../../brands/create-brand/create-brand.component';
import { HttpHeaders } from '@angular/common/http';
//import { CreateBrandComponent } from 'src/app/Features/brands/create-brand/create-brand.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  // lstTypes: ListCategoryTypeVM[] = [];
  lstCategories: ListCategoryVM[] = [];
  lstSubCategories: ListSubCategoryVM[] = [];
  lstBrands: ListBrandVM[] = [];
  lstOrigins: ListOriginVM[] = [];
  lstPeriorities: ListAssetPeriorityVM[] = [];
  lstECRIs: ListECRIVM[] = [];
  masterAssetObj: CreateMasterAssetVM;

  masterAssetId: number;
  radioPerioritySelected: string;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fname = '';
  fileInfos: Observable<any>;
  savedfilesdisplay: boolean = false;
  selectedCategory: any;
  selectedPMTime: any;
  selectedDepartment: any;

  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  title: string = '';
  isSaved: boolean = false;

  uploadFileName: string;
  fileName = '';

  masterAssetDocument: CreateMasterAssetAttachmentVM;
  lstMasterAssetDocuments: CreateMasterAssetAttachmentVM[] = [];

  itmIndex: any[] = [];
  formData = new FormData();
  imagePath: any = "";
  public file: File;
  @ViewChild('fileUpload', { static: false })
  upfile: ElementRef;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;

  isAdmin: boolean = false;
  isHospitalManager: boolean = false;
  canAddBrand: boolean = false;

  lstRoleNames: string[] = [];
  token = localStorage.getItem("userToken");
  public taskForm: FormGroup;
  constructor(
    private authenticationService: AuthenticationService,
    private masterAssetService: MasterAssetService,
    private uploadService: UploadFilesService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private originService: OriginService,
    private brandService: BrandService,
    private ecriService: ECRIService,
    private assetPeriorityService: AssetPeriorityService,
    private dialogService: DialogService,
    private route: Router,
    private ref: DynamicDialogRef
  ) {
   
  }
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }
  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    // if (this.currentUser) {
    //   this.currentUser["roleNames"].forEach(element => {
    //     this.lstRoleNames.push(element["name"]);
    //   });

    //   this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    //   this.isHospitalManager = (['TLHospitalManager'].some(r => this.lstRoleNames.includes(r)));
    //   this.canAddBrand = (['AddBrand'].some(r => this.lstRoleNames.includes(r)));
    // }
    this.masterAssetDocument = { fileName: '', masterAssetId: 0, masterFile: File, title: '' };
    this.masterAssetObj = {
      id: 0,
      ecriId: null, brandId: null, categoryId: null, code: '', description: '', descriptionAr: '', expectedLifeTime: 0, height: 0, length: 0, modelNumber: '', name: '', nameAr: '', originId: null,
      periorityId: null, subCategoryId: null, versionNumber: '', weight: 0, width: 0, title: '', power: '', voltage: '', ampair: '', frequency: '', electricRequirement: '',
      pmTimeId: 0, assetImg: ''
    };




    this.categoryService.GetCategories().subscribe(categories => { this.lstCategories = categories })

    this.originService.GetOrigins().subscribe((origins) => {
      this.lstOrigins = origins;
    });

    this.assetPeriorityService
      .GetAssetPeriorities()
      .subscribe((periorities) => {
        this.lstPeriorities = periorities;
      });
    this.brandService.GetBrands().subscribe((brands) => {
      this.lstBrands = brands;
    });

    this.ecriService.GetECRIS().subscribe((ecris) => {
      this.lstECRIs = ecris;
    });



    this.masterAssetService.GenerateMasterAssetcode().subscribe(master => {
      console.log("masterCode" , master)
      this.masterAssetObj.code = master["code"];
    });




    this.radioPerioritySelected = '1';
    this.getSelecteditem();



  }
  getSelecteditem() {
    this.masterAssetObj.periorityId = Number(this.radioPerioritySelected);
  }
  GetCategoriesByCategoryTypeId($event) {
 //   this.categoryService.GetCategoryByCategoryTypeId($event.target.value).subscribe(categories => { this.lstCategories = categories })
  }
  GetSubCategoryByCategoryId($event) {
    this.subCategoryService
      .GetSubCategoriesByCategoryId($event.target.value)
      .subscribe((subs) => {
        this.lstSubCategories = subs;
      });
  }

  onTimeChange($event) {
    this.selectedPMTime = $event.value;
  }
  onSubmit(): any {
  this.errorDisplay=false;
    if (this.masterAssetObj.brandId == null) {
     
      if (this.lang == "en") {
        console.log(this.masterAssetObj.nameAr);
        this.errorMessage = "Please select Brand";
        this.errorDisplay = true;
        return false;
      }

      else {
        console.log(this.masterAssetObj.nameAr);
        this.errorMessage = "من فضلك اختر ماركة";
        this.errorDisplay = true;
        return false;
      }
      
     
    }
console.log(this.errorMessage);
    if (this.masterAssetObj.name == ''|| this.masterAssetObj.nameAr == '') {
      
      if (this.lang == "en") {
        this.errorDisplay = true;
      
        this.errorMessage = "Please select Name";
        return false;
      }
      else{
        this.errorDisplay = true;
        this.errorMessage = " من فضلك اختر اسم";
        return false;
      }


    }
    
  
console.log(this.masterAssetObj);
    this.masterAssetService.CreateMasterAsset(this.masterAssetObj).subscribe(assetObj => {
      this.masterAssetId = assetObj;
   
      if (this.file) {
        let ext = this.file.name.split('.').pop();
        var srCode = this.pad(this.masterAssetObj.code.toString(), 10);
        let newIndex = this.pad((this.masterAssetId).toString(), 2);
        let HospitalAssetFileName = "MA" + srCode + newIndex;
        let masterFileName = HospitalAssetFileName + "." + ext;
        this.masterAssetObj.assetImg = masterFileName;
        this.masterAssetObj.id = this.masterAssetId;
        this.masterAssetService.UpdateMasterAssetImageAfterInsert(this.masterAssetObj).subscribe(master => {
          this.uploadService
            .uploadMasterAssetImage(this.file, masterFileName)
            .subscribe(
              (event) => { },
              (err) => {
                this.message = 'Could not upload the file:' + masterFileName;
                return false;
              });
        });
      }
      if (this.lstMasterAssetDocuments.length > 0) {
        this.lstMasterAssetDocuments.forEach((elemnt, index) => {
          elemnt.masterAssetId = this.masterAssetId;
          this.masterAssetService.CreateMasterAssetAttachments(elemnt).subscribe(lstfiles => {
            this.uploadService.uploadMasterAssetFiles(elemnt.masterFile, elemnt.fileName).subscribe(
              (event) => {
              
                this.reload();
              },
              (err) => {
                if (this.lang == "en") {
                  this.errorDisplay = true;
                  this.errorMessage = 'Could not upload the file:' + elemnt[index].fileName;
                  return false;
                }
                else {
                  this.errorDisplay = true;
                  this.errorMessage = 'لا يمكن رفع ملف ' + elemnt[index].fileName;
                  return false;
                }
              });

          
          });
        });
        this.lstMasterAssetDocuments = [];
      }
      this.display = true;
   
    },
      error => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'brnd') {
            this.errorMessage = error.error.message;
            
          }
          if (error.error.status == 'codelen') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.message;
          }
        } if (this.lang == 'ar') {
          if (error.error.status == 'brnd') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'codelen') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'code') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.messageAr;
          }
        }
        return false;
      });
  }
  onDialogClose(){
    this.reload();
    this.ref.close();

  }
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
  onFileSelected(event) {
    this.file = event.target.files[0];
    if (this.file) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.imagePath = reader.result;
        this.imgVisible = false;
        this.btnHidden = false;
      }
    }
  }
  resetFile() {
    this.upfile.nativeElement.value = "";
    this.imgVisible = true;
    this.btnHidden = true;
  }
  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.masterAssetDocument.fileName = fileToUpload.name;
    this.masterAssetDocument.masterFile = fileToUpload;
    this.masterAssetDocument.title = this.masterAssetDocument.title;
    this.addFileToList();
  }
  addFileToList() {

    if (this.itmIndex.length === 0) {
      last_element = 1;
    }
    else if (this.itmIndex.length > 0) {
      var last_element = this.itmIndex[this.itmIndex.length - 1];
      last_element = last_element + 1;
    }
    this.itmIndex.push(last_element);

    let ext = this.masterAssetDocument.fileName.split('.').pop();
    //var hCode = this.pad(this.currentUser.hospitalCode, 4);
    var srCode = this.pad(this.masterAssetObj.code.toString(), 10);
    var last = this.itmIndex[this.itmIndex.length - 1];
    let newIndex = this.pad((last).toString(), 2);
    let HospitalAssetFileName = "MA" + srCode + newIndex;
    this.masterAssetDocument.fileName = HospitalAssetFileName + "." + ext;
    this.lstMasterAssetDocuments.push(this.masterAssetDocument);
    this.masterAssetDocument = { fileName: '', masterAssetId: 0, title: '', masterFile: File };
  }
  pad(num: string, size: number): string {
    while (num.length < size) num = "0" + num;
    return num;
  }

  removeFileFromObjectArray(doc) {
    const index: number = this.lstMasterAssetDocuments.indexOf(doc);
    if (index !== -1) {
      this.lstMasterAssetDocuments.splice(index, 1);
    }
  }



  addBrand() {
    const dialogRef2 = this.dialogService.open(CreateBrandComponent, {
      // header: this.lang == "en" ? 'Add New Brand' : "بيان إضافة ماركة جديدة",
      width: '50%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.lstBrands = [];
      this.brandService.GetBrands().subscribe(brands => {
        this.lstBrands = brands;
        this.masterAssetObj.brandId = res;
      });
    });
  }
}
