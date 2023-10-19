import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSupplierAttachment, ListSupplierAttachmentVM } from 'src/app/shared/models/SupplierAttachmentVM';
import { EditSupplierVM } from 'src/app/shared/models/supplierVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SupplierService } from 'src/app/shared/services/supplierService.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  supplierObj: EditSupplierVM
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  lstAllSupplierAttachments: ListSupplierAttachmentVM[] = [];
  lstSupplierAttachments: CreateSupplierAttachment[] = [];
  createSupplierAttachment: CreateSupplierAttachment;
  itmIndex: any[] = [];
  formData = new FormData();
  supplierId: number;
  isDisabled: boolean = false;
  constructor(private supplierService: SupplierService, private authenticationService: AuthenticationService,
    private uploadService: UploadFilesService,
    private route: Router, private activeRoute: ActivatedRoute) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.supplierObj = { id: 0, code: '', name: '', nameAr: '', address: '', addressAr: '', email: '', eMail: '', mobile: '', website: '', contactPerson: '', fax: '', notes: '' }
    this.createSupplierAttachment = { id: 0, supplierId: 0, fileName: '', title: '', supplierFile: File }

    let id = this.activeRoute.snapshot.params['id'];
    this.supplierId = id;
    this.supplierService.GetSupplierById(id).subscribe(
      data => {
        this.supplierObj = data;
        this.supplierService.GetSupplierAttachmentsBySupplierId(this.supplierObj.id).subscribe(files => {
          this.lstAllSupplierAttachments = files;
        })
      });
  }
  onSubmit() {

    this.supplierService.UpdateSupplier(this.supplierObj).subscribe(addedObj => {
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
          } if (error.error.status == 'nameAr') {
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
      });
  }

  downloadFile(fileName) {
    var filePath = `${environment.Domain}UploadedAttachments/`;
    this.uploadService.downloadSupplierFile(fileName).subscribe(file => {
      var dwnldFile = filePath + 'SupplierAttachments/' + fileName;
      if (fileName != "" || fileName != null)
        window.open(dwnldFile);
    })
  }

  saveFiles() {
    if (this.lstSupplierAttachments.length > 0) {
      this.lstSupplierAttachments.forEach((item, index) => {
        item.supplierId = Number(this.supplierId);
        this.supplierService.CreateSupplierAttachment(item).subscribe(fileObj => {
          this.uploadService.uploadSupplierFile(item.supplierFile, item.fileName).subscribe(
            (event) => {
              this.display = true;
            },
            (err) => {

              if (this.lang == "en") {
                this.errorDisplay = true;
                this.errorMessage = 'Could not upload the file:' + item[index].fileName;
              }
              else {
                this.errorDisplay = true;
                this.errorMessage = 'لا يمكن رفع ملف ' + item[index].fileName;
              }
            });
        });
      });
      this.lstSupplierAttachments = [];
      this.display = true;
    }
  }
   uploadFile = (files) => {
    if (this.createSupplierAttachment.title == "") {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "please add document name";
      }
      else {
        this.errorMessage = "من فضلك اكتب اسم ملف قبل اختيار الملف";
      }
      return false;
    }
    else if (files.length === 0) {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "please select file";
      }
      else {
        this.errorMessage = "من فضلك  اختر  ملف";
      }
      return false;
    }
    else {
      let fileToUpload = <File>files[0];
      this.formData.append('file', fileToUpload, fileToUpload.name);
      this.createSupplierAttachment.fileName = fileToUpload.name;
      this.createSupplierAttachment.supplierFile = fileToUpload;
      this.AddFileToList();
    }
  }
  AddFileToList() {
    if (this.itmIndex.length === 0) {
      last_element = 1;
    }
    else if (this.itmIndex.length > 0) {
      var last_element = this.itmIndex[this.itmIndex.length - 1];
      last_element = last_element + 1;
    }
    this.itmIndex.push(last_element);
    let ext = this.createSupplierAttachment.fileName.split('.').pop();
    var supplierCode = this.pad(this.supplierObj.code, 10);
    var last = this.itmIndex[this.itmIndex.length - 1];
    let newIndex = this.pad((last).toString(), 2);
    let fileName = "SUP" + supplierCode + newIndex;
    this.createSupplierAttachment.fileName = fileName + "." + ext;

    this.lstSupplierAttachments.push(this.createSupplierAttachment);
    this.createSupplierAttachment = { id: 0, supplierId: 0, fileName: '', title: '', supplierFile: File }
  }
  pad(num: string, size: number): string {
    while (num.length < size) num = "0" + num;
    return num;
  }
  removeFileFromObjectArray(doc) {
    const index: number = this.lstSupplierAttachments.indexOf(doc);
    if (index !== -1) {
      this.lstSupplierAttachments.splice(index, 1);
    }
  }
  back() { this.route.navigate(['/dash/suppliers']); }
}
