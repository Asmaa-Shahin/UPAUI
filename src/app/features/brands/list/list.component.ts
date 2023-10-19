import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EditBrandVM, ListBrandVM, SortBrandVM } from 'src/app/shared/models/brandVM';
import { Paging } from 'src/app/shared/models/paging';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { BrandService } from 'src/app/shared/services/brand.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { DeleteBrandConfirmationComponent } from '../delete-brand-confirmation/delete-brand-confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lang = localStorage.getItem("lang");
  brandsList: ListBrandVM[] = []
  selectedObj: EditBrandVM;
  page: Paging;
  count: number;
  currentUser: LoggedUser;

  loading: boolean = true;
  sortStatus: string = "ascending"
  sortObj: SortBrandVM;
  constructor(private authenticationService: AuthenticationService, private brandService: BrandService,
    private dialog: MatDialog, public dialogService: DialogService,
    private route: Router) { this.currentUser = this.authenticationService.currentUserValue; }


  ngOnInit(): void {
    this.page = {
      pagenumber: 1,
      pagesize: 10,
    }

    this.sortObj = {
      sortStatus: '', name: '', nameAr: '', code: ''
    }
    // this.brandService.getBrandsCount().subscribe((data) => {
    //   this.count = data;
    // });
  }
  clicktbl(event) {
    this.page.pagenumber = (event.first + 10) / 10;
    this.page.pagesize = event.rows;


    // this.brandService.GetBrandsWithPaging(this.page).subscribe((items) => {
    //   this.brandsList = items;
    //   this.loading = false;
    // });
  }
  deleteBrand(id: number) {

    this.brandService.GetBrandById(id).subscribe((data) => {
      this.selectedObj = data;

      const orgDialog = this.dialog
        .open(DeleteBrandConfirmationComponent, {
          width: '50%',
          autoFocus: true,
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });
    });

    this.route.navigate(['/dash/brands']);
  }


  sort(field) {


    // this.sortObj.userId = this.currentUser.id;
    // this.sortObj.id = this.currentUser.id;
    if (this.sortStatus === "descending") {
      this.sortStatus = "ascending";
      this.sortObj.sortStatus = this.sortStatus;
    }
    else {
      this.sortStatus = "descending"
      this.sortObj.sortStatus = this.sortStatus;
    }

    if (field.currentTarget.id == "Name") {
      this.sortObj.name = field.currentTarget.id
    }
    else if (field.currentTarget.id == "الاسم") {
      this.sortObj.nameAr = field.currentTarget.id
    }
    if (field.currentTarget.id == "Code") {
      this.sortObj.code = field.currentTarget.id
    }
    else if (field.currentTarget.id == "الكود") {
      this.sortObj.code = field.currentTarget.id
    }

    // this.brandService.sortBrands(this.page.pagenumber, this.page.pagesize, this.sortObj).subscribe(data => {
    //   this.brandsList = data;
    //   this.sortStatus = this.sortObj.sortStatus;
    //   this.sortObj = {
    //     sortStatus: '', name: '', nameAr: '', code: ''
    //   }
    // })
  }


  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }

}
