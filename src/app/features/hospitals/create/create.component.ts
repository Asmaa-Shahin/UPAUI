import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListCityVM } from 'src/app/shared/models/cityVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { CreateHospitalVM, MapTable } from 'src/app/shared/models/hospitalVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  currentUser: LoggedUser;
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  form: FormGroup;
  hospitalObj: CreateHospitalVM;
  lstGovernorates: ListGovernorateVM[]=[];
  lstCities: ListCityVM[]=[];
  lstOrganizations: ListOrganizationVM[]=[];
  lstSubOrganizations: ListSubOrganizationVM[]=[];
  selectedCategory: any;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;

  imgGovURL: string = "";
  imgNullOrgURL: string = "";

  constructor(private hospitalService: HospitalService, private authenticationService: AuthenticationService,
    private organizationService: OrganizationService, private subOrganizationService: SubOrganizationService, private cityService: CityService, private governorateService: GovernorateService,
    private route: Router,  private router: Router,private ref: DynamicDialogRef, private formBuilder: FormBuilder) {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  ngOnInit(): void {

    this.onLoad();
    this.imgNullOrgURL = `${environment.Domain}UploadedAttachments/GovernorateLogo/empty.png`;


    this.governorateService.GetGovernorates().subscribe(items => {
      this.lstGovernorates = items;
      this.imgGovURL = `${environment.Domain}UploadedAttachments/GovernorateLogo/`;
 
    });
  }




  onLoad() {
    this.hospitalObj = {
      code: "", name: "", nameAr: "", mobile: "", email: "", address: "", addressAr: "", managerName: "", managerNameAr: "",
      latitude: 0, longtitude: 0, subOrganizationId: 0, cityId: 0, governorateId: 0, organizationId: 0, departments: [],
      contractEnd: new Date, contractName: '', contractStart: new Date, strContractEnd: '', strContractStart: ''
    }

    this.hospitalService.GenerateHospitalCode().subscribe(hostCode => {
      this.hospitalObj.code = hostCode["code"];
    })

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      displayName: [null, Validators.required],
    });

    // if (this.currentUser) {
    //   this.currentUser["roleNames"].forEach(element => {
    //     this.lstRoleNames.push(element["name"]);
    //   });
    //   }

    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    this.organizationService.GetOrganizations().subscribe(items => {
      this.lstOrganizations = items;
    });
  }

  getCitiesByGovId(govId: number) {
    this.cityService.GetCitiesByGovernorateId(govId).subscribe(cities => {
      this.lstCities = cities;
    });
  }

  getSubOrgByOrgId($event) {
    this.subOrganizationService.GetSubOrganizationByOrgId($event.target.value).subscribe(suborgs => {
      this.lstSubOrganizations = suborgs;
    });
  }

  onSubmit() {

    //this.hospitalObj.departments = this.lstdeparts;

    if (this.hospitalObj.organizationId == 0) {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select Organization";
      else
        this.errorMessage = "اختر هيئة";
      return false;
    }

    if (this.hospitalObj.governorateId == 0) {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select governorate";
      else
        this.errorMessage = "اختر محافظة";
      return false;
    }

    if (this.hospitalObj.cityId == 0) {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select city";
      else
        this.errorMessage = "اختر مدينة";
      return false;
    }

    if (this.hospitalObj.subOrganizationId == 0 &&this.lstSubOrganizations.length >0 ) {
      this.errorDisplay = true;
      if (this.lang == "en")
        this.errorMessage = "Please select sub organization";
      else
        this.errorMessage = "اختر هيئة فرعية";

      return false;
    }

    else {
      this.hospitalService.CreateHospital(this.hospitalObj).subscribe(result => {
        this.display = true;
        this.router.navigate(['/dash/hospitals']);
        //this.ref.close();
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
          }
          return false;
        });
    }
  }

  reset() {
    this.hospitalObj = {
      code: "", name: "", nameAr: "", mobile: "", email: "", address: "", addressAr: "", managerName: "", managerNameAr: "",
      latitude: 0, longtitude: 0, subOrganizationId: 0, cityId: 0, governorateId: 0, organizationId: 0, departments: [],
      contractEnd: new Date, contractName: '', contractStart: new Date, strContractEnd: '', strContractStart: ''
    }
  }
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
  onDialogClose(){
    this.reload();
    this.ref.close();

  }

}


export class Item {
  name: string;
  value: string;
}


