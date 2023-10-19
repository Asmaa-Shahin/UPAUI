import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ListCityVM } from 'src/app/shared/models/cityVM';
import { GovernorateVM, ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { CreateCityComponent } from '../../cities/create-city/create-city.component';
import { DeletecityconfirmationComponent } from '../../cities/deletecityconfirmation/deletecityconfirmation.component';

import { EditCityComponent } from '../../cities/edit-city/edit-city.component';
import { CreateComponent } from '../create/create.component';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { EditComponent } from '../edit/edit.component';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lang = localStorage.getItem("lang");
  dir: string = "ltr";
  currentUser: LoggedUser;
  lstGovernorates: ListGovernorateVM[] = [];
  lstCities: ListCityVM[] = [];
  display: boolean = false;
  errorDisplay: boolean = false;
  errorMessage: string = "";
  selectedObj: GovernorateVM;
  selectedGovId: number;

  lstRoleNames: string[] = [];
  imgGovURL:string="";
  imgNullOrgURL: string = "";
  
  constructor(private governorateService: GovernorateService, private authenticationService: AuthenticationService,
    private cityService: CityService, private dialog: MatDialog, public dialogService: DialogService, private route: Router) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    if (this.lang == "en") {
      this.dir = "ltr";
    }
    else {
      this.dir = "rtl";
    }
    this.loadGovernorates();

    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
    }
    this.imgNullOrgURL = `${environment.Domain}UploadedAttachments/OrgLogo/empty.png`;
  }
  loadGovernorates() {
    this.governorateService.GetGovernorates().subscribe(items => {
      this.lstGovernorates = items;
      this.imgGovURL = `${environment.Domain}UploadedAttachments/GovernorateLogo/`;
    });
  }

  filterProjectByGovernorateId(govId: number) {
    this.lstCities = [];
    this.cityService.GetCitiesByGovernorateId(govId).subscribe(items => {
      this.lstCities = items;
    })
  }

  addGovernorate() {
    const ref = this.dialogService.open(CreateComponent, {
      width: '50%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(() => {
      this.reset();
    });
  }




  editGovernorate(id: number) {
    const ref = this.dialogService.open(EditComponent, {
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
      this.ngOnInit();
    });
  }


  addCity() {
    if (this.selectedGovId != null) {
      const ref2 = this.dialogService.open(CreateCityComponent, {
        data: {
          govId: this.selectedGovId
        },
        width: '50%',
        style: {
          'dir': this.lang == "en" ? 'ltr' : "rtl",
          "text-align": this.lang == "en" ? 'left' : "right",
          "direction": this.lang == "en" ? 'ltr' : "rtl"
        }
      });
      ref2.onClose.subscribe(res => {
        this.ngOnInit();
        this.filterProjectByGovernorateId(this.selectedGovId);
      });
    }
    else {
      const ref3 = this.dialogService.open(CreateCityComponent, {
        width: '50%',
        style: {
          'dir': this.lang == "en" ? 'ltr' : "rtl",
          "text-align": this.lang == "en" ? 'left' : "right",
          "direction": this.lang == "en" ? 'ltr' : "rtl"
        }
      });

      ref3.onClose.subscribe(res => {
        this.reset();
      });
    }
  }


  editCity(id: number) {

    const ref = this.dialogService.open(EditCityComponent, {
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
      this.ngOnInit();
      this.filterProjectByGovernorateId(this.selectedGovId);
    });
  }


  filterCitiesByGovernorateId(govId: number) {

    this.cityService.GetCitiesByGovernorateId(govId).subscribe(items => {
      this.lstCities = items;
    })
    this.selectedGovId = govId;


  }

  deleteGovernorate(id: number) {

    this.governorateService.GetGovernorateById(id).subscribe((data) => {
      this.selectedObj = data;

      const govDialog = this.dialog
        .open(DeleteconfirmationComponent, {
          width: '50%',
          autoFocus: true,
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });

      govDialog.afterClosed().subscribe(deleted => {
        this.reset();
      });
    });

    this.route.navigate(['/dash/governorates']);
  }



  deleteCity(id: number) {

    this.cityService.GetCityById(id).subscribe((data) => {
      this.selectedObj = data;

      const govDialog = this.dialog
        .open(DeletecityconfirmationComponent, {
          width: '50%',

          autoFocus: true,
          data: {
            id: this.selectedObj.id,
            name: this.selectedObj.name,
            nameAr: this.selectedObj.nameAr
          },
        });
      govDialog.afterClosed().subscribe(deleted => {
        this.reset();
      });
    });

    // this.route.navigate(['/dash/governorates']);
  }



  reset() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
}
