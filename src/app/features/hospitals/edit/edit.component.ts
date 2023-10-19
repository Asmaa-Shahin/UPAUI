import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListCityVM } from 'src/app/shared/models/cityVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { EditHospitalDepartmentVM, EditHospitalVM } from 'src/app/shared/models/hospitalVM';
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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentUser: LoggedUser;
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';

  form: FormGroup;
  hospitalObj: EditHospitalVM;
  editHospitalDepartmentObj: EditHospitalDepartmentVM;
  lstGovernorates: ListGovernorateVM[]=[];
  lstCities: ListCityVM[]=[];
  lstOrganizations: ListOrganizationVM[]=[];
  lstSubOrganizations: ListSubOrganizationVM[]=[];
  selectedCategory: any;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  lstdeparts: number[];

  constructor(private hospitalService: HospitalService, private authenticationService: AuthenticationService,
  
     private organizationService: OrganizationService,
    private subOrganizationService: SubOrganizationService, private cityService: CityService, private governorateService: GovernorateService, private config: DynamicDialogConfig, private ref: DynamicDialogRef,
    private ngZone: NgZone, private datePipe: DatePipe, private route: Router, private formBuilder: FormBuilder,private activeRoute: ActivatedRoute) {
    this.currentUser = this.authenticationService.currentUserValue;

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, Validators.required]
    });
  }


  ngOnInit(): void {
 
    this.hospitalObj = {
      id: 0, code: "", name: "", nameAr: "", mobile: "", email: "", address: "", addressAr: "", managerName: "", managerNameAr: "", latitude: 0, longtitude: 0, subOrganizationId: 0, cityId: 0, governorateId: 0, organizationId: 0, departments: [],
      enableDisableDepartments: [], contractEnd: new Date, cityName:'',cityNameAr:'',governorateName:'',governorateNameAr:'',orgName:'',orgNameAr:'', subOrgName:'',subOrgNameAr:'',
      contractName: '', contractStart: new Date, strContractEnd: '', strContractStart: ''
    }
    this.editHospitalDepartmentObj = { id: 0, departmentId: 0, hospitalId: 0 }


    let id = this.config.data.id;


   // let id = this.activeRoute.snapshot.params['id'];
    this.hospitalService.GetHospitalById(id).subscribe(
      data => {
        this.hospitalObj = data;
        // this.hospitalObj.contractStart = new Date(this.datePipe.transform(data.contractStart, "yyyy-MM-dd"));
        // this.hospitalObj.contractEnd = new Date(this.datePipe.transform(data.contractEnd, "yyyy-MM-dd"));


        this.cityService.GetCitiesByGovernorateId(this.hospitalObj.governorateId).subscribe(cities => {
          this.lstCities = cities;
        });
        this.subOrganizationService.GetSubOrganizationByOrgId(this.hospitalObj.organizationId).subscribe(subs => {
          this.lstSubOrganizations = subs;
        });
      });



    this.governorateService.GetGovernorates().subscribe(items => {
      this.lstGovernorates = items;
    });

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
    this.hospitalObj.organizationId =$event.target.value;
    this.subOrganizationService.GetSubOrganizationByOrgId($event.target.value).subscribe(suborgs => {
      this.lstSubOrganizations = suborgs;
    });
  }



  onSubmit() :any{
    if (this.hospitalObj.organizationId == 0) {
      this.errorDisplay = true;
      this.errorMessage = "Please select Organization";
      return false;
    }

    if (this.hospitalObj.governorateId == 0) {
      this.errorDisplay = true;
      this.errorMessage = "Please select governorate";
      return false;
    }

    if (this.hospitalObj.cityId == 0) {
      this.errorDisplay = true;
      this.errorMessage = "Please select city";
      return false;
    }

    if (this.hospitalObj.subOrganizationId == 0) {
      this.errorDisplay = true;
      this.errorMessage = "Please select sub organization";
      return false;
    }
    else {
     // console.log(" this.hospitalObj", this.hospitalObj);

      this.hospitalObj.departments = this.lstdeparts;
      this.hospitalService.UpdateHospital(this.hospitalObj).subscribe(result => {
        this.display = true;
        //this.route.navigate(['/dash/hospitals']);
        this.ref.close();
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

  // getContractStartDate($event) {
  //   this.hospitalObj.strContractStart = this.datePipe.transform($event, "yyyy-MM-dd");
  // }
  // getContractEndDate($event) {
  //   this.hospitalObj.strContractEnd = this.datePipe.transform($event, "yyyy-MM-dd");
  // }

  reset() {
    this.hospitalObj = {
      id: 0, code: "", name: "", nameAr: "", mobile: "", email: "", address: "", addressAr: "", managerName: "", managerNameAr: "", latitude: 0, longtitude: 0, subOrganizationId: 0, cityId: 0, governorateId: 0, organizationId: 0, departments: [],
      enableDisableDepartments: [], contractEnd: new Date, cityName:'',cityNameAr:'',governorateName:'',governorateNameAr:'',orgName:'',orgNameAr:'', subOrgName:'',subOrgNameAr:'',
      contractName: '', contractStart: new Date, strContractEnd: '', strContractStart: ''
    }
  }
}




export class MapTable {
  lat: number;
  lng: number;
  address: string;
}

