import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EditCategoryVM, ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { EditSubCategoryVM, ListSubCategoryVM } from 'src/app/shared/models/subCategoryVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';
import { CreateSubCategoryComponent } from '../../sub-categories/create-sub-category/create-sub-category.component';
import { DeletesubCategoryConfirmationComponent } from '../../sub-categories/deletesub-category-confirmation/deletesub-category-confirmation.component';
import { EditSubCategoryComponent } from '../../sub-categories/edit-sub-category/edit-sub-category.component';
import { CreateComponent } from '../create/create.component';
import { DeleteCategoryConfirmationComponent } from '../delete-category-confirmation/delete-category-confirmation.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  dir: string = "ltr";
  //lstTypes: ListCategoryTypeVM[] = [];
  categoriesList: ListCategoryVM[] = [];
  subCategoriesList: ListSubCategoryVM[] = [];
  display: boolean = false;
  errorDisplay: boolean = false;
  errorMessage: string = "";
  selectedcateObj: EditCategoryVM;
  selectedSubCateObj: EditSubCategoryVM;
  selectedcateId: number;
  selectedTypeId: number;
  constructor(private authenticationService: AuthenticationService,
   // private categoryTypeService: CategoryTypeService, 
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService, private dialog: MatDialog,
    public dialogService: DialogService, private route: Router) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    if (this.lang == "en") {
      this.dir = "ltr";
    }
    else {
      this.dir = "rtl";
    }
    this.load();
  }
  load() {
    this.selectedTypeId = 0;
    this.categoryService.GetCategories().subscribe(categories => { this.categoriesList = categories
    
    console.log(this.categoriesList);
    }
      
      
      );
   // this.categoryTypeService.GetCategoryTypes().subscribe(types => { this.lstTypes = types })
  }
  getCategoryByTypeId($event) {
    this.selectedTypeId = $event.target.value;
    this.categoryService.GetCategoryByCategoryTypeId($event.target.value).subscribe(categories => { this.categoriesList = categories })
  }

  filterSubCategoriesByCategoryId(cateId: number) {

    this.subCategoryService.GetSubCategoriesByCategoryId(cateId).subscribe(items => {
      this.subCategoriesList = items;
    })
    this.selectedcateId = cateId;


  }
  addCategory(typeId: number) {
    typeId = this.selectedTypeId;
    const ref = this.dialogService.open(CreateComponent, {
      header: this.lang == 'en' ? 'Add Category' : 'إضافة تصنيف',
      data: {
        typeId: typeId
      },
      width: '50%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe(() => {

      this.categoryService.GetCategoryByCategoryTypeId(this.selectedTypeId).subscribe(categories => { this.categoriesList = categories })
    });
  }


  editCategory(id: number) {
    const ref = this.dialogService.open(EditComponent, {
      header: this.lang == 'en' ? 'Edit Category' : 'تعديل تصنيف',
      data: {
        id: id
      },
      width: '50%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(() => {
      this.categoryService.GetCategoryByCategoryTypeId(this.selectedTypeId).subscribe(categories => { this.categoriesList = categories })

    });
  }


  addSubCategory() {
    if (this.selectedcateId != null) {
      const ref2 = this.dialogService.open(CreateSubCategoryComponent, {
        header: this.lang == 'en' ? 'Add Sub Category' : 'إضافة تصنيف فرعي',
        data: {
          cateId: this.selectedcateId
        },
        width: '50%',
        style: {
          'dir': this.lang == "en" ? 'ltr' : "rtl",
          "text-align": this.lang == "en" ? 'left' : "right",
          "direction": this.lang == "en" ? 'ltr' : "rtl"
        }
      });
      ref2.onClose.subscribe(res => {
        this.categoryService.GetCategoryByCategoryTypeId(this.selectedTypeId).subscribe(categories => { this.categoriesList = categories })
        this.filterSubCategoriesByCategoryId(this.selectedcateId);

      });
    }
    else {
      const ref3 = this.dialogService.open(CreateSubCategoryComponent, {
        header: this.lang == 'en' ? 'Add Sub Category' : 'إضافة تصنيف فرعي',
        width: '50%',
        style: {
          'dir': this.lang == "en" ? 'ltr' : "rtl",
          "text-align": this.lang == "en" ? 'left' : "right",
          "direction": this.lang == "en" ? 'ltr' : "rtl"
        }
      });

      ref3.onClose.subscribe(res => {
        this.categoryService.GetCategoryByCategoryTypeId(this.selectedTypeId).subscribe(categories => { this.categoriesList = categories })

        this.filterSubCategoriesByCategoryId(this.selectedcateId);
      });
    }
  }


  editSubCategory(id: number) {
    const ref = this.dialogService.open(EditSubCategoryComponent, {
      header: this.lang == 'en' ? 'Edit Sub Category' : 'تعديل تصنيف فرعي',
      data: {
        id: id
      },
      width: '50%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(res => {
      this.categoryService.GetCategoryByCategoryTypeId(this.selectedTypeId).subscribe(categories => { this.categoriesList = categories })
      this.filterSubCategoriesByCategoryId(this.selectedcateId);
    });
  }



  deleteCategory(id: number) {

    this.categoryService.GetCategoryById(id).subscribe((data) => {
      this.selectedcateObj = data;

      const categoryDialog = this.dialog
        .open(DeleteCategoryConfirmationComponent, {
          data: {
            id: id,
            name: this.selectedcateObj.name,
            nameAr: this.selectedcateObj.nameAr
          },
        });
      categoryDialog.afterClosed().subscribe(result => {
      //   this.categoryService.GetCategoryByCategoryTypeId(id).subscribe(categories => { this.categoriesList = categories })
      
    });
    });
  }



  deleteSubCategory(id: number) {

    this.subCategoryService.GetSubCategoryById(id).subscribe((data) => {
      this.selectedSubCateObj = data;

      const subCategoryDialog = this.dialog
        .open(DeletesubCategoryConfirmationComponent, {
          data: {
            id: this.selectedSubCateObj.id,
            name: this.selectedSubCateObj.name,
            nameAr: this.selectedSubCateObj.nameAr
          }
        });
      subCategoryDialog.afterClosed().subscribe(result => {

        this.categoryService.GetCategoryByCategoryTypeId(this.selectedTypeId).subscribe(categories => { this.categoriesList = categories })
        this.subCategoryService.GetSubCategoriesByCategoryId(this.selectedcateId).subscribe(items => {
          this.subCategoriesList = items;
        })
        this.selectedcateId = this.selectedcateId;



        // let currentUrl = this.route.url;
        // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.route.onSameUrlNavigation = 'reload';
        // this.route.navigate([currentUrl]);
      });
    });
  }
}
