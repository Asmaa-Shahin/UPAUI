import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { EditAssetDetailVM, ListAssetDetailVM, SortAndSearchAssetVM } from 'src/app/shared/models/assetDetailVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import {  FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ViewComponent } from '../view/view.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { HospitalService } from 'src/app/shared/services/hospital.service';
import { EditHospitalVM, ListHospitalVM } from 'src/app/shared/models/hospitalVM';
import { BrandService } from 'src/app/shared/services/brand.service';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { SubCategoryService } from 'src/app/shared/services/subcategory.service';
import { ListSubCategoryVM } from 'src/app/shared/models/subCategoryVM';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { ListMasterAssetVM, SortAndSearchMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('checkbox') checkbox: ElementRef;
  lang = localStorage.getItem("lang");
  lstAssets: ListAssetDetailVM[]=[];
  lstAssets2: ListAssetDetailVM[]=[];
  lstHosp:ListHospitalVM[]=[];
  lstSubCat:ListSubCategoryVM[]=[];
  assetCountParam: FiletrAssetCountParam;
 data2:any[]=[];
  count: number;
  govIds:number[]=[];
  lstNames:string[]=[];
  lstHospital:number[]=[];
  lstBrandIds:number[]=[];
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
 lstMasterAssets:ListMasterAssetVM[];
 lstMasterAssets5:ListMasterAssetVM[];
  rangeDates: Date[] | undefined;
  lstCategories:ListCategoryVM[];
  lstBrands:ListBrandVM[];
  HospitalExcel:EditAssetDetailVM;
  lstGovernorates:ListGovernorateVM[]=[];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsName:IDropdownSettings={};
  dropdownSettingsModel:IDropdownSettings={};
  sortObject2: SortAndSearchMasterAssetVM;
  constructor(private el: ElementRef,private categoryService:CategoryService,private governorateService:GovernorateService,private authenticationService: AuthenticationService,private dialog: MatDialog,
    private assetDetailService: AssetDetailService,private masterAssetService:MasterAssetService,private subCategoryService:SubCategoryService,private brandService:BrandService,private hospitalService:HospitalService ,private router: Router,public dialogService: DialogService ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  
  ngOnInit(): void {
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
searchBy:{govId:[],name:[],hospitalId:[],model:[],brandId:[],categoryId:[],subCategoryId:[],start:"",end:"",purchaseDateFrom:new Date(),purchaseDateTo:new Date()}
 }
 this.sortObject2={sortBy:'',sortStatus:'',searchBy:{assetPeriorityId:[],brandId:[],name:[],model:[],code:[],originId:[],eCRIId:[]}};
 this.governorateService.GetGovernorates().subscribe(govs => {
  this.lstGovernorates = govs;
});
this.categoryService.GetCategories().subscribe(catg => {
  this.lstCategories = catg
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

this.hospitalService.GetAllLstHospitals().subscribe(data=>{

this.lstHosp=data;

});
this.subCategoryService.GetSubCategories().subscribe(data=>{

this.lstSubCat=data;
});
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

this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
  this.lstAssets = result.results;
  this.count = result.count;
});
  }
  isSelected(item): boolean {
    return this.selectedItems2.includes(item);
}

  selectAllItems(event) {
    if (event) {
        this.selectedItems2 = [...this.lstAssets];
        console.log(this.selectedItems2) // Assuming lstAssets is your data source
    } else {
        this.selectedItems2 = [];
    }
}
onCheckboxChange(event, item) {
  this.notSelected=true;
    this.assetDetailService.GetAssetById(event.target.value).subscribe(data=>{
      this.HospitalExcel=data;
   if(event.target.checked){
    this.selectedItems2.push(item);
    this.data4.push(this.HospitalExcel);
    this.data2=this.data4;

    this.data=this.data2;

   }else{
    const index2 = this.selectedItems2.findIndex(selectedItem => selectedItem.id === item.id);
    if (index2 !== -1) {
        this.selectedItems2.splice(index, 1);
    }
   var index= this.data2.indexOf(this.HospitalExcel);
this.data2.splice(index,1);
    this.data=this.data2;

   }
   
         
       
   
    });


}

  clicktbl($event) {

    this.pageNumber = ($event.first + 10) / 10;
    this.pageSize = $event.rows;
    
    
    // this.assetDetailService.GetAssets(this.assetCountParam).subscribe(data => {
    //   this.lstAssets = data.results;
    //   this.count = data.count;
    //   console.log(this.lstAssets);
    // });
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      if(this.selectAll==true){
        this.lstAssets.forEach(item=>{
          this.selectedItems2.push(item);
        })
      }
    
      this.count = result.count;
    });

  }

  addAsset() {
    const dialogRef2 = this.dialogService.open(CreateComponent, {
      header: this.lang == "en" ? 'Add Hospital Asset' : "إضافة أصل في المستشفى",
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
  exportToExcel(data: any[], fileName: string, filteredColumns: string[]) {
    const filteredData = data.map(item => {
      const filteredItem: any = {};
      filteredColumns.forEach(column => {
        filteredItem[column] = item[column];
      });
      return filteredItem;
    });
    console.log(
      filteredData
    )
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    // Add headers
    const headers = Object.keys(filteredData[0]);
    worksheet.addRow(headers);

    // Add data
    filteredData.forEach((item) => {
      const row:any = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 20;


    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${fileName}.xlsx`);
    });

  }
  areAllCheckboxesChecked(event){
console.log(event)

  }
//   onCheckboxChange(check){
// this.check2=check;
// const checkboxes = this.el.nativeElement.querySelectorAll('.checkbox-input');
// checkboxes.forEach(element => {
  
//   element.checked=check;
// });
//   }
 
  getAllHosEcxel($event){
    this.notSelected=true;
if($event.target.checked){

  this.assetDetailService.SortAssetsafterSearch(this.sortObject, 0,0).subscribe(result => {
    this.lstAssets2 = result.results;
  this.data2=this.lstAssets2;
  this.data=this.data2;
  
  }
    
    );
}
else{

  this.assetDetailService.SortAssetsafterSearch(this.sortObject, 0,0).subscribe(result => {
    this.lstAssets2 = result.results;

  this.data= this.lstAssets2 ;
})

}}
  getHospitalInEcxel($event){
this.notSelected=true;
    this.assetDetailService.GetAssetById($event.target.value).subscribe(data=>{
      this.HospitalExcel=data;
   if($event.target.checked){
    this.data4.push(this.HospitalExcel);
    this.data2=this.data4;

    this.data=this.data2;

   }else{

   var index= this.data2.indexOf(this.HospitalExcel);
this.data2.splice(index,1);
    this.data=this.data2;

   }
   
         
       
   
    })
    console.log($event.target.value);
    
      }
  generateExcel(){
    const filteredColumns = ['code','model','serialNumber', 'assetName', 'assetNameAr', 'purchaseDate','price','hospitalName','hospitalNameAr','governorateName','governorateNameAr','brandName','brandNameAr','orgName','orgNameAr','subOrgName','subOrgNameAr','sublierName',"sublierNameAr","categoryName",'categoryNameAr','assetPeriortyName','assetPeriortyNameAr','installationDate','warrantyStart','warrantyEnd','subCatName','subCatNameAr'];

    // Assuming this.lstAssets contains your data
 
    if(this.notSelected==false || (this.selectedItems2.length==0) ){
      this.assetDetailService.SortAssetsafterSearch(this.sortObject, 0,0).subscribe(result => {
        this.lstAssets = result.results;
      this.data=this.lstAssets;
       console.log(this.data);
        this.count = result.count;
        this.exportToExcel(this.data, 'my-data', filteredColumns);
      });
      
    }else{
      console.log(this.data);
      this.exportToExcel(this.data, 'my-data', filteredColumns);
    }
 
 
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
  editAsset(id: number) {
    const ref = this.dialogService.open(EditComponent, {
      header: this.lang == "en" ? 'Edit Hospital Asset' : "تعديل الأصل في المستشفى",
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

    ref.onClose.subscribe((res) => {
      this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
        this.lstAssets = result.results;
        this.count = result.count;
        console.log(this.lstAssets);
      });
    });
  }
  viewAsset(id: number) {
    const ref = this.dialogService.open(ViewComponent, {
      header: this.lang == "en" ? 'View Hospital Asset' : "بيانات أصل في المستشفى",
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

    ref.onClose.subscribe(res => {
      
    });
  }
  deleteAsset(id: number) {
    this.assetDetailService.GetAssetById(id).subscribe((data) => {
      this.selectedObj = data;
      const dialogRef2 = this.dialog.open(DeleteconfirmationComponent, {
        data: {
          id: this.selectedObj.id,
          name: this.selectedObj.assetName,
          nameAr: this.selectedObj.assetNameAr,
        },
      });
      dialogRef2.afterClosed().subscribe(deleted => {
        this.reload();
      });
    });
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    
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
  onItemSelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.govIds.push(item.id);

    this.sortObject.searchBy.govId = this.govIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onSelectAll(items: any) {
    this.selectAll=false;
    this.notSelected=false;
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
  onDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
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
  onNameDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
    this.lstNames = [];
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
    this.sortObject.searchBy.hospitalId = this.lstHospital;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onHospitalDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
    this.lstHospital = [];
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
    this.sortObject.searchBy.brandId = this.lstBrandIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onBrandDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
    this.lstBrandIds = [];
    this.sortObject.searchBy.brandId = this.lstBrandIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }

  onCategorySelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;

    this.lstCategoryIds.push(item.id);

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
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }




  onSubCategorySelect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
    this.lstSubCategoryIds.push(item.id);

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
    this.sortObject.searchBy.subCategoryId = this.lstSubCategoryIds;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  onSubCategoryDeselect(item: any) {
    this.selectAll=false;
    this.notSelected=false;
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
    this.sortObject.searchBy.model = this.lstModels;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });;
  }
  onModelDeselectAll() {
    this.selectAll=false;
    this.notSelected=false;
    this.lstModels = [];
    this.sortObject.searchBy.model = this.lstModels;
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
  }
  clearSearch(){
  
    this.sortObject.searchBy.brandId=[];
    this.sortObject.searchBy.name=[];
    this.sortObject.searchBy.categoryId=[];
    this.sortObject.searchBy.model=[];
    this.sortObject.searchBy.subCategoryId=[];
    this.sortObject.searchBy.start='';
    this.sortObject.searchBy.end='';
    this.sortObject.searchBy.govId=[];
    this.sortObject.searchBy.hospitalId=[];
    this.lstBrandIds=[];
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
   
    this.startDate='';
    this.endDate='';
    console.log(this.selectedSubCategoryItems);
    this.assetDetailService.SortAssetsafterSearch(this.sortObject, this.pageSize,this.pageNumber).subscribe(result => {
      this.lstAssets = result.results;
      this.count = result.count;
    });
    
      }
}
