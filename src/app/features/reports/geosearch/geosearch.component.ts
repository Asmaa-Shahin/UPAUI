import { Component } from '@angular/core';
import { delay, of } from 'rxjs';
import { EditAssetDetailVM, ListAssetDetailVM, SortAssetVM } from 'src/app/shared/models/assetDetailVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { Paging } from 'src/app/shared/models/paging';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-geosearch',
  templateUrl: './geosearch.component.html',
  styleUrls: ['./geosearch.component.scss']
})
export class GeosearchComponent {
  sortObj: SortAssetVM;
  sortStatus: string = "descending";
  errorDisplay: boolean = false;
  errorMessage: string;
  lang = localStorage.getItem("lang");

  lstRoleNames: string[] = [];
  isHospital: boolean = false;
  loading: boolean = true;
  page: Paging;
  statusId: number = 0;
  count: number;
  showDiv1: boolean = false;
  showDiv2: boolean = false;
  showDiv3: boolean = false;
  deptId: number = 0;
  hospitalId: number = 0;
  governorateId: number = 0;
  imgURL: string;
  lstAssets: ListAssetDetailVM[] = [];
  lstGovernorates: ListGovernorateVM[] = [];
  lstHospitals: ListHospitalVM[] = [];
  // lstDepartments: ListHospitalDepartmentVM[] = [];
  selectedObj: EditAssetDetailVM;
  // searchObj: SearchHospitalAssetVM;
  field2: any = null;

  govname: string = "";
  govnameAr: string = "";
  hosname: string = "";
  hosnameAr: string = "";
  DeptName: string = "";
  DeptNameAr: string = "";


  dataMap = new Map<string, string[]>([
    ["Fruits", ["Apple", "Orange", "Banana"]],
    ["Vegetables", ["Tomato", "Potato", "Onion"]],
    ["Apple", ["Fuji", "Macintosh"]],
    ["Onion", ["Yellow", "White", "Purple"]],
    ["Macintosh", ["Yellow", "White", "Purple"]],
  ]);

  rootLevelNodes: string[] = ["Fruits", "Vegetables"];

  constructor(
    private assetDetailService: AssetDetailService,
    private hospitalService: HospitalService, private governorateService: GovernorateService) {  }

  ngOnInit(): void {

    this.page = {
      pagenumber: 1,
      pagesize: 10,
    };
    this.sortObj = {
      model: '',
      masterAssetId: 0, brand: "", supplier: '', userId: '', barCodeValue: '', barCode: '', statusId: 0, hospitalId: 0, governorateId: 0, cityId: 0, subOrganizationId: 0, organizationId: 0, originId: 0, supplierId: 0, brandId: 0,
      serialValue: '', serial: '', Id: 0, assetName: '', assetNameAr: '', orgName: '', orgNameAr: '', cityName: '', cityNameAr: '', sortStatus: '', supplierName: '', supplierNameAr: '',
      governorateName: '', governorateNameAr: '', hospitalName: '', hospitalNameAr: '', Code: '', departmentId: 0, subOrgName: '', subOrgNameAr: '', brandName: '', brandNameAr: ''

    }
    this.showDiv1 = false;
    this.showDiv2 = false;

    this.getGovernorates();
  }

  getGovernorates() {
    this.governorateService.GetGovernorates().subscribe(data => {
      this.lstGovernorates = data;
      this.imgURL = `${environment.Domain}UploadedAttachments/GovernorateLogo/`;


    });
    this.assetDetailService.GetAssetDetailsByGovIdAndHospitalIdAndDepartmentId2(this.deptId, this.governorateId, this.hospitalId,  this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = data.results;
      this.count = data.count;
    });
    this.showDiv3 = true;
  }

  getHospitalsByGovernorateId(govId: number, name: string, nameAr: string) {

    this.govname = name;
    this.hosname = "";
    this.hosnameAr = "";
    this.govnameAr = nameAr;


    this.hospitalService.getHospitalByGovId(govId).subscribe(data => {
      this.lstHospitals = data;
    });
console.log(this.lstHospitals);
    this.governorateId = govId;
    this.assetDetailService.GetAssetDetailsByGovIdAndHospitalIdAndDepartmentId2(this.deptId, govId, this.hospitalId, this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = data.results;
      this.count = data.count;
    });
    this.showDiv1 = true;
  
    this.showDiv3 = true;

  
  }

  getAssetsByHosId(hospitalId: number, name, nameAr) {


    this.hosname = name;
    this.hosnameAr = nameAr;
    this.showDiv3 = false;

    this.hospitalId = hospitalId;

    this.governorateId = 0;
    this.assetDetailService.GetAssetDetailsByGovIdAndHospitalIdAndDepartmentId2(this.deptId, this.governorateId, this.hospitalId,  this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = data.results;
      this.count = data.count;
    });
    
    this.showDiv3 = true;
  }

  reset() {
    this.assetDetailService.GetAssetDetailsByGovIdAndHospitalIdAndDepartmentId2(0, 0, 0, this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = data.results;
      this.count = data.count;
    });
  }

  sort(field) {

    this.field2 = field;
    this.sortObj.governorateId = this.governorateId;
    this.sortObj.departmentId = this.deptId;
    // this.sortObj.departmentId2=this.deptId;


    // this.searchObj.governorateId=this.governorateId

    this.sortObj.barCode = '';
    this.sortObj.assetName = '';
    this.sortObj.assetNameAr = '';
    this.sortObj.brandName = '';
    this.sortObj.brandNameAr = '';
    this.sortObj.hospitalName = '';
    this.sortObj.hospitalNameAr = '';
  
    this.sortObj.serial = '';
    this.sortObj.hospitalId = this.hospitalId;
    this.sortObj.model = '';
console.log(field.currentTarget.id);

    if (this.sortStatus == "descending") {
      this.sortStatus = "ascending";
      this.sortObj.sortStatus = this.sortStatus;
    }
    else {
      this.sortStatus = "descending"
      this.sortObj.sortStatus = this.sortStatus;
    }


    if (field.currentTarget.id == "Barcode") {
      this.sortObj.barCode = field.currentTarget.id;
    }
    else if (field.currentTarget.id == "الباركود") {
      this.sortObj.barCode = field.currentTarget.id;
    }

    else if (field.currentTarget.id == "Name") {
      this.sortObj.assetName = field.currentTarget.id;
      console.log( this.sortObj.assetName);
    }
    else if (field.currentTarget.id == "الاسم") {
      this.sortObj.assetNameAr = field.currentTarget.id;
    }

    else if (field.currentTarget.id == "Hospital") {
      this.sortObj.hospitalName = field.currentTarget.id;
    }
    else if (field.currentTarget.id == "المستشفى") {
      this.sortObj.hospitalNameAr = field.currentTarget.id;
    }

    else if (field.currentTarget.id == "Model") {
      this.sortObj.model = field.currentTarget.id;
    }
    else if (field.currentTarget.id == "رقم الموديل") {
      this.sortObj.model = field.currentTarget.id;
    }





    else if (field.currentTarget.id == "Serial") {
      this.sortObj.serial = field.currentTarget.id
    }
    else if (field.currentTarget.id == "السيريال") {
      this.sortObj.serial = field.currentTarget.id;
    }

    else if (field.currentTarget.id == "Supplier") {
      this.sortObj.supplierName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "المورد") {
      this.sortObj.supplierNameAr = field.currentTarget.id
    }

    else if (field.currentTarget.id == "Brand") {
      this.sortObj.brandName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "Hospital") {
      this.sortObj.hospitalName = field.currentTarget.id;
    }
    else if (field.currentTarget.id == "مستشفى") {
      this.sortObj.hospitalNameAr = field.currentTarget.id;
    }
    else if (field.currentTarget.id == "الماركة") {
      this.sortObj.brandNameAr = field.currentTarget.id;
    }




    this.assetDetailService.sortAssetWithoutSearch(this.sortObj, this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = [];
      this.lstAssets = data.results;
      this.count = data.count;

      this.sortStatus = this.sortObj.sortStatus;
    });


  }
  sort2(field) {
    console.log(this.deptId);
    this.sortObj.governorateId = this.governorateId;
    this.sortObj.departmentId = this.deptId;
    // this.sortObj.departmentId2=this.deptId;


    // this.searchObj.governorateId=this.governorateId


    this.sortObj.hospitalId = this.hospitalId;



    this.sortObj.sortStatus = this.sortStatus;



    if (field.currentTarget.id == "Barcode") {
      this.sortObj.barCode = field.currentTarget.id
    }
    else if (field.currentTarget.id == "الباركود") {
      this.sortObj.barCode = field.currentTarget.id
    }

    else if (field.currentTarget.id == "Name") {
      this.sortObj.assetName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "الاسم") {
      this.sortObj.assetNameAr = field.currentTarget.id
    }

    else if (field.currentTarget.id == "Hospital") {
      this.sortObj.hospitalName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "المستشفى") {
      this.sortObj.hospitalNameAr = field.currentTarget.id
    }





    else if (field.currentTarget.id == "Model") {
      this.sortObj.model = field.currentTarget.id;
    }
    else if (field.currentTarget.id == "رقم الموديل") {
      this.sortObj.model = field.currentTarget.id;
    }


    else if (field.currentTarget.id == "Serial") {
      this.sortObj.serial = field.currentTarget.id
    }
    else if (field.currentTarget.id == "السيريال") {
      this.sortObj.serial = field.currentTarget.id;
    }

    else if (field.currentTarget.id == "Supplier") {
      this.sortObj.supplierName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "المورد") {
      this.sortObj.supplierNameAr = field.currentTarget.id
    }

    else if (field.currentTarget.id == "Brand") {
      this.sortObj.brandName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "Hospital") {
      this.sortObj.hospitalName = field.currentTarget.id
    }
    else if (field.currentTarget.id == "مستشفى") {
      this.sortObj.hospitalNameAr = field.currentTarget.id
    }
    else if (field.currentTarget.id == "الماركة") {
      this.sortObj.brandNameAr = field.currentTarget.id
    }




    this.assetDetailService.sortAssetWithoutSearch(this.sortObj, this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = data.results;
      this.count = data.count;

      this.sortStatus = this.sortObj.sortStatus;
    });


  }
  clicktbl(event) {

    this.page.pagenumber = (event.first + 10) / 10;
    this.page.pagesize = event.rows;
    this.lstAssets = [];

    this.assetDetailService.GetAssetDetailsByGovIdAndHospitalIdAndDepartmentId2(this.deptId, this.governorateId, this.hospitalId,  this.page.pagenumber, this.page.pagesize).subscribe(data => {
      this.lstAssets = data.results;
      console.log(this.lstAssets);
      this.count = data.count;
    });
    this.showDiv3 = true;

    if (this.field2 != null) {
      this.sort2(this.field2);
    }


  }


  getChildren(node: string) {
    // adding delay to mock a REST API call
    return of(this.dataMap.get(node)).pipe(delay(1000));
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
