import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilterAssetDetail, ListAssetDetailVM, SortAssetDetailsVM, ViewAssetForReportVM } from 'src/app/shared/models/assetDetailVM';
import { BrandGroupVM, ListBrandVM } from 'src/app/shared/models/brandVM';
import { GroupcityVM, ListCityVM } from 'src/app/shared/models/cityVM';
import { GroupGovernorateVM, ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { HospitalGroupVM, HospitalVM, ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { ListMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { GroupOrganizationVM, ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { Paging } from 'src/app/shared/models/paging';
import { ListSupplierVM } from 'src/app/shared/models/supplierVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { BrandService } from 'src/app/shared/services/brand.service';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { SupplierService } from 'src/app/shared/services/supplierService.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { SubOrganizationService } from 'src/app/shared/services/subOrganization.service';
import { ListSubOrganizationVM } from 'src/app/shared/models/subOrganizationVM';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { AssetCountParam } from 'src/app/shared/models/assetcountparam';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent {
  @ViewChild('departmentId', { static: false }) departmentIdInformation: ElementRef;
  @ViewChild('brandId', { static: false }) brandIdInformation: ElementRef;
  @ViewChild('supplierId', { static: false }) supplierIdInformation: ElementRef;
  @ViewChild('statusId', { static: false }) statusIdInformation: ElementRef;
  @ViewChild('assetElement') groupByCriteria: ElementRef;
  selectedItem: any;
  selectedItems: any[] = [];
  page:Paging;
  showDetails: boolean;
  myEvent: any;
  sortField: string;
  sortDirection: string;
  purchaseDate:string;
  lang = localStorage.getItem("lang");
  textDir: string = '';
  currentUser: LoggedUser;
  lstAssets: ViewAssetForReportVM[] = [];
  showGroupingBtn: boolean = true;
  lstAssets2: ListAssetDetailVM[] = [];
  lstAssets3: ListAssetDetailVM[] = [];
  lstAssets4: ViewAssetForReportVM[] = [];
  //lstAssets2: ViewAssetForReportVM[] = [];
  listAssetsGroupByBrand: ListAssetDetailVM[] = [];
  listAssetsGroupByGov: ListAssetDetailVM[] = [];
  listAssetsGroupByHos: ListAssetDetailVM[] = [];
  listAssetsGroupByOrg: ListAssetDetailVM[] = [];
  listAssetsGroupBySubOrg: ListAssetDetailVM[] = [];
  listAssetsGroupByDepartment: ListAssetDetailVM[] = [];
  listAssetsGroupBySupplier: ListAssetDetailVM[] = []
  supplierId: number = 0;
  showSearch: boolean = false;
  sortStatus: string = "ascending";
  sortObject: SortAssetDetailsVM;

  lstMasterAssets: ListMasterAssetVM[] = [];
  newLstAssets: ViewAssetForReportVM[] = [];
  filteredObj: FilterAssetDetail;
  brndList: ListBrandVM[] = [];
  
  brandList: ListBrandVM[] = [];
  govList: ListGovernorateVM[];
  orgList: ListOrganizationVM[];
  subList: ListSubOrganizationVM[];
  cityList: ListCityVM[];
  hosList: ListHospitalVM[];
  newRows: string[];
  temp: string[];
  href: any;
  AssetElements: any[];
  AssetElementsAr: any;
  supList: ListSupplierVM[];
  // statusList: ListAssetStatusVM[] = [];
  selectedElement: string;
  lstBrandAsset: BrandGroupVM[];
  lstGovAsset: BrandGroupVM[];
  lstHosAsset: BrandGroupVM[];
  lstOrgAsset: BrandGroupVM[];
  lstSubOrgAsset: BrandGroupVM[];
  lstHospital:ListHospitalVM[];
  // lstDepartments: DepartmentVM[] = [];
  lstHospitalAsset: HospitalGroupVM[];
  lstGovernorateAsset: GroupGovernorateVM[];
  lstCityAsset: GroupcityVM[];
  // lstSupplierAsset: GroupSupplierVM[];
  // lstDepartmentAsset: DepartmentGroupVM[] = [];
  lstOrganizationAsset: GroupOrganizationVM[];
  direction: string = 'ltr';
  selectedLang: string;
  selectedAsset: number;
  userName = "";
  assetName: string = "";
  isDisplayed: boolean = false;
  uploadService: any;

  errorMessage: string = "";
  dateError: boolean = false;

 
  count: number = 0;
  loading: boolean = false;
  /*-------------- */
  governorateId:any;
  hosId:any;
  org:any;
  subOrg:any;
  brand:any;
  assetsName:any;
  from:any;
  to:any;

  departmentNameAtDialog: string = '';
  departmentNameAtDialogAr: string = '';
  departmentCountAtDialog: number = 0;
  departmentExpanded: boolean = true;
  departmentVisible: boolean = false;
  /*-------------- */
  brandVisible: boolean = false;
  hosVisible: boolean = false;
  govVisible: boolean = false;
  orgVisible: boolean = false;
  subVisible: boolean = false;
  brandExpanded: boolean = true;
  brandNameAtDialog: string = '';
  brandNameAtDialogAr: string = '';
    govNameAtDialog: string = '';
  govNameAtDialogAr: string = '';
  brandCountAtDialog: number = 0;
  govCountAtDialog: number = 0;
  hosCountAtDialog: number = 0;
  orgCountAtDialog: number = 0;
  subOrgCountAtDialog: number = 0;
  /*-------------- */
  searchForm: FormGroup;
  supplierVisible: boolean = false;
  supplierExpanded: boolean = true;
  supplierNameAtDialog: string = '';
  supplierNameAtDialogAr: string = '';
  supplierCountAtDialog: number = 0;
  constructor(private fb: FormBuilder,private assetDetailService: AssetDetailService,private brandService: BrandService,
  
    
    private datePipe: DatePipe, private supplierService: SupplierService, private masterService: MasterAssetService,
    private masterAssetService: MasterAssetService,private hospitalService:HospitalService,
    private location: Location, private route: Router, private ngxService: NgxUiLoaderService,private governorateService:GovernorateService,private organizationService:OrganizationService,private subOrganizationService:SubOrganizationService) { }



    ngOnInit(): void {
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
  
      this.ngxService.start("startPage");
      this.filteredObj = {hospitalId:0,governorateId:0,organizationId:0,subOrganizationId:0, strPurchaseDateFrom:'',strPurchaseDateTo:'', categoryId: 0, periorityId: 0, selectedElement: '', hospitalName: '', hospitalNameAr: '', lang: '', printedBy: '', userId: '', statusId: 0, id: 0, name: '', brandId: 0, supplierId: 0, masterAssetId: 0, departmentId: 0, purchaseDateFrom: null, purchaseDateTo: null, start: '', end: '', assetName: '', assetNameAr: '' }
  
      this.AssetElements = ["Brand","Governorate","Hospital","Organization","SubOrganization"];
      this.AssetElementsAr = ["الصانع", "المحافظه", "المستشفى","المؤسسه","المؤسسه الفرعيه"];
  
      this.page = { pagenumber: 1, pagesize: 10 };
  
      this.masterService.GetMasterAssets().subscribe(items => {
        this.lstMasterAssets = items;
      });
  
      // replace this with this.assetDetailService.GetAssetsByUserIdAndPaging()

  
  
      this.brandService.GetBrands().subscribe(brands => {
        this.brndList = brands
  
      });

      this.governorateService.GetGovernorates().subscribe(brands => {
        this.govList = brands;
      
      });
      this.organizationService.GetOrganizations().subscribe(brands => {
        this.orgList = brands;
      
      });
      this.subOrganizationService.GetSubOrganizations().subscribe(brands => {
        this.subList = brands;
       
      });
      this.hospitalService.GetAllLstHospitals().subscribe(brands => {
        this.hosList = brands;
       
      });

      // this.supplierService.GetSuppliers().subscribe(sup => {
  
      //   this.supList = sup;
      // });
  
 
  
  
  
  
      this.sortObject = { assetName: '', assetNameAr: '', sortStatus: '', sortBy: '' }
  
      this.ngxService.stop("startPage");
  
      // document.getElementById('clcbtn').style.display = "none";
    }
  
  
    clicktbl(event) {
      //this.currentPage = this.page.pagenumber;
  
      this.page.pagenumber = (event.first + 10) / 10;
      this.page.pagesize = event.rows;
  
  this.myEvent=event;
  
  
      if (this.sortObject.sortBy != "") {
  
        this.assetDetailService.SortAssetDetail(this.sortObject, this.page.pagenumber, this.page.pagesize).subscribe
          (data => {
            console.log(data);
            this.lstAssets = data.results;
            this.count = data.count;
            this.sortStatus = this.sortObject.sortStatus
          })
  
      }
  
      else {
        this.page.pagenumber = (event.first + 10) / 10;
        this.page.pagesize = event.rows;
  
        this.lstAssets = [];
  
    this.assetDetailService.GetAssetsByUserIdAndPaging( this.page.pagenumber, this.page.pagesize).subscribe(assets => {
        // this.lstAssets2 = assets.results;
        this.lstAssets = assets.results;
        this.count = assets.count;
        this.loading = false;
        // this.page.pagenumber=currentPage;
      });
  
      }
  
  
  
    }
    search() {
      this.clicktbl2(this.myEvent);
    
    }
  
  
    clicktbl2(event) {
      this.myEvent = event
  
      this.page.pagenumber = (event.first + 10) / 10;
      this.page.pagesize = event.rows;
      console.log(this.filteredObj);
      this.lstAssets2 = [];
   

      // this.filteredObj.strPurchaseDateFrom = this.datePipe.transform(new Date(), "yyyy-MM-dd");
      // this.filteredObj.strPurchaseDateTo = this.datePipe.transform(new Date(), "yyyy-MM-dd");


      this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj,this.page.pagenumber,this.page.pagesize).subscribe(data => {
        // this.lstAssets = data;
        this.lstAssets2 = data.results;
        this.count=data.count;
        this.loading=false;
      });
  
  
    }
  
    exportPdf() {
      this.filteredObj.userId = this.currentUser.id;
      if (this.filteredObj.end == "") {
        this.filteredObj.end = this.datePipe.transform(new Date(), "MM-dd-yyyy");
      }
      this.filteredObj.lang = this.lang;
      this.filteredObj.printedBy = this.currentUser.userName;
  
      this.filteredObj.selectedElement = this.selectedElement;
  
      
    }
  
    // filterByStatus($event) {
    //   this.filteredObj.statusId = $event.target.value;
    //   this.assetDetailService.FilterDataByDepartmentBrandSupplierId(this.filteredObj).subscribe(data => {
    //     this.lstAssets2 = data;
    //     if (this.selectedElement != null) {
    //       this.selectElement(this.selectedElement);
    //     }
    //     this.newLstAssets = this.lstAssets2;
    //   });
    //   this.showSearch = true;
    // }
  
  
    filterByStatus($event) {
  
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
      this.filteredObj.statusId = $event.target.value;
  
      this.showSearch = true;
    }
  
    filterByDepartment($event) {
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
      this.filteredObj.departmentId = $event.target.value;
  
    
  
      // this.assetDetailService.FilterDataByDepartmentBrandSupplierId(this.filteredObj).subscribe(data => {
      //   this.lstAssets2 = data;
      //   if (this.selectedElement != null) {
      //     this.selectElement(this.selectedElement);
      //   }
      //   this.newLstAssets = this.lstAssets2;
      // });
      this.showSearch = true;
    }
    filterByBrand($event) {

      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
     
    this.filteredObj.brandId = $event.target.value;
    this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
      this.lstAssets2 = assets.results;
      this.count = assets.count;
      this.loading = false;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newLstAssets = this.lstAssets2;
    });
    this.showSearch = true;
     
      this.showSearch = true;
    }
    filterByGov($event) {
 
  
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
     
    this.filteredObj.governorateId = $event.target.value;
    this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
      this.lstAssets2 = assets.results;
      this.count = assets.count;
      this.loading = false;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newLstAssets = this.lstAssets2;
    });
    this.showSearch = true;
     
      this.showSearch = true;
    }
    filterByHos($event) {

      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
     
    this.filteredObj.hospitalId = $event.target.value;
    this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
      this.lstAssets2 = assets.results;
      this.count = assets.count;
      this.loading = false;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newLstAssets = this.lstAssets2;
    });
    this.showSearch = true;
     
      this.showSearch = true;
    }
    filterByOrg($event) {

      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
     
    this.filteredObj.organizationId = $event.target.value;
    this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
      this.lstAssets2 = assets.results;
      this.count = assets.count;
      this.loading = false;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newLstAssets = this.lstAssets2;
    });
    this.showSearch = true;
     
      this.showSearch = true;
    }
    filterBySubOrg($event) {

      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
     
    this.filteredObj.subOrganizationId = $event.target.value;
    this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
      this.lstAssets2 = assets.results;
      this.count = assets.count;
      this.loading = false;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newLstAssets = this.lstAssets2;
    });
    this.showSearch = true;
     
      this.showSearch = true;
    }
    filterByPurchaseDateFrom(elem) {
      // this.filteredObj.start = elem;
      // this.assetDetailService.FilterDataByDepartmentBrandSupplierId(this.filteredObj).subscribe(data => {
      //   this.lstAssets2 = data;
      //   if (this.selectedElement != null) {
      //     this.selectElement(this.selectedElement);
      //   }
      //   this.newLstAssets = this.lstAssets2;
      // });
      // this.showSearch = true;
  
      this.page.pagenumber = 1;
    this.page.pagesize = 10;
    this.lstAssets2 = [];
    this.filteredObj.start = elem;
    this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
      this.lstAssets2 = assets.results;
      this.count = assets.count;
      this.loading = false;
      if (this.selectedElement != null) {
        this.selectElement(this.selectedElement);
      }
      this.newLstAssets = this.lstAssets2;
    });
    this.showSearch = true;
    }
  
  
    filterByPurchaseDateTo(elem) {
      // this.filteredObj.purchaseDateTo = elem;
      // this.filteredObj.end = elem;
      // this.assetDetailService.FilterDataByDepartmentBrandSupplierId(this.filteredObj).subscribe(data => {
      //   this.lstAssets2 = data;
      //   if (this.selectedElement != null) {
      //     this.selectElement(this.selectedElement);
      //   }
      //   this.newLstAssets = this.lstAssets2;
      // });
      // this.showSearch = true;
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
      this.filteredObj.purchaseDateTo = elem;
      this.filteredObj.end = elem;
      this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(assets => {
        this.lstAssets2 = assets.results;
        this.count = assets.count;
        this.loading = false;
        if (this.selectedElement != null) {
          this.selectElement(this.selectedElement);
        }
        this.newLstAssets = this.lstAssets2;
      });
      this.showSearch = true;
    }
  
    selectElement(elem) {
  
      this.isDisplayed = true;
      this.selectedElement = elem;
      if (elem != "") {
        this.isDisplayed = true;
        this.showGroupingBtn = true;
      }
      else {
        this.isDisplayed = false;
        this.showGroupingBtn = false;
      }
  
      if (elem === "Brand" || elem === "الصانع") {
    
  
  
          this.assetDetailService.GroupAssetDetailsByBrand(this.filteredObj).subscribe
            (result => { this.lstBrandAsset = result ;
            
              console.log(this.lstBrandAsset)
            
            }
              
              
            
              
              )
          // this.assetDetailService.getAssetByBrand(this.lstAssets2).subscribe(result=>{this.lstBrandAsset=result});
  
        
  
  
      }
    
  
  
 
      if (elem === "Governorate" || elem === "المحافظه") {
    
  
  
        this.assetDetailService.GroupAssetDetailsByGovernorate(this.filteredObj).subscribe
          (result => { this.lstGovAsset = result ;
          
         
          
          }
            
            
          
            
            )
        // this.assetDetailService.getAssetByBrand(this.lstAssets2).subscribe(result=>{this.lstBrandAsset=result});

      


    }
    if (elem === "Hospital" || elem === "المستشفى") {
    
  
  
      this.assetDetailService.GroupAssetDetailsByHospital(this.filteredObj).subscribe
        (result => { this.lstHosAsset = result ;
        
        
        console.log(this.lstHosAsset);
        }
          
          
        
          
          )
      // this.assetDetailService.getAssetByBrand(this.lstAssets2).subscribe(result=>{this.lstBrandAsset=result});

    


  }

  if (elem === "Organization" || elem === "المؤسسه") {
    
  
  
    this.assetDetailService.GroupAssetDetailsByOrganization(this.filteredObj).subscribe
      (result => { this.lstOrgAsset = result ;
      
     
      
      }
        
        
      
        
        )
    // this.assetDetailService.getAssetByBrand(this.lstAssets2).subscribe(result=>{this.lstBrandAsset=result});

  


}

if (elem === "SubOrganization" || elem === "المؤسسه الفرعيه" ) {
    
  
  
  this.assetDetailService.GroupAssetDetailsBySubOrganization(this.filteredObj).subscribe
    (result => { this.lstSubOrgAsset = result ;
    
     
    
    }
      
      
    
      
      )
  // this.assetDetailService.getAssetByBrand(this.lstAssets2).subscribe(result=>{this.lstBrandAsset=result});




}


  
  
      }

      
    

    checkValue() {

  
  
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      // $('#purchaseDateFrom').val("");
      this.purchaseDate="";

      this.filteredObj.purchaseDateFrom = null;
     
  
    }
    checkGroupingValue() {
 
  
  
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets = [];
      this.ngxService.start();
      this.groupByCriteria.nativeElement.value = null;
      this.selectedElement = null;
      this.isDisplayed = false;
  
     
      this.ngxService.stop();
    }
  
    // Back(): void {
    //   this.location.back();
    // }
  


    toggleCollapse(item: any) {
      if (this.isSelected(item)) {
        this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        this.selectedItems.push(item);
      }
    }
    
    isSelected(item: any): boolean {
      return this.selectedItems.includes(item);
    }
    onSelectionChanged(event) {
      this.masterAssetService.DistinctAutoCompleteMasterAssetName(event.query).subscribe(masters => {
        this.lstMasterAssets = masters;
        if (this.lang == "en") {
          this.lstMasterAssets.forEach(item => item.name = item.name);
        }
        else {
          this.lstMasterAssets.forEach(item => item.name = item.nameAr);
        }
      });
    }
    
  
    getObject(event) {
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets2 = [];
  
      if (this.lang == 'en')
        this.filteredObj.assetName = event.name;
      else
        this.filteredObj.assetNameAr = event.name;
  
  
      // this.assetDetailService.FilterDataByDepartmentBrandSupplierId(this.filteredObj).subscribe(data => {
      //   // this.lstAsset4 for 54 query result all to show them
      //   this.lstAssets4 = data;
      //   console.log(this.lstAssets2)
      //   if (this.selectedElement != null) {
      //     this.selectElement(this.selectedElement);
      //   }
      //   this.newLstAssets = this.lstAssets2;
      // });
  
      this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(data => {
        this.lstAssets2 = data.results;
        this.count = data.count;
        this.loading = false;
  
        if (this.selectedElement != null) {
          this.selectElement(this.selectedElement);
        }
        this.newLstAssets = this.lstAssets2;
      });
  
  
      this.showSearch = true;
    }
  
    onFilter() {
      // this.assetDetailService.FilterDataByDepartmentBrandSupplierId(this.filteredObj).subscribe(data => {
      //   this.lstAssets2 = data;
      //   if (this.selectedElement != null) {
      //     this.selectElement(this.selectedElement);
      //   }
      //   this.newLstAssets = this.lstAssets2;
      // });
  
  
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.assetDetailService.FilterDataByDepartmentBrandSupplierIdAndPaging(this.filteredObj, this.page.pagenumber, this.page.pagesize).subscribe(data => {
        // this.lstAssets = data;
        this.lstAssets2 = data.results;
        this.count = data.count;
        this.loading = false;
        if (this.selectedElement != null) {
          this.selectElement(this.selectedElement);
        }
        this.newLstAssets = this.lstAssets2;
      });
  
  
    }
   
  
    getAssetsByBrandId(brandObject: ListBrandVM) {
  

  
  
      this.brandNameAtDialog = brandObject.name;
      this.brandNameAtDialogAr = brandObject.nameAr;
      this.assetDetailService.GetAssetsByBrandId(brandObject.id).subscribe(items => {
        this.listAssetsGroupByBrand = items.results;
        this.brandCountAtDialog = items.count;
  
      });
  
  
      this.brandVisible = true;
  

  
    }
  
   
  

  
    getAssetsByGovId(govObject: ListGovernorateVM) {
  

  
  
      this.govNameAtDialog = govObject.name;
      this.govNameAtDialogAr = govObject.nameAr;
      this.assetDetailService.GetAssetsByGovId(govObject.id).subscribe(items => {
        this. listAssetsGroupByGov = items.results;
        this.govCountAtDialog = items.count;
  
      });
  
  
      this.govVisible = true;
    

  
    }
  

    getAssetsByHosId(govObject: ListHospitalVM) {
  

  
  
      this.govNameAtDialog = govObject.name;
      this.govNameAtDialogAr = govObject.nameAr;
      this.assetDetailService.GetAssetsByHosId(govObject.id).subscribe(items => {
        this. listAssetsGroupByHos = items.results;
        this.hosCountAtDialog = items.count;
  
      });
  
  
      this.hosVisible = true;
   

  
    }
    getAssetsByOrgId(govObject: ListOrganizationVM) {
  

  
  
      this.govNameAtDialog = govObject.name;
      this.govNameAtDialogAr = govObject.nameAr;
      this.assetDetailService.GetAssetsByOrgId(govObject.id).subscribe(items => {
        this. listAssetsGroupByOrg = items.results;
        this.orgCountAtDialog = items.count;
  
      });
  
  
      this.orgVisible = true;
   

  
    }
    getAssetsBySubOrgId(govObject: ListSubOrganizationVM) {
  

  
  
      this.govNameAtDialog = govObject.name;
      this.govNameAtDialogAr = govObject.nameAr;
      this.assetDetailService.GetAssetsBySubOrgId(govObject.id).subscribe(items => {
        this. listAssetsGroupBySubOrg = items.results;
        this.subOrgCountAtDialog = items.count;
  
      });
  
  
      this.subVisible = true;
  

  
    }
    
  
    sort(event) {

  
      if (this.sortStatus == "descending") {
        this.sortStatus = "ascending";
        this.sortObject.sortStatus = this.sortStatus;
      }
      else {
        this.sortStatus = "descending";
  
        this.sortObject.sortStatus = this.sortStatus;
      }
  
      switch (event.currentTarget.id) {
  
        case 'الاسم':
          this.sortObject.assetNameAr = event.currentTarget.id;
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'الكود':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'السيريال':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'رقم الموديل':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'القسم':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'الماركة':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'المورد':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'تاريخ الشراء':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Name':
          this.sortObject.assetName = event.currentTarget.id;
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Code':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Serial':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Model Number':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
       
        case 'Manufacture':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
       
        case 'Purchased Date':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
  
  
  
      }
  
      this.assetDetailService.SortAssetDetail(this.sortObject, this.page.pagenumber, this.page.pagesize).subscribe
        (data => {
          this.lstAssets = data.results;
          this.count = data.count;
          this.sortStatus = this.sortObject.sortStatus
        })
  
  
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
  
      switch (event.currentTarget.id) {
  
        case 'الاسم':
          this.sortObject.assetNameAr = event.currentTarget.id;
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'الكود':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'السيريال':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'رقم الموديل':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'القسم':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'الماركة':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'المورد':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'تاريخ الشراء':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Name':
          this.sortObject.assetName = event.currentTarget.id;
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Code':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Serial':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
        case 'Model Number':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
     
        case 'Manufacture':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
       
        case 'Purchased Date':
          this.sortObject.sortBy = event.currentTarget.id;
          break;
  
      }
      console.log(event.currentTarget.id);
      this.sortObject.sortBy = event.currentTarget.id;
      console.log(this.sortObject)
      console.log(this.filteredObj);
  
  
      this.assetDetailService.SortAssetDetailAfterSearch(this.sortObject, this.filteredObj, this.page.pagenumber, this.page.pagesize)
        .subscribe(data => {
          this.lstAssets2 = data.results;
          this.count = data.count;
        }
        )
 
    }
  
  
  

 
  

  
    afterCloseBrandtDialog() {
      this.brandExpanded = true;
      this.departmentVisible = false;
  
    }
  

  
  
    clearAutoCompelete(event) {
  
  
      this.filteredObj.assetName = "";
      this.filteredObj.assetNameAr = "";
  
    }
    reset() {
      
      this.ngxService.start("rest");
  
      this.searchForm.reset();
  
      this.governorateId='';
      this.selectedItem='';
      this.selectedItem = '';
      this.lstMasterAssets = null;
  
      this.filteredObj.brandId = 0;
      this.filteredObj.departmentId = 0;
      this.filteredObj.supplierId = 0;
      this.filteredObj.statusId = 0;
      this.filteredObj.assetName = '';
      this.filteredObj.start ='' ;
      this.filteredObj.end = '';

 

  

  
      this.showSearch = false;
      this.page.pagenumber = 1;
      this.page.pagesize = 10;
      this.lstAssets = [];
      this.assetDetailService.GetAssetsByUserIdAndPaging(this.page.pagenumber, this.page.pagesize).subscribe(assets => {
        this.lstAssets = assets.results;
        this.count = assets.count;
        this.loading = false;
  
      });
   
  
      this.ngxService.stop("rest");
  
  
    }





}
