import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ListOriginVM } from 'src/app/shared/models/originVM';
import { ListSubCategoryVM } from 'src/app/shared/models/subCategoryVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetPeriorityService } from 'src/app/shared/services/assetperiority.service';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { OriginService } from 'src/app/shared/services/origin.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { Observable } from 'rxjs';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateMasterAssetAttachmentVM, EditMasterAssetVM,  MasterAssetAttachmentVM } from 'src/app/shared/models/masterAssetVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListAssetPeriorityVM } from 'src/app/shared/models/assetPeriorityVM';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from 'primeng/api';
import { ECRIService } from 'src/app/shared/services/ecri.service';
import { ListECRIVM } from 'src/app/shared/models/ecriVM';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { CreateBrandComponent } from '../../brands/create-brand/create-brand.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  currentUser: LoggedUser;
  public lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  form: FormGroup;
  masterAssetObj: EditMasterAssetVM;
  lstCategories: ListCategoryVM[] = [];
  lstSubCategories: ListSubCategoryVM[] = [];
  lstBrands: ListBrandVM[] = [];
  lstOrigins: ListOriginVM[] = [];
  lstPeriorities: ListAssetPeriorityVM[] = [];
  lstECRIs: ListECRIVM[] = [];
  radioPerioritySelected: number;
  selectedPMTime: any;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  savedfilesdisplay: boolean = false;
  masterAssetId: number;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  abbr: any;
  fname = '';
  fileInfos: Observable<any>;
  masterId: number;
  lstAttachment: MasterAssetAttachmentVM[] = [];
  masterAssetDocument: CreateMasterAssetAttachmentVM;
  lstMasterAssetDocuments: CreateMasterAssetAttachmentVM[] = [];
  fileName = '';
  imgURL: any = "";
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  itmIndex: any[] = [];
  formData = new FormData();
  file: File;
  canAddBrand: boolean = false;
  isAdmin: boolean = false;
  lstRoleNames: string[] = [];
  uploadFileName: string;
  fileToUpload: File;
  constructor(
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private masterAssetService: MasterAssetService,
    private uploadService: UploadFilesService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private originService: OriginService,
    private brandService: BrandService,
    private ecriService: ECRIService,
    private assetPeriorityService: AssetPeriorityService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private route: Router,   private activeRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
  
    this.masterAssetDocument = {
      fileName: '', masterAssetId: 0, title: '', masterFile: File
    };
    this.masterAssetObj = {
      ecriId: 0, id: 0, brandId: 0, categoryId: 0, expectedLifeTime: 0, height: 0, length: 0, originId: 0, periorityId: 0, subCategoryId: 0, weight: 0, width: 0, brandName: '', brandNameAr: '', model: '',
      code: '', description: '', descriptionAr: '', modelNumber: '', name: '', nameAr: '', versionNumber: '', title: '', power: '', voltage: '', ampair: '', frequency: '', electricRequirement: '', pmTimeId: 0, assetImg: ''
    };

    this.onLoad();

    let id = this.config.data.id;

// let id = this.activeRoute.snapshot.params['id'];
console.log(id);




    this.masterId = id;
    this.masterAssetService.GetMasterAssetById(id).subscribe((data) => {
      console.log(data);
      this.masterAssetObj = data;
      this.masterAssetId = this.masterAssetObj.id;
      console.log(this.masterAssetId);
      this.radioPerioritySelected = this.masterAssetObj.periorityId;
    
    

      if (this.masterAssetObj.assetImg == null) {
        this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/UnknownAsset.png`;
      console.log(this.imgURL);
      }
      else if (this.masterAssetObj.assetImg == "") {
        this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/UnknownAsset.png`;
        console.log(this.imgURL);
      }
      else {
    
        this.imgURL = `${environment.Domain}UploadedAttachments/MasterAssets/UploadMasterAssetImage/` + data["assetImg"];
        console.log(this.imgURL);
      }

  
      if (this.masterAssetObj.categoryId != null) {
        this.subCategoryService
          .GetSubCategoriesByCategoryId(this.masterAssetObj.categoryId)
          .subscribe((subs) => {
            this.lstSubCategories = subs;
          });
        this.categoryService.GetCategoryById(this.masterAssetObj.categoryId).subscribe(categoryObj => {
          this.masterAssetObj.categoryTypeId = categoryObj["categoryTypeId"]
        })


      }

      this.masterAssetService
        .GetAttachmentByMasterAssetId(this.masterId)
        .subscribe(
          (files) => {
            this.lstAttachment = files;
          },
          (error) => console.log(error)
        );

   
    


    });
  }

  onLoad() {
    this.categoryService.GetCategories().subscribe((categories) => {
      this.lstCategories = categories;
    });

    this.originService.GetOrigins().subscribe((origins) => {
      this.lstOrigins = origins;
    });

    this.assetPeriorityService
      .GetAssetPeriorities()
      .subscribe((periorities) => {
        this.lstPeriorities = periorities;

console.log(this.lstPeriorities);
      });
    this.brandService.GetBrands().subscribe((brands) => {
      this.lstBrands = brands;
    });

    this.ecriService.GetECRIS().subscribe((ecris) => {
      this.lstECRIs = ecris;
    });

  }
  GetCategoriesByCategoryTypeId($event) {
    this.categoryService.GetCategoryByCategoryTypeId($event.target.value).subscribe(categories => { this.lstCategories = categories })
  }
  onFileSelected(event) {
  console.log(event);
    this.file = event.target.files[0];
    if (this.file) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.imgVisible = false;
        this.btnHidden = false;
      }
    }
  }
  deleteFile(id: number) {
    this.masterAssetService.DeleteMasterAssetImage(id).subscribe((saved) => {
      this.display = true;
      this.ref.close();
    });
  }
  getSelecteditem() {
    this.masterAssetObj.periorityId = Number(this.radioPerioritySelected);
    console.log(    'this.masterAssetObj.periorityId' );
  }
  GetSubCategoryByCategoryId($event) {
    this.subCategoryService
      .GetSubCategoriesByCategoryId($event.target.value)
      .subscribe((subs) => {
        this.lstSubCategories = subs;
        if(this.lstSubCategories.length>0){
          this.masterAssetObj.subCategoryId=this.lstSubCategories[0].id;
        }
        else{
          this.masterAssetObj.subCategoryId=0;
        }
      });
 
  }

  subcat(event){

console.log(event);
    this.masterAssetObj.subCategoryId=event.target.value;
  }
  onSubmit() {
    this.masterAssetObj.periorityId=this.radioPerioritySelected;
    if (this.file) {
      let ext = this.file.name.split('.').pop();
       var srCode = this.pad(this.masterAssetObj.code, 10);
      let newIndex = this.pad((this.masterAssetObj.id).toString(), 2);
      let HospitalAssetFileName =  "MA" + srCode + newIndex;
      let masterFileName = HospitalAssetFileName + "." + ext;
      this.masterAssetObj.assetImg = masterFileName;
    }
    else {
      this.masterAssetObj.assetImg = this.masterAssetObj.assetImg;
    }
    console.log(this.masterAssetObj);
    this.masterAssetService.UpdateMasterAsset(this.masterAssetObj).subscribe(assetObj => {


      if (this.file) {
        let ext = this.file.name.split('.').pop();
         var srCode = this.pad(this.masterAssetObj.code, 10);
        let newIndex = this.pad((this.masterAssetObj.id).toString(), 2);
        let HospitalAssetFileName =  "MA" + srCode + newIndex;
        let masterFileName = HospitalAssetFileName + "." + ext;
        this.uploadService
          .uploadMasterAssetImage(this.file, masterFileName)
          .subscribe(
            (event) => { },
            (err) => {
              this.message = 'Could not upload the file:' + masterFileName;
            });
      }

      if (this.lstMasterAssetDocuments.length > 0) {
        this.lstMasterAssetDocuments.forEach((elemnt, index) => {
          elemnt.masterAssetId = this.masterAssetId;
          this.masterAssetService.CreateMasterAssetAttachments(elemnt).subscribe(lstfiles => {
            this.uploadService.uploadMasterAssetFiles(elemnt.masterFile, elemnt.fileName).subscribe(
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

        this.lstMasterAssetDocuments = [];
      }

      this.display = true;
   
  

    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.message;
          }

          if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.message;
          }
        }
        if (this.lang == 'ar') {
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
      }
    );
  }
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
  DeleteFile(id: number) {
    if (this.lang == 'en') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this file?',
        header: 'Delete Item Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.masterAssetService
            .DeleteMasterAssetAttachmentById(id)
            .subscribe((result) => {
              this.ngOnInit();
            });
        },
        reject: () => {
          this.confirmationService.close();
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'هل أنت متأكد من مسح هذا الملف',
        header: 'تأكيد المسح',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.masterAssetService
            .DeleteMasterAssetAttachmentById(id)
            .subscribe((result) => {
              this.ngOnInit();
            });
        },
        reject: () => {
          this.confirmationService.close();
        },
      });
    }
  }
  downloadFile(fileName) {
    var filePath = `${environment.Domain}UploadedAttachments/`;

    this.uploadService.downloadMasterAssetFile(fileName).subscribe((file) => {
      var dwnldFile = filePath + 'MasterAssets/' + fileName;
      if (fileName != '' || fileName != null) window.open(dwnldFile);
    });
  }
  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
  
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.masterAssetDocument.fileName = fileToUpload.name;
    this.masterAssetDocument.title = fileToUpload.name; // Assign filename to title
    this.masterAssetDocument.masterFile = fileToUpload;
    console.log(this.masterAssetDocument.title);
    this.addFileToList();
  }
  
  addFileToList() {
    var hCode = "";
    var srCode = "";
    this.masterAssetDocument.masterAssetId = Number(this.masterAssetId);
    let ext = this.masterAssetDocument.fileName.split('.').pop();
    let lastdocumentName = "";
    let imageIndex = "";

    if (this.itmIndex.length == 0) {
      this.masterAssetService.GetLastDocumentForMsterAssetId(Number(this.masterAssetId)).subscribe(lastDoc => {
        lastdocumentName = lastDoc.fileName;
        if (lastdocumentName == null) {
          var last_element = 1;
          this.itmIndex.push(last_element);
          let ext = this.masterAssetDocument.fileName.split('.').pop();
          // if (this.currentUser.hospitalCode.length < 5)
          //   hCode = this.pad(this.currentUser.hospitalCode, 4);
          // else
          //   hCode = this.currentUser.hospitalCode;

          if (this.masterAssetObj.code.length < 10)
            srCode = this.pad(this.masterAssetObj.code, 10);
          else
            srCode = this.masterAssetObj.code, 10;
          let newIndex = this.pad((last_element).toString(), 2);
          let MAFileName =  "MA" + srCode + newIndex;
          this.masterAssetDocument.fileName = MAFileName + "." + ext;
        }
        else if (lastdocumentName != "") {
          imageIndex = lastdocumentName.split('.').slice(0, -1).join('.');
          imageIndex = imageIndex.substring(imageIndex.length - 2);
          this.itmIndex.push(imageIndex);

          var newImageIndex = parseInt(imageIndex) + 1;
          this.itmIndex.push(newImageIndex);

          // if (this.currentUser.hospitalCode.length < 5)
          //   hCode = this.pad(this.currentUser.hospitalCode, 4);
          // else
          //   hCode = this.currentUser.hospitalCode;

          if (this.masterAssetObj.code.length < 10)
            srCode = this.pad(this.masterAssetObj.code, 10);
          else
            srCode = this.masterAssetObj.code, 10;

          var last = this.itmIndex[this.itmIndex.length - 1];
          let newIndex = this.pad((last).toString(), 2);
          let woRFileName =  "MA" + srCode + newIndex + "." + ext;
          this.masterAssetDocument.fileName = woRFileName;

        }
        else if (lastdocumentName == "") {

          var last_element = 1;
          this.itmIndex.push(last_element);
          let ext = this.masterAssetDocument.fileName.split('.').pop();
          // if (this.currentUser.hospitalCode.length < 5)
          //   hCode = this.pad(this.currentUser.hospitalCode, 4);
          // else
          //   hCode = this.currentUser.hospitalCode;

          if (this.masterAssetObj.code.length < 10)
            srCode = this.pad(this.masterAssetObj.code, 10);
          else
            srCode = this.masterAssetObj.code, 10;
          let newIndex = this.pad((last_element).toString(), 2);
          let MAFileName =  "MA" + srCode + newIndex;
          this.masterAssetDocument.fileName = MAFileName + "." + ext;
        }
        this.lstMasterAssetDocuments.push(this.masterAssetDocument);
        this.masterAssetDocument = { fileName: '', masterAssetId: 0, title: '', masterFile: File };
      });
    }
    else if (this.itmIndex.length > 0) {
      var last_element = this.itmIndex[this.itmIndex.length - 1];
      last_element = parseInt(last_element) + 1;
      this.itmIndex.push(last_element);

      // if (this.currentUser.hospitalCode.length < 5)
      //   hCode = this.pad(this.currentUser.hospitalCode, 4);
      // else
      //   hCode = this.currentUser.hospitalCode;

      if (this.masterAssetObj.code.length < 10)
        srCode = this.pad(this.masterAssetObj.code, 10);
      else
        srCode = this.masterAssetObj.code, 10;

      let newIndex = this.pad((last_element).toString(), 2);
      let SRFileName =  "MA" + srCode + newIndex;
      this.masterAssetDocument.fileName = SRFileName + "." + ext;
      this.lstMasterAssetDocuments.push(this.masterAssetDocument);
      this.masterAssetDocument = { fileName: '', masterAssetId: 0, title: '', masterFile: File };
    }

  }
  onTitleInput(event, item): void {
    // This method is called whenever the content of the contenteditable element changes.
    // You can update the item.title with the new value as the user types.
    item.title = event.target.textContent.trim();
  }
  pad(num: string, size: number): string {
    while (num.length < size) num = "0" + num;
    return num;
  }
  
  

 
  
  
  
  
 
  saveFilesToDB() {
    this.lstMasterAssetDocuments.forEach((elemnt) => {
      elemnt.masterAssetId = this.masterAssetId;
      this.masterAssetService.CreateMasterAssetAttachments(elemnt)
        .subscribe((lstfiles) => {
          //  this.savedfilesdisplay = true;
          this.uploadService.uploadMasterAssetFiles(elemnt.masterFile, elemnt.fileName)
            .subscribe(
              (event) => {
              },
              (err) => {
                this.message = 'Could not upload the file:' + this.fileToUpload.name;
              });
        });
    });
    this.lstMasterAssetDocuments = [];



    this.masterAssetService
      .GetAttachmentByMasterAssetId(this.masterAssetId)
      .subscribe(
        (files) => {
          this.lstAttachment = files;
        },
        (error) => console.log(error)
      );
  }

  removeFileFromObjectArray(doc) {
    const index: number = this.lstMasterAssetDocuments.indexOf(doc);
    if (index !== -1) {
      this.lstMasterAssetDocuments.splice(index, 1);
    }
  }

  onDialogClose(){
 
    this.ref.close();

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
      if (res != this.masterAssetObj.brandId) {
        this.lstBrands = [];
        this.brandService.GetBrands().subscribe(brands => {
          this.lstBrands = brands;
          this.masterAssetObj.brandId = res;
        });
      }
      else {
        this.masterAssetObj.brandId = this.masterAssetObj.brandId;
      }
    });
  }
}
