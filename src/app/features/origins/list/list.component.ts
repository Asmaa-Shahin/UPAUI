import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EditOriginVM, ListOriginVM, SortOriginVM } from 'src/app/shared/models/originVM';
import { Paging } from 'src/app/shared/models/paging';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { OriginService } from 'src/app/shared/services/origin.service';
import { DeleteOriginsConfirmationComponent } from '../delete-origins-confirmation/delete-origins-confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lang = localStorage.getItem("lang");
  originsList: ListOriginVM[] = []
  selectedObj: EditOriginVM;
  page: Paging;
  currentUser: LoggedUser;
  count: number;
  loading: boolean = true;
  sortStatus: string = "ascending";
  sortObj: SortOriginVM;

  constructor(private authenticationService: AuthenticationService, private originService: OriginService,
    private dialog: MatDialog, public dialogService: DialogService,
    private route: Router) { this.currentUser = this.authenticationService.currentUserValue; }


  ngOnInit(): void {
    this.page = {
      pagenumber: 1,
      pagesize: 10,
    }
    this.sortObj = {
      sortStatus: '', name: '', nameAr: '', code: '', id: 0
    }
    // this.originService.GetOriginsWithPaging(this.page).subscribe(data => {
    //   this.originsList = data;
    //   this.loading = false;
    // });
    // this.originService.getCount().subscribe((data) => {
    //   this.count = data;
    // });

  }
  deleteOrigin(id: number) {

    this.originService.GetOriginById(id).subscribe((data) => {
      this.selectedObj = data;

      const orgDialog = this.dialog
        .open(DeleteOriginsConfirmationComponent, {
          width: '50%',
          autoFocus: true,
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });
    });

    this.route.navigate(['/dash/origins']);
  }
  clicktbl(event) {
    this.page.pagenumber = (event.first + 10) / 10;
    this.page.pagesize = event.rows;
    // this.originService.GetOriginsWithPaging(this.page).subscribe((items) => {
    //   this.originsList = items;
    //   this.loading = false;
    // });
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

    this.originService.SortOrigins(this.page.pagenumber, this.page.pagesize, this.sortObj).subscribe(data => {
      this.originsList = data;
      this.loading = false;
      this.sortStatus = this.sortObj.sortStatus;
      this.sortObj = {
        sortStatus: '', name: '', nameAr: '', code: '', id: 0
      }
    });
  }

}
