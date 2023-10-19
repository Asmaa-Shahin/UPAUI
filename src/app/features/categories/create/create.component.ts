import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCategoryVM } from 'src/app/shared/models/categoryVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  cateObj: CreateCategoryVM;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  selectedTypeId: number;

  constructor(private authenticationService: AuthenticationService, private categoryService: CategoryService,
    private route: Router,  private config: DynamicDialogConfig,  private ref: DynamicDialogRef)
     { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.cateObj = { code: '', name: '', nameAr: '', categoryTypeId: 0 }
   
    let typeId = this.config.data.typeId;

    this.selectedTypeId = typeId;
    if (typeId != null) {
      this.cateObj.categoryTypeId = this.selectedTypeId;
    }
    else {
      this.cateObj.categoryTypeId = 0;
    }

    this.categoryService.GenerateCategoryCode().subscribe(cat => {
      this.cateObj.code = cat["code"];
    });
  }
  onSubmit() {
    if (this.cateObj.name == "") {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select name";
      else
        this.errorMessage = "من فضلك اختر اسم";

      return false;
    }
    if (this.cateObj.nameAr == "") {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select name";
      else
        this.errorMessage = "من فضلك اختر اسم";

      return false;
    }
    if (this.cateObj.code == "") {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select code";
      else
        this.errorMessage = "من فضلك اختر كود";

      return false;
    }
    this.categoryService.CreateCategory(this.cateObj).subscribe(addedObj => {
      this.display = true;
      this.ref.close();
      this.reload();
    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'codelen') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.message;
          } if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.message;
          }
        }
        if (this.lang == 'ar') {
          console.log(error)
          if (error.error.status == 'codelen') {
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
  reset() {
    this.cateObj = { code: '', name: '', nameAr: '', categoryTypeId: 0 }
  }

  
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
}
