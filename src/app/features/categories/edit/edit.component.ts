import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditCategoryVM } from 'src/app/shared/models/categoryVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public lang = localStorage.getItem('lang');
  errorMessage: string = '';
  errorDisplay: boolean = false;
  display: boolean = false;
  form: FormGroup;
  cateObj: EditCategoryVM;
  submitted: boolean = false;
  isValidEMail: boolean = false;
  textDir: string = 'ltr';
  selectedTypeId: number;
  constructor(
    private categoryService: CategoryService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private route: Router
  ) { }

  ngOnInit(): void {

    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    this.cateObj = { id: 0, code: '', nameAr: '', name: '', categoryTypeId: 0 }
   
    let id = this.config.data.id;
    this.categoryService.GetCategoryById(id).subscribe((data) => {
      this.cateObj = data;

      this.cateObj.id = id;
      this.selectedTypeId = this.cateObj.categoryTypeId;


    });
  }
  changeType($event) {
    // this.selectedTypeId = $event.target.value;
    this.cateObj.categoryTypeId = $event.target.value;

  }
  onSubmit() {
    if (this.cateObj.code == '') {
      this.submitted = false;
      return false;
    }
    if (this.cateObj.name == '') {
      this.submitted = false;
      return false;
    } else {
      this.categoryService.UpdateCategory(this.cateObj).subscribe(
        (result) => {
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
        }
      );
    }
  }

    
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
}