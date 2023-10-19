import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { CreateSubCategoryVM } from 'src/app/shared/models/subCategoryVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent implements OnInit {
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser
  subCategoryObj: CreateSubCategoryVM;
  lstCategories: ListCategoryVM[] = [];
  errorMessage: string;
  submitted:boolean;
  errorDisplay: boolean = false;
  display: boolean = false;
  constructor(private authenticationService: AuthenticationService, private subCategoryService: SubCategoryService,
    private categoryService: CategoryService, private config: DynamicDialogConfig, private ref: DynamicDialogRef
  ) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.subCategoryService.GenerateSubCategoryCode().subscribe(subcat => {
      console.log(subcat);
      this.subCategoryObj.code = subcat["code"];
    });
    this.subCategoryObj = { code: '', name: '', nameAr: '', categoryId: 0 };
    this.categoryService.GetCategories().subscribe(categories => {
      this.lstCategories = categories;
    });

    let cateId = this.config.data.cateId;

    if (cateId != null) {
      this.subCategoryObj.categoryId = cateId;
    }
    else {
      this.subCategoryObj.categoryId = 0;
    }


  }


  onCategoryChange($event) {
    this.subCategoryObj.categoryId = $event.target.value;
  }
  onSubmit() {
    if(this.subCategoryObj.categoryId==0){
      this.errorDisplay=true;
      console.log(this.subCategoryObj.categoryId);
      if(this.lang=="ar"){
      
        this.errorMessage="من فضلك اختر تصنيف";
      return false;
      }
      if(this.lang=="en"){
        this.errorMessage="please choose category";
        this.submitted = false;
        return false;
      }


    }
    if(this.subCategoryObj.name==""){
      this.errorDisplay=true;

      if(this.lang=="ar"){
      
        this.errorMessage="من فضلك اختر اسم";
      
      }
      if(this.lang=="en"){
        this.errorMessage="please choose name";
        this.submitted = false;
        return false;
      }


    }
    if(this.subCategoryObj.nameAr==""){
      this.errorDisplay=true;

      if(this.lang=="ar"){
      
        this.errorMessage="من فضلك اختر اسم";
      
      }
      if(this.lang=="en"){
        this.errorMessage="please choose name";
        this.submitted = false;
        return false;
      }


    }
    if (this.subCategoryObj.code == '') {
      this.submitted = false;

      return false;
    }
    if (this.subCategoryObj.name == '') {
      this.submitted = false;
      return false;
    }
  
    this.subCategoryService.CreateSubCategory(this.subCategoryObj).subscribe(addedObj => {
      this.display = true;
      this.ref.close();
    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
           this.errorMessage = error.error.message;
          // if (error.error.status == 'codelen') {
          //   this.errorMessage = error.error.message;
          // }
          // if (error.error.status == 'name') {
          //   this.errorMessage = error.error.message;
          // } if (error.error.status == 'nameAr') {
          //   this.errorMessage = error.error.message;
          // }
        }
        if (this.lang == 'ar') {
          this.errorMessage=error.error.messageAr;
          // if (error.error.status == 'codelen') {
          //   this.errorMessage = error.error.messageAr;
          // }
          // if (error.error.status == 'name') {
          //   this.errorMessage = error.error.messageAr;
          // }
          // if (error.error.status == 'nameAr') {
          //   this.errorMessage = error.error.messageAr;
          // }
        }
        return false;
      });
  }
}
