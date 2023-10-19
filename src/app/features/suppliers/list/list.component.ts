import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Paging } from 'src/app/shared/models/paging';
import { EditSupplierVM, ListSupplierVM, SortSupplierVM } from 'src/app/shared/models/supplierVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SupplierService } from 'src/app/shared/services/supplierService.service';
import { DeletesupplierConfirmationComponent } from '../deletesupplier-confirmation/deletesupplier-confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lang = localStorage.getItem("lang");
  suppliersList: ListSupplierVM[] = []
  selectedObj: EditSupplierVM;
  page: Paging;
  currentUser: LoggedUser;
  count: number;
  loading: boolean = true;

  sortStatus: string = "descending";
  sortObj: SortSupplierVM;


  constructor(private authenticationService: AuthenticationService, private supplierService: SupplierService,
    private dialog: MatDialog, public dialogService: DialogService,
    private route: Router) { this.currentUser = this.authenticationService.currentUserValue; }


  ngOnInit(): void {
    this.page = {
      pagenumber: 1,
      pagesize: 10,
    };
    this.sortObj = {
      sortStatus: '', name: '', nameAr: '', code: '', id: 0, address: '', addressAr: '', contactPerson: '', email: '', mobile: ''
    }
  }

  clicktbl(event) {
    this.page.pagenumber = (event.first + 10) / 10;
    this.page.pagesize = event.rows;
    this.supplierService.GetSuppliers().subscribe((items) => {
        this.suppliersList = items;
      //   this.count = items.count;
      //   this.loading = false;
       });

    // this.supplierService.GetAllSuppliersWithPaging(this.page.pagenumber, this.page.pagesize).subscribe((items) => {
    //   this.suppliersList = items.results;
    //   this.count = items.count;
    //   this.loading = false;
    // });
  }
  deleteSupplier(id: number) {

    this.supplierService.GetSupplierById(id).subscribe((data) => {
      this.selectedObj = data;

      const supplierDialog = this.dialog
        .open(DeletesupplierConfirmationComponent, {
          width: '50%',
          autoFocus: true,
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });

      supplierDialog.afterClosed().subscribe(result => {
        let currentUrl = this.route.url;
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate([currentUrl]);
      });

    });
  }

  sort(field) {
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

    if (field.currentTarget.id == "Mobile") {
      this.sortObj.mobile = field.currentTarget.id
    }
    else if (field.currentTarget.id == "المحمول") {
      this.sortObj.mobile = field.currentTarget.id
    }

    if (field.currentTarget.id == "Address") {
      this.sortObj.address = field.currentTarget.id
    }
    else if (field.currentTarget.id == "العنوان") {
      this.sortObj.addressAr = field.currentTarget.id
    }

    if (field.currentTarget.id == "EMail") {
      this.sortObj.email = field.currentTarget.id
    }
    else if (field.currentTarget.id == "البريد الإلكتروني") {
      this.sortObj.email = field.currentTarget.id
    }
    if (field.currentTarget.id == "Contact Person") {
      this.sortObj.contactPerson = field.currentTarget.id
    }
    else if (field.currentTarget.id == "التواصل") {
      this.sortObj.contactPerson = field.currentTarget.id
    }






    // this.supplierService.sortSuppliers(this.page.pagenumber, this.page.pagesize, this.sortObj).subscribe(data => {
    //   this.suppliersList = data;
    //   this.sortStatus = this.sortObj.sortStatus;
    //   this.sortObj = {
    //     sortStatus: '', name: '', nameAr: '', code: '', id: 0, address: '', addressAr: '', contactPerson: '', email: '', mobile: ''
    //   }
    // });
  }


}
