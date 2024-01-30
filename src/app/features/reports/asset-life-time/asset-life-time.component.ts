import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { EditAssetDetailVM, FilterAssetDetail, ListAssetDetailVM, SortAndSearchAssetVM, ViewAssetForReportVM } from 'src/app/shared/models/assetDetailVM';
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { ListMasterAssetVM, SortAndSearchMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { Paging } from 'src/app/shared/models/paging';
import { ListSubCategoryVM } from 'src/app/shared/models/subCategoryVM';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-asset-life-time',
  templateUrl: './asset-life-time.component.html',
  styleUrls: ['./asset-life-time.component.scss']
})
export class AssetLifeTimeComponent {
  @ViewChild('checkbox') checkbox: ElementRef;
  lang = localStorage.getItem("lang");
  lstAssets: ListAssetDetailVM[]=[];
  minAgeByYear: number;
  minAgeByMonth: number;
  maxAgeByYear: number;
  maxExpectedLife:number;
  minExpectedLife:number;
  maxAgeByMonth: number;
  lstAssets2: ListAssetDetailVM[]=[];
  lstHosp:ListHospitalVM[]=[];
  newLstAssets: ViewAssetForReportVM[] = [];
  lstSubCat:ListSubCategoryVM[]=[];
  showAlert=false;
  assetCountParam: FiletrAssetCountParam;
 data2:any[]=[];
  count: number;
  govIds:number[]=[];
  lstNames:string[]=[];
  lstHospital:number[]=[];
  lstBrandIds:number[]=[];
  lstOrgIds:number[]=[];
  lstSubOrgIds:number[]=[];
alert="not allowed max month and min Year";
  lstCategoryIds:number[]=[];
  lstSubCategoryIds:number[]=[];
  lstModels:number[]=[];
  hospitalIds:number[]=[];
  selectedItems:any;
  notSelected:boolean=false;
  selectedBrandItems:any;
  selectedCategoryItems:any;
  selectedSubCategoryItems:any;
  selectedHospitalItems:any;
  selectedNameItems:any;
  selectedModelItems:any;
  selectedOrgItems:any;
  selectedSubOrgItems:any;
  model:number[]=[];
  name:number[]=[];
  categoryIds:number[]=[];
  subCategoryIds:number[]=[];
  currentUser: LoggedUser;
  loading: boolean = true;
  selectedObj: EditAssetDetailVM;
  sortStatus:string;
  sortObject:SortAndSearchAssetVM;
   checkAll: boolean = false;
  pageSize:number=10;
  pageNumber:number=1;
  appendToClass: string = 'custom-calendar-popup';
 startDate :string;

 endDate :string;
 check2:any;
 selectAll = false;
selectedItems2: any[] = [];
 data4:any[]=[];
  data:any[]=[];
  hosList: ListHospitalVM[];
 lstMasterAssets:ListMasterAssetVM[];
 lstMasterAssets5:ListMasterAssetVM[];
  rangeDates: Date[] | undefined;
  lstCategories:ListCategoryVM[];
  lstBrands:ListBrandVM[];

  searchForm: FormGroup;
  orgList: ListOrganizationVM[];
  selectedElement: string;
  lstOrganization: ListOrganizationVM[] = [];
  page:Paging;
  filteredObj: FilterAssetDetail;
  subList: ListSubOrganizationVM[];
  govList: ListGovernorateVM[];
  HospitalExcel:EditAssetDetailVM;
  lstGovernorates:ListGovernorateVM[]=[];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsName:IDropdownSettings={};
  dropdownSettingsModel:IDropdownSettings={};
  sortObject2: SortAndSearchMasterAssetVM;
  constructor(private organizationService:OrganizationService,private subOrganizationService:SubOrganizationService,private fb: FormBuilder,private el: ElementRef,private categoryService:CategoryService,private governorateService:GovernorateService,private authenticationService: AuthenticationService,private dialog: MatDialog,
    private assetDetailService: AssetDetailService,private masterAssetService:MasterAssetService,private subCategoryService:SubCategoryService,private brandService:BrandService,private hospitalService:HospitalService ,private router: Router,public dialogService: DialogService ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
    
  ngOnInit(): void {
    this.filteredObj = {hospitalId:0,governorateId:0,organizationId:0,subOrganizationId:0, strPurchaseDateFrom:'',strPurchaseDateTo:'', categoryId: 0, periorityId: 0, selectedElement: '', hospitalName: '', hospitalNameAr: '', lang: '', printedBy: '', userId: '', statusId: 0, id: 0, name: '', brandId: 0, supplierId: 0, masterAssetId: 0, departmentId: 0, purchaseDateFrom: null, purchaseDateTo: null, start: '', end: '', assetName: '', assetNameAr: '' }
    this.searchForm = this.fb.group({
      governorate: [''],  // Set default values for your form controls if needed
      hospital: [''],
      organization: [''],
      subOrganization: [''],
      selectedItem:[''],
      brand:[''],
      purchaseDateTo:[''],

      purchaseDateFrom:['']

      // ... other form controls
    });
    this.hospitalService.GetAllLstHospitals().subscribe(brands => {
      this.lstHosp = brands;
     
    });
    this.organizationService.GetOrganizations().subscribe(brands => {
      this.lstOrganization = brands;
    
    });
    
    this.subOrganizationService.GetSubOrganizations().subscribe(brands => {
      this.subList = brands;
     
    });
    this.governorateService.GetGovernorates().subscribe(brands => {
      this.govList = brands;
    
    });
    this.assetCountParam = { name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
  
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsModel = {
      singleSelection: false,
      idField: 'model' ,
      textField: 'model',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'model',
    };
    this.dropdownSettingsName = {
      singleSelection: false,
      idField:this.lang == "en" ? 'assetName' : 'assetNameAr',
      textField: this.lang == "en" ? 'assetName' : 'assetNameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.lang == "en" ? 'name' : 'nameAr',
    };
 this.sortObject={
  sortBy:"",
  sortStatus:"",
searchBy:{govId:[],name:[],hospitalId:[],model:[],brandId:[],categoryId:[],subCategoryId:[],start:"",end:"",purchaseDateFrom:new Date(),purchaseDateTo:new Date(),orgId:[],subOrgId:[]}
 }
 this.sortObject2={sortBy:'',sortStatus:'',searchBy:{assetPeriorityId:[],brandId:[],name:[],model:[],code:[],originId:[],eCRIId:[]}};
this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
  this.lstAssets = result.results;
  console.log(this.lstAssets)
  this.count = result.count;
});
this.assetDetailService.SortAssetsafterSearch(this.sortObject, 0,0).subscribe(result => {
  this.lstAssets2 = result.results;
  this.data=this.lstAssets2;
  const uniqueEntries = [];
  this.lstAssets2.forEach(item => {
    const isDuplicate = uniqueEntries.some(entry =>
      entry.assetName === item.assetName && entry.assetNameAr === item.assetNameAr
    );
  
    if (!isDuplicate) {
      uniqueEntries.push(item);
    }
  });
  
  // Now, uniqueEntries contains objects with unique combinations of 'name' and 'nameAr'
  // You can assign it back to lstMasterAssets2 if needed
  this.lstAssets2 = uniqueEntries;
console.log(this.lstAssets2);
});

this.brandService.GetBrands().subscribe(data=>{

this.lstBrands=data;
})



this.masterAssetService.SortMasterAssetafterSearch(this.sortObject2,0,0).subscribe((items) => {
     
  this.lstMasterAssets5=items.results;
  const uniqueEntries = [];
   // Iterate through lstMasterAssets2 to filter out duplicates
   this.lstMasterAssets5.forEach(item => {
    const isDuplicate = uniqueEntries.some(entry =>
      entry.model === item.model 
    );
  
    if (!isDuplicate) {
      uniqueEntries.push(item);
    }
  });
  this.lstMasterAssets5=uniqueEntries;
  
});


  }
  highlightCoulmn(){
   
    this.pageNumber =1;
    this.pageSize =10;
  }
  sortAfterSearch(event) {
 
  
    if (this.sortStatus == "descending") {
      this.sortStatus = "ascending";
      this.sortObject.sortStatus = this.sortStatus;
    }
    else {
      this.sortStatus = "descending";

      this.sortObject.sortStatus = this.sortStatus;
    }

   
    this.sortObject.sortBy = event.currentTarget.id;

  


    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstAssets = data.results;
        this.count = data.count;
      }
      )

  }
  
  onStartDateChange(event: any) {
    // Handle changes in the start date input here
    this.sortObject.searchBy.start = this.startDate;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
    console.log('Start Date Changed:', this.startDate);
    // Perform your desired actions here
  }
  onEndDateChange(event: any) {
    // Handle changes in the end date input here
    this.sortObject.searchBy.end = this.endDate;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
    console.log('Start Date Changed:', this.startDate);
    console.log('End Date Changed:', this.endDate);
    // Perform your desired actions here
  }
  filterByAge(){


   this.lstAssets= this.lstAssets.filter(asset=>{
      
      const age=asset.ageOfAsset;
      return age>=this.minAgeByYear&&age<=this.maxAgeByYear;
    });
  }clicktbl($event) {

    this.pageNumber = ($event.first + 10) / 10;
    this.pageSize = $event.rows;
    
    
    // this.assetDetailService.GetAssets(this.assetCountParam).subscribe(data => {
    //   this.lstAssets = data.results;
    //   this.count = data.count;
    //   console.log(this.lstAssets);
    // });
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      console.log(this.lstAssets);
      if(this.selectAll==true){
        this.lstAssets.forEach(item=>{
          this.selectedItems2.push(item);
        })
      }
    
      this.count = result.count;
    });

  }
  checkAssetAge(item) {
    const assetYear = Math.floor(item / 12);
    const assetMonths = item % 12;

    if (this.lang === 'ar') {
        const yearsText = assetYear > 0 ? `${assetYear} سنة` : '';
        const monthsText = assetMonths > 0 ? ` و ${assetMonths} شهر` : '';

        return `${yearsText}${monthsText}`;
    } else {
        return `${assetYear} years, ${assetMonths} months`;
    }
}
  filterByGov(event){

  }
  filterByHos(event){

  }
  filterByOrg(event){


  }
  filterBySubOrg(event){


  }
  reset(){

  }
  onFilter() {
console.log(this.minAgeByMonth,this.minExpectedLife);
this.sortObject.searchBy.maxExpectedLife=this.maxExpectedLife;
this.sortObject.searchBy.minExpectedLife=this.minExpectedLife;
this.sortObject.searchBy.minAgeByMonth=this.minAgeByMonth;
this.sortObject.searchBy.maxAgeByMonth=this.maxAgeByMonth;
this.sortObject.searchBy.minAgeByYear=this.minAgeByYear;
this.sortObject.searchBy.maxAgeByYear=this.maxAgeByYear;
if(this.maxAgeByMonth !=null &&this.minAgeByYear!=null &&this.minAgeByMonth==null &&this.minAgeByMonth==null){

this.showAlert=true;
}
else if(this.maxAgeByMonth<this.minAgeByMonth &&this.minAgeByYear== null &&this.maxAgeByYear==null){

this.alert="not allowed min month > max month";
this.showAlert=true;
}
else if(this.maxAgeByYear<this.minAgeByYear){

  this.alert="not allowed min year > max year";
  this.showAlert=true;
  }
else{
  this.showAlert=false;
  this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
    this.lstAssets = result.results;
    this.count = result.count;
  });

}
   


  }selectElement(selectedItem){


  }

  onItemSelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.govIds.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.govId = this.govIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onSelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    items.forEach(element => {
      this.govIds.push(element.id);
    });
    this.sortObject.searchBy.govId = this.govIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onItemDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    const index = this.govIds.indexOf(item.id);
    if (index !== -1) {
      this.govIds.splice(index, 1);
    }
    this.sortObject.searchBy.govId = this.govIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onDeselectAll(event) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    this.govIds = [];
    this.sortObject.searchBy.govId = this.govIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }



  onNameSelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    this.lstNames.push(this.lang=='en'?item.assetName:item.assetNameAr);

    this.sortObject.searchBy.name = this.lstNames;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onNameSelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    items.forEach(element => {
      this.lstNames.push(this.lang=='en'?element.assetName:element.assetNameAr);
    });
    this.sortObject.searchBy.name = this.lstNames;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onNameDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    const index = this.lstNames.indexOf(this.lang=='en'?item.assetName:item.assetNameAr);
    if (index !== -1) {
      this.lstNames.splice(index, 1);
    }
    this.sortObject.searchBy.name = this.lstNames;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onNameDeselectAll(event) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstNames = [];
    this.highlightCoulmn();
    this.sortObject.searchBy.name = this.lstNames;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }


  onHospitalSelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstHospital.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.hospitalId = this.lstHospital;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onHospitalSelectAll(items: any) {
    this.notSelected=false;
    items.forEach(element => {
      this.lstHospital.push(element.id);
    });
    this.highlightCoulmn();
    this.sortObject.searchBy.hospitalId = this.lstHospital;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onHospitalDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    const index = this.lstHospital.indexOf(item.id);
    if (index !== -1) {
      this.lstHospital.splice(index, 1);
    }
    this.highlightCoulmn();
    this.sortObject.searchBy.hospitalId = this.lstHospital;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onHospitalDeselectAll(event) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstHospital = [];
    this.highlightCoulmn();
    this.sortObject.searchBy.hospitalId = this.lstHospital;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }


  onBrandSelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstBrandIds.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.brandId = this.lstBrandIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onBrandSelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
    items.forEach(element => {
      this.lstBrandIds.push(element.id);
    });
    this.highlightCoulmn();
    this.sortObject.searchBy.brandId = this.lstBrandIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onBrandDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    const index = this.lstBrandIds.indexOf(item.id);
    if (index !== -1) {
      this.lstBrandIds.splice(index, 1);
    }
    this.highlightCoulmn();
    this.sortObject.searchBy.brandId = this.lstBrandIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onBrandDeselectAll(event) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstBrandIds = [];
    this.sortObject.searchBy.brandId = this.lstBrandIds;
    this.highlightCoulmn();
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onSubOrgSelect(item){
    this.selectAll=false;
    this.notSelected=false;
    this.lstSubOrgIds.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.subOrgId = this.lstSubOrgIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
    onSubOrgDeselect(item){
      this.selectAll=false;
      this.notSelected=false;
      const index = this.lstSubOrgIds.indexOf(item.id);
      this.highlightCoulmn();
      if (index !== -1) {
        this.lstSubOrgIds.splice(index, 1);
      }
      this.sortObject.searchBy.subOrgId = this.lstSubOrgIds;
      this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
        this.lstAssets = result.results;
        this.count = result.count;
      });;

    }
    onSubOrgDeselectAll(item){
      this.selectAll=false;
      this.notSelected=false;
      this.lstSubOrgIds = [];
      this.sortObject.searchBy.subOrgId = this.lstSubOrgIds;
      this.highlightCoulmn();
      this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
        this.lstAssets = result.results;
        this.count = result.count;
      });
    }
    onSubOrgSelectAll(items){
      this.selectAll=false;
    this.notSelected=false;
    items.forEach(element => {
      this.lstSubOrgIds.push(element.id);
    });
    this.highlightCoulmn();
    this.sortObject.searchBy.subOrgId = this.lstSubOrgIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
    }
  

  onOrgSelect(item){

    this.selectAll=false;
    this.notSelected=false;
    this.lstOrgIds.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.orgId = this.lstOrgIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });

  }
  onOrgDeselect(item){
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    const index = this.lstOrgIds.indexOf(item.id);
    if (index !== -1) {
      this.lstOrgIds.splice(index, 1);
    }
    this.sortObject.searchBy.orgId = this.lstOrgIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;

  }
  onOrgDeselectAll(event){
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    this.lstOrgIds = [];
    this.sortObject.searchBy.orgId = this.lstOrgIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onOrgSelectAll(items){
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    items.forEach(element => {
      this.lstOrgIds.push(element.id);
    });
    this.sortObject.searchBy.orgId = this.lstOrgIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }

  onCategorySelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;

    this.lstCategoryIds.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.categoryId = this.lstCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onCategorySelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
    items.forEach(element => {
      this.lstCategoryIds.push(element.id);
    });
    this.highlightCoulmn();
    this.sortObject.searchBy.categoryId = this.lstCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onCategoryDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    const index = this.lstCategoryIds.indexOf(item.id);
    if (index !== -1) {
      this.lstCategoryIds.splice(index, 1);
    }
    this.highlightCoulmn();
    this.sortObject.searchBy.categoryId = this.lstCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onCategoryDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
    this.lstCategoryIds = [];
    this.sortObject.searchBy.categoryId = this.lstCategoryIds;
    this.highlightCoulmn();
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }




  onSubCategorySelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstSubCategoryIds.push(item.id);
    this.highlightCoulmn();
    this.sortObject.searchBy.subCategoryId = this.lstSubCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onSubCategorySelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
    items.forEach(element => {
      this.lstSubCategoryIds.push(element.id);
    });
    this.highlightCoulmn();
    this.sortObject.searchBy.subCategoryId = this.lstSubCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onSubCategoryDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.highlightCoulmn();
    const index = this.lstSubCategoryIds.indexOf(item.id);
    if (index !== -1) {
      this.lstSubCategoryIds.splice(index, 1);
    }
    this.sortObject.searchBy.subCategoryId = this.lstSubCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onSubCategoryDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
    this.lstSubCategoryIds = [];
    this.highlightCoulmn();
    this.sortObject.searchBy.subCategoryId = this.lstSubCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }


  
  onModelSelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstModels.push(item.model);
    this.highlightCoulmn();
    this.sortObject.searchBy.model = this.lstModels;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onModelSelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
    items.forEach(element => {
      this.lstModels.push(element.model);
    });
    this.highlightCoulmn();
    this.sortObject.searchBy.model = this.lstModels;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onModelDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    const index = this.lstModels.indexOf(item.model);
    if (index !== -1) {
      this.lstModels.splice(index, 1);
    }
    this.highlightCoulmn();
    this.sortObject.searchBy.model = this.lstModels;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onModelDeselectAll(event) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstModels = [];
    this.highlightCoulmn();
    this.sortObject.searchBy.model = this.lstModels;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  clearSearch(){
    this.highlightCoulmn();
    this.sortObject.searchBy.brandId=[];
    this.sortObject.searchBy.name=[];
    this.sortObject.searchBy.categoryId=[];
    this.sortObject.searchBy.model=[];
    this.sortObject.searchBy.subCategoryId=[];
    this.sortObject.searchBy.start='';
    this.sortObject.searchBy.end='';
    this.sortObject.searchBy.govId=[];
    this.sortObject.searchBy.hospitalId=[];
    this.sortObject.searchBy.orgId=[];
    this.sortObject.searchBy.subOrgId=[];
    this.sortObject.searchBy.govId=[];
    this.sortObject.searchBy.minAgeByMonth=null;
    this.sortObject.searchBy.minAgeByYear=null;
    this.sortObject.searchBy.maxAgeByMonth=null;
    this.sortObject.searchBy.maxAgeByYear=null;
    this.sortObject.searchBy.maxExpectedLife=null;
    this.sortObject.searchBy.minExpectedLife=null;
    this.lstBrandIds=[];
    this.lstOrgIds=[];
    this.lstSubOrgIds=[];
   this.selectedItems='';
this.minAgeByMonth=null;
this.minAgeByMonth=null;
this.minAgeByYear=null;

this.maxAgeByMonth=null;

this.maxAgeByYear=null;

this.maxExpectedLife=null;
this.minExpectedLife=null;
    this.categoryIds=[];
    this.lstNames=[];
    this.subCategoryIds=[];
    this.lstModels=[];
    this.hospitalIds=[];
    this.govIds=[];

    this.selectedBrandItems='';
    this.selectedCategoryItems='';
    this.selectedSubCategoryItems='';
  
    this.selectedModelItems=''
    this.selectedNameItems='';
    this.selectedItems='';
    this.selectedHospitalItems='';
   this.selectedOrgItems='';
this.selectedSubOrgItems='';
    this.startDate='';
    this.endDate='';
    console.log(this.selectedSubCategoryItems);
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
    
      }
}
