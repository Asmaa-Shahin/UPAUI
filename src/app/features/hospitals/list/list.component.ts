import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HospitalVM, ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { AssetCountParam, FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { CreateComponent, Item } from '../create/create.component';
import { ViewComponent } from '../view/view.component';
import { EditComponent } from '../edit/edit.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { ListOrganizationVM, OrganizationVM } from 'src/app/shared/models/organizationVM';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  currentUser: LoggedUser;
  sortStatus:string="ascending";
  count: number;
  dropdownSettingsCode: IDropdownSettings = {};
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsName: IDropdownSettings = {};
  lstSubOrg:ListSubOrganizationVM[];
  lstHospitals: ListHospitalVM[] = [];
  lstHospitals2: ListHospitalVM[] = [];
  selectedObj: HospitalVM;
  CodeIds:number[]=[];
  nameIds:string[]=[];
  govIds:number[]=[];
  orgIds:number[]=[];
  subOrgIds:number[]=[];
  selectedSubOrgItems:any;
  selectedOrgItems:any;
  selectedGovItems:any;
  selectedNameItems:any;
  selectedCodeItems:any;
  // OrgIds:number[];
  loading: boolean = true;
  listOrg:ListOrganizationVM[]
  assetCountParams: FiletrAssetCountParam;
  listOfCodes:number[];
  lstGovernorates:ListGovernorateVM[]=[];
  constructor(private organizationService:OrganizationService,private governorateService:GovernorateService,
    private subOrganizationService:SubOrganizationService,private authenticationService: AuthenticationService, private hospitalService: HospitalService,
    private dialog: MatDialog, private router: Router, public dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

  }




  ngOnInit(): void {
    this.dropdownSettingsCode = {
      singleSelection: false,
      idField: 'code' ,
      textField: 'code',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText:'code',
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsName = {
      singleSelection: false,
      idField:this.lang == "en" ? 'name' : 'nameAr',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.lang == "en" ? 'name' : 'nameAr',
    };
    this.onLoad();

  }
  
  onLoad() {
    this.assetCountParams = { name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
   this.assetCountParams.pageSize=0;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals2 = hospitals.results;
  
    
      this.count = hospitals.count;
      this.loading = false;
    });
    this.governorateService.GetGovernorates().subscribe(govs => {
      this.lstGovernorates = govs;
    });
    this.organizationService.GetOrganizations().subscribe(data=>{
this.listOrg=data;

    });
    this.subOrganizationService.GetSubOrganizations().subscribe(data=>{

this.lstSubOrg=data;
    })

  }
  sortAfterSearch($event){


    if (this.sortStatus == "descending") {
      this.sortStatus = "ascending";
      this.assetCountParams.sortStatus = this.sortStatus;
    }
    else {
      this.sortStatus = "descending";

      this.assetCountParams.sortStatus = this.sortStatus;
    }

   
    this.assetCountParams.sort = $event.currentTarget.id;
    
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  clicktbl(event) {
    this.assetCountParams.pageIndex = (event.first + 10) / 10;
    this.assetCountParams.pageSize = event.rows;

    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  addHospital() {
    const dialogRef2 = this.dialogService.open(CreateComponent, {
      header: this.lang == "en" ? 'Add Hospital' : "اضف مستشفى",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reload();
    });
  }
  viewHospital(id: number) {
    const dialogRef2 = this.dialogService.open(ViewComponent, {
      header: this.lang == "en" ? 'View Hospital' : "بيانات المستشفى",
      data: {
        id: id
      },
      style: {
        'width':'85%',
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
   
    });
  }
  deleteHospital(id: number) {
    this.hospitalService.GetHospitalById(id).subscribe((data) => {
      this.selectedObj = data;

      const dialogRef2 = this.dialog.open(DeleteconfirmationComponent, {
        data: {
          id: this.selectedObj.id,
          name: this.selectedObj.name,
          nameAr: this.selectedObj.nameAr,
        },
      });
      dialogRef2.afterClosed().subscribe(deleted => {
        this.reload();
      });
    });

  }
  editHospital(id: number) {
    const ref = this.dialogService.open(EditComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Hospital' : "تعديل مستشفى",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe((res) => {
      this.reload();
    });
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  reset() {
    this.reload();
  }
  
  onCodeDeselect(item: any) {
    const index = this.CodeIds.indexOf(item.code);
    if (index !== -1) {
      this.CodeIds.splice(index, 1);
    }
    this.assetCountParams.code = this.CodeIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });

  }
  onCodeDeselectAll(event) {
    this.CodeIds = [];
    this.assetCountParams.code = this.CodeIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  onCodeSelect(item: any) {
 

    this.CodeIds.push(item.code);
 
    this.assetCountParams.code = this.CodeIds;
 
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
   
  }
  onCodeSelectAll(items: any) {

    console.log(items);
    this.CodeIds=[];
    items.forEach(element => {
      this.CodeIds.push(element.code);
    });
    this.assetCountParams.code = this.CodeIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  onNameDeselect(item: any) {
    const index = this.nameIds.indexOf(this.lang=='en'?item.name:item.nameAr);
    console.log(item);
    if (index !== -1) {
      this.nameIds.splice(index, 1);
    }
    this.assetCountParams.name = this.nameIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });

  }
  onNameDeselectAll(event) {
    this.nameIds = [];
    this.assetCountParams.name = this.nameIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  onNameSelect(item: any) {
 

    this.nameIds.push(this.lang=='en'?item.name:item.nameAr);
 
    this.assetCountParams.name = this.nameIds;
 
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
   
  }
  onNameSelectAll(items: any) {

    
    this.nameIds=[];
    items.forEach(element => {
      this.nameIds.push(this.lang=='en'?element.name:element.nameAr);
    });
    this.assetCountParams.code = this.CodeIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }




  onGovDeselect(item: any) {
    const index = this.govIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.govIds.splice(index, 1);
    }
    this.assetCountParams.govId = this.govIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });

  }
  onGovDeselectAll(event) {
    this.govIds = [];
    this.assetCountParams.govId = this.govIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  onGovSelect(item: any) {
 

    this.govIds.push(item.id);
 
    this.assetCountParams.govId = this.govIds;
 
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
   
  }
  onGovSelectAll(items: any) {

    
    this.govIds=[];
    items.forEach(element => {
      this.govIds.push(element.id);
    });
    this.assetCountParams.govId = this.govIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }






  onOrgDeselect(item: any) {
    const index = this.orgIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.orgIds.splice(index, 1);
    }
    this.assetCountParams.orgId = this.orgIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });

  }
  onOrgDeselectAll(event) {
    this.orgIds = [];
    this.assetCountParams.orgId = this.orgIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  onOrgSelect(item: any) {
 

    this.orgIds.push(item.id);
 
    this.assetCountParams.orgId = this.orgIds;
 
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
   
  }
  onOrgSelectAll(items: any) {

    
    this.orgIds=[];
    items.forEach(element => {
      this.orgIds.push(element.id);
    });
    this.assetCountParams.orgId = this.orgIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }



  onSubOrgDeselect(item: any) {
    const index = this.subOrgIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.subOrgIds.splice(index, 1);
    }
    this.assetCountParams.subOrgId = this.subOrgIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });

  }
  onSubOrgDeselectAll(event) {
    this.subOrgIds = [];
    this.assetCountParams.subOrgId = this.subOrgIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  onSubOrgSelect(item: any) {
 

    this.subOrgIds.push(item.id);
 
    this.assetCountParams.subOrgId = this.subOrgIds;
 
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
   
  }
  onSubOrgSelectAll(items: any) {

    
    this.subOrgIds=[];
    items.forEach(element => {
      this.subOrgIds.push(element.id);
    });
    this.assetCountParams.subOrgId = this.subOrgIds;
    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
  }
  clearSearch(){
  
    this.assetCountParams.name=[];
    this.assetCountParams.code=[];
    this.assetCountParams.orgId=[];
    this.assetCountParams.govId=[];
    this.assetCountParams.subOrgId=[];
    
    this.nameIds=[];
    this.CodeIds=[];
    this.orgIds=[];
    this.subOrgIds=[];
    this.govIds=[];
    
  

    this.selectedNameItems='';
    this.selectedCodeItems='';
    this.selectedOrgItems='';
  
    this.selectedSubOrgItems=''
    this.selectedGovItems='';
   
   
   

    this.hospitalService.GetHospitals(this.assetCountParams).subscribe(hospitals => {
      this.lstHospitals = hospitals.results;
      this.count = hospitals.count;
      this.loading = false;
    });
    
      }
}
