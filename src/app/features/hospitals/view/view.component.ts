import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailHospitalVM, EditHospitalVM } from 'src/app/shared/models/hospitalVM';
import { HospitalService } from 'src/app/shared/services/hospital.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  lstdeparts: number[];
  hospitalObj: EditHospitalVM ;


  selectedCategory: any;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;

  constructor(private hospitalService: HospitalService,private  activeRoute:ActivatedRoute,   private config: DynamicDialogConfig,    private ref: DynamicDialogRef) {
  }


  ngOnInit(): void {

    this.hospitalObj = {
      id: 0, code: "", name: "", nameAr: "", mobile: "", email: "", address: "", addressAr: "", managerName: "", managerNameAr: "", latitude: 0, longtitude: 0, subOrganizationId: 0, cityId: 0, governorateId: 0, organizationId: 0, departments: [],
      enableDisableDepartments: [], contractEnd: new Date, cityName:'',cityNameAr:'',governorateName:'',governorateNameAr:'',orgName:'',orgNameAr:'', subOrgName:'',subOrgNameAr:'',
      contractName: '', contractStart: new Date, strContractEnd: '', strContractStart: ''
    }

   let id = this.config.data.id;
  //  let id = this.activeRoute.snapshot.params['id'];
    this.hospitalService.GetHospitalById(id).subscribe(
      data => {

        this.hospitalObj = data;
        if (this.hospitalObj.departments != null) {
          this.lstdeparts = this.hospitalObj.departments;
        }
        else
          this.lstdeparts = [];




      });
  }

  close() {
    this.ref.close();
  }
}
