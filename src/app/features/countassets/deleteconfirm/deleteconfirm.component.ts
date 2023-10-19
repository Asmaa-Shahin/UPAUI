import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditCountOfAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { CountOfAssetService } from 'src/app/shared/services/countOfAsset.service';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.scss']
})
export class DeleteconfirmComponent {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  countOfAssetObj: EditCountOfAssetsVM;
  id: number;
  governorateName = "";
  organizationName = "";
  brandName = "";
  categoryName = "";


  message = ""
  action: any;
  errorMessage: string;
  errorDisplay: boolean = false;
  constructor(private countOfAssetService: CountOfAssetService,private snackBar: MatSnackBar,
     public dialog: MatDialogRef<DeleteconfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.countOfAssetObj = { ...data };
    this.id = this.countOfAssetObj.id;
    if (this.lang == "en") {
      this.governorateName = this.countOfAssetObj.governorateName;
      this.organizationName = this.countOfAssetObj.organizationName;
      this.brandName = this.countOfAssetObj.brandName;
      this.categoryName = this.countOfAssetObj.categoryName;
    }
    else {
      this.governorateName = this.countOfAssetObj.governorateNameAr;
      this.organizationName = this.countOfAssetObj.organizationNameAr;
      this.brandName = this.countOfAssetObj.brandNameAr;
      this.categoryName = this.countOfAssetObj.categoryNameAr;
    }

  }

  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
  }
  close(): void {
    this.dialog.close();
   this.snackBar.dismiss();
  }
  delete(): void {
    this.countOfAssetService.DeleteCountOfAsset(this.id).subscribe(deleted => {
      if (this.lang == 'en') {
        this.message = 'Data is deleted successfully';
        this.action = "close";
      }
      else {
        this.message = 'تم مسح البيانات بنجاح';
        this.action = "إغلاق";
      }
       this.snackBar.open(this.message, this.action, { panelClass: 'snackbar' });
      this.dialog.close();

    }, (error) => {
      this.errorDisplay = true;

      // if (this.lang == 'en') {
      //   if (error.error.status == 'code') {
      //     this.errorMessage = error.error.message;
      //   }
      // } if (this.lang == 'ar') {
      //   if (error.error.status == 'code') {
      //     this.errorMessage = error.error.messageAr;
      //   } 
      // }
      return false;
    });
  }
}
