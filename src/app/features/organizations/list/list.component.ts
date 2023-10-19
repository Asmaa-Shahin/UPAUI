import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListOrganizationVM, OrganizationVM } from 'src/app/shared/models/organizationVM';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { EditComponent } from '../edit/edit.component';
import { CreateComponent } from '../create/create.component';

import { LoggedUser } from 'src/app/shared/models/userVM';

import { DialogService } from 'primeng/dynamicdialog';
import { EditsuborganizationComponent } from '../../sub-organizations/editsuborganization/editsuborganization.component';
import { CreatesuborganizationComponent } from '../../sub-organizations/createsuborganization/createsuborganization.component';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSubOrgConfirmationComponent } from '../../sub-organizations/delete-sub-org-confirmation/delete-sub-org-confirmation.component';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  public lang = localStorage.getItem("lang");
  dir: string = "ltr";
  lstOrganizations: ListOrganizationVM[] = [];
  lstSubOrganizations: ListSubOrganizationVM[] = [];
  display: boolean = false;
  errorDisplay: boolean = false;

  errorMessage: string = "";
  selectedObj: OrganizationVM;
  selectedSubOrgId: number;
  selectedOrgId: number;
  currentUser: LoggedUser;
  lstRoleNames: string[] = [];

  imgOrgURL: string = "";
  imgNullOrgURL: string = "";
  constructor(private organizationService: OrganizationService,
    private subOrganizationService: SubOrganizationService, private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    public dialogService: DialogService, private route: Router) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {

    if (this.lang == "en") {
      this.dir = "ltr";
    }
    else {
      this.dir = "rtl";
    }
    this.loadOrganizations();



    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
    }
 this.imgNullOrgURL = `${environment.Domain}UploadedAttachments/OrgLogo/empty.png`;
  }
  loadOrganizations() {
    this.organizationService.GetOrganizations().subscribe(items => {
      this.lstOrganizations = items;

      this.imgOrgURL = `${environment.Domain}UploadedAttachments/OrgLogo/`;
      // this.lstOrganizations.forEach(element => {
      //   if(element.logo != null)
      //   this.imgOrgURL = `${environment.Domain}UploadedAttachments/OrgLogo/`;
      //   else if(element.logo == null) this.imgOrgURL = `${environment.Domain}UploadedAttachments/OrgLogo/empty.png`;
 // });
    
    });
  }

  filterProjectByOrganizationId(orgId: number) {
    this.lstSubOrganizations = [];
    this.subOrganizationService.GetSubOrganizationByOrgId(orgId).subscribe(items => {
      this.lstSubOrganizations = items;
    })
  }

  addOrg() {
    const ref = this.dialogService.open(CreateComponent, {
      header: this.lang == 'en' ? 'Add Organization' : 'إضافة هيئة',

      width: '70%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }


  editOrg(id: number) {
    const ref = this.dialogService.open(EditComponent, {
      header: this.lang == 'en' ? 'Edit Organization' : 'تعديل هيئة ',

      data: {
        id: id
      },
      width: '70%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }


  addSubOrganization() {
    if (this.selectedOrgId != null) {
      const ref2 = this.dialogService.open(CreatesuborganizationComponent, {
        header: this.lang == 'en' ? 'Add Sub Organization' : 'إضافة هيئة فرعية',

        data: {
          orgId: this.selectedOrgId
        },
        width: '70%',
        style: {
          'dir': this.lang == "en" ? 'ltr' : "rtl",
          "text-align": this.lang == "en" ? 'left' : "right",
          "direction": this.lang == "en" ? 'ltr' : "rtl"
        }
      });
      ref2.onClose.subscribe(res => {
        this.ngOnInit();
        this.filterSubByOrganizationId(this.selectedOrgId);
      });
    }
    else {
      const ref3 = this.dialogService.open(CreatesuborganizationComponent, {
        header: this.lang == 'en' ? 'Add Sub Organization' : 'إضافة هيئة فرعية',

        width: '70%',
        style: {
          'dir': this.lang == "en" ? 'ltr' : "rtl",
          "text-align": this.lang == "en" ? 'left' : "right",
          "direction": this.lang == "en" ? 'ltr' : "rtl"
        }
      });

      ref3.onClose.subscribe(res => {
        this.ngOnInit();
        this.filterSubByOrganizationId(this.selectedOrgId);
      });
    }
  }


  editSubOrganization(id: number) {

    const ref = this.dialogService.open(EditsuborganizationComponent, {
      header: this.lang == 'en' ? 'Edit Sub Organization' : 'تعديل هيئة فرعية',

      data: {
        id: id
      },
      width: '70%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(res => {
      this.ngOnInit();
      this.filterSubByOrganizationId(this.selectedOrgId);
    });
  }


  filterSubByOrganizationId(orgId: number) {
    this.selectedOrgId = orgId;


    this.subOrganizationService.GetSubOrganizationByOrgId(orgId).subscribe(items => {
      this.lstSubOrganizations = items;
    })
  }

  deleteOrg(id: number) {

    this.organizationService.GetOrganizationById(id).subscribe((data) => {
      this.selectedObj = data;

      const orgDialog = this.dialog
        .open(DeleteconfirmationComponent, {
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });
      orgDialog.afterClosed().subscribe(redir => {
        this.ngOnInit();

        this.filterSubByOrganizationId(id);
      })
    });
  }



  deleteSubOrganization(id: number) {

    this.subOrganizationService.GetSubOrganizationById(id).subscribe((data) => {
      this.selectedObj = data;

      const orgDialog = this.dialog
        .open(DeleteSubOrgConfirmationComponent, {
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });

      orgDialog.afterClosed().subscribe(redir => {
        this.ngOnInit();
        this.filterSubByOrganizationId(this.selectedOrgId);
      })
    });
  }
}
