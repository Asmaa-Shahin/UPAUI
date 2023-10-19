import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ListMasterAssetVM, MasterAssetVM, SortAndSearchMasterAssetVM } from 'src/app/shared/models/masterAssetVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { MasterAssetService } from 'src/app/shared/services/masterAsset.service';
import { CreateComponent } from '../create/create.component';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { EditComponent } from '../edit/edit.component';
import { ViewComponent } from '../view/view.component';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { SortAssetDetailsVM } from 'src/app/shared/models/assetDetailVM';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BrandService } from 'src/app/shared/services/brand.service';
import { OriginService } from 'src/app/shared/services/origin.service';
import { ECRIService } from 'src/app/shared/services/ecri.service';
import { ListOriginVM } from 'src/app/shared/models/originVM';
import { ListECRIVM } from 'src/app/shared/models/ecriVM';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { AssetPeriorityService } from 'src/app/shared/services/assetperiority.service';
import { ListAssetPeriorityVM } from 'src/app/shared/models/assetPeriorityVM';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  errorDisplay: boolean = false;
  errorMessage: string = "";
  count: number;
  selectedNameItems:any;
  totalRecords: number = 0;
  selectedObj: MasterAssetVM;
  loading: boolean;
  lstCode:string[]=[];
  lstNames:any[]=[];
  lstOrigin:ListOriginVM[];
  lstECRIName:ListECRIVM[];
  lstModels:string[]=[];
  selectedOriginItems:any;
  lstBrands:ListBrandVM[];
  selectedBrandItems:any;
  selectedCodeItems:any;
  assetCountParams: FiletrAssetCountParam;
  sortStatus: string = "ascending";
  pageSize:number=10;
  pageNumber:number=1;
  brandIds:number[]=[];
  originIds:number[]=[];
  assetPeriorityIds:number[]=[];
  eCRIIds:number[]=[];
  selectedECRIItems:any;
  listAssetPeriority:ListAssetPeriorityVM[]
  lstMasterAssets2:ListMasterAssetVM[];
  lstMasterAssets3:ListMasterAssetVM[];
  lstMasterAssets4:ListMasterAssetVM[];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsName: IDropdownSettings = {};
  dropdownSettingsCode: IDropdownSettings = {};
  dropdownSettingsModel: IDropdownSettings = {};
  selectedModelItems:any;
  sortObject: SortAndSearchMasterAssetVM;
  lstMasterAssets: ListMasterAssetVM[] = [];
  constructor(private dialogService: DialogService,private assetPeriorityService:AssetPeriorityService, private dialog: MatDialog, private authenticationService: AuthenticationService, private route: Router,
    private eCRIService:ECRIService,private masterAssetService: MasterAssetService,private originService:OriginService ,private brandService:BrandService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.sortObject={sortBy:'',sortStatus:'',searchBy:{assetPeriorityId:[],brandId:[],name:[],model:[],code:[],originId:[],eCRIId:[]}}
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.lang == "en" ? 'name' : 'nameAr',
    };
   
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
    this.brandService.GetBrands().subscribe(data=>{
this.lstBrands=data;
});

    this.assetPeriorityService.GetAssetPeriorities().subscribe(data=>{

this.listAssetPeriority=data;
    })
    this.originService.GetOrigins().subscribe(data=>{
    this.lstOrigin=data;
    });
    this.eCRIService.GetECRIS().subscribe(data=>{
     this.lstECRIName=data;
    })
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject,0,0).subscribe((items) => {
     
      this.lstMasterAssets2=items.results;
      this.lstMasterAssets3=items.results;
      this.lstMasterAssets4=items.results;
      const uniqueEntries = [];

      // Iterate through lstMasterAssets2 to filter out duplicates
     this.lstMasterAssets2.forEach(item => {
        const isDuplicate = uniqueEntries.some(entry =>
          entry.name === item.name && entry.nameAr === item.nameAr
        );
      
        if (!isDuplicate) {
          uniqueEntries.push(item);
        }
      });
      
      // Now, uniqueEntries contains objects with unique combinations of 'name' and 'nameAr'
      // You can assign it back to lstMasterAssets2 if needed
      this.lstMasterAssets2 = uniqueEntries;
      const uniqueEntries2 = [];

      // Iterate through lstMasterAssets2 to filter out duplicates
     this.lstMasterAssets3.forEach(item => {
        const isDuplicate = uniqueEntries2.some(entry =>
          entry.code === item.code 
        );
      
        if (!isDuplicate) {
          uniqueEntries2.push(item);
        }
      });
      
      // Now, uniqueEntries contains objects with unique combinations of 'name' and 'nameAr'
      // You can assign it back to lstMasterAssets2 if needed
      this.lstMasterAssets3 = uniqueEntries2;
      const uniqueEntries3 = [];

      // Iterate through lstMasterAssets2 to filter out duplicates
     this.lstMasterAssets4.forEach(item => {
        const isDuplicate = uniqueEntries3.some(entry =>
          entry.model === item.model
        );
      
        if (!isDuplicate) {
          uniqueEntries3.push(item);
        }
      });
      
      // Now, uniqueEntries contains objects with unique combinations of 'name' and 'nameAr'
      // You can assign it back to lstMasterAssets2 if needed
      this.lstMasterAssets4 = uniqueEntries3;
   
    });
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
   this.assetCountParams = {name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }

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

  


    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  clicktbl(event) {
    this.pageNumber = (event.first + 10) / 10;
    this.pageSize = event.rows;
      this.masterAssetService.SortMasterAssetafterSearch(this.sortObject,this.pageSize,this.pageNumber).subscribe((items) => {
        this.lstMasterAssets = items.results;
        this.count= items.count;
        this.loading = false;
      });
    
  }

  addMasterAsset() {
    const dialogRef2 = this.dialogService.open(CreateComponent, {
      header: this.lang == "en" ? 'Add New Master Asset' : "بيان إضافة أصل رئيسي جديد",
      style: {
        'width': '85%',
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
     
    });
  }
  deleteMasterAsset(id: number) {
    this.masterAssetService.GetMasterAssetById(id).subscribe((data) => {
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

  editMasterAsset(id: number) {
    const ref = this.dialogService.open(EditComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Master Asset' : "تعديل في البيان الرئيسي للأصل",
      style: {
        'width': '85%',
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(() => {
        //  this.reload();
    });
  }

  viewMasterAsset(id: number) {
    const ref = this.dialogService.open(ViewComponent, {
      header: this.lang == "en" ? 'View Master Asset' : "البيان الرئيسي للأصل",
      data: {
        id: id,
      },
      style: {
        'width': '85%',

        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });

    ref.onClose.subscribe(() => {
      // this.reload();
    });
  }

  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
  onBrandDeselect(item: any) {
    const index = this.brandIds.indexOf(item.id);
    if (index !== -1) {
      this.brandIds.splice(index, 1);
    }
    this.sortObject.searchBy.brandId = this.brandIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  onBrandDeselectAll(event) {
    this.brandIds = [];
    this.sortObject.searchBy.brandId = this.brandIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onBrandSelect(item: any) {
console.log(item.id);
    this.brandIds.push(item.id);
    console.log(this.brandIds);
    this.sortObject.searchBy.brandId = this.brandIds;
    console.log(this.sortObject.searchBy.brandId );
    console.log(this.sortObject);
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
   
  }
  onBrandSelectAll(items: any) {

    console.log(items);
    this.brandIds=[];
    items.forEach(element => {
      this.brandIds.push(element.id);
    });
    this.sortObject.searchBy.brandId = this.brandIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onNameDeselect(item: any) {
    var item2 =this.lang=='en'?item.name:item.nameAr;
    const index = this.lstNames.indexOf(item2);
    if (index !== -1) {
      this.lstNames.splice(index, 1);
    }
    console.log(this.lstNames);
    this.sortObject.searchBy.name = this.lstNames;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  onNameDeselectAll(event) {
    this.lstNames = [];
    this.sortObject.searchBy.name = this.lstNames;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onNameSelect(item: any) {
var item2 =this.lang=='en'?item.name:item.nameAr;
    this.lstNames.push(item2);
    
    this.sortObject.searchBy.name = this.lstNames;
  
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
   
  }
  onNameSelectAll(items: any) {

    this.lstNames=[];
    items.forEach(element => {
      this.lstNames.push(this.lang=='en'?element.name:element.nameAr);
    });
    this.sortObject.searchBy.name = this.lstNames;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
 
  onModelDeselect(item: any) {
    
    const index = this.lstModels.indexOf(item.model);
    if (index !== -1) {
      this.lstModels.splice(index, 1);
    }
    this.sortObject.searchBy.model = this.lstModels;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  onModelDeselectAll(event) {
    this.lstModels = [];
    this.sortObject.searchBy.model = this.lstModels;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onModelSelect(item: any) {

    this.lstModels.push(item.model);
    
    this.sortObject.searchBy.model = this.lstModels;
  
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
   
  }
  onModelSelectAll(items: any) {

    this.lstModels=[];
    items.forEach(element => {
      this.lstModels.push(element.model);
    });
    this.sortObject.searchBy.model = this.lstModels;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }

  onCodeDeselect(item: any) {
    
    const index = this.lstCode.indexOf(item.code);
    if (index !== -1) {
      this.lstCode.splice(index, 1);
    }
    this.sortObject.searchBy.code = this.lstCode;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  onCodeDeselectAll(event) {
    this.lstCode = [];
    this.sortObject.searchBy.code = this.lstCode;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onCodeSelect(item: any) {

    this.lstCode.push(item.code);
    
    this.sortObject.searchBy.code = this.lstCode;
  
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
   
  }
  onCodeSelectAll(items: any) {

    this.lstNames=[];
    items.forEach(element => {
      this.lstCode.push(element.code);
    });
    this.sortObject.searchBy.code = this.lstCode;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }

  onPeriorityDeselect(item: any) {
    const index = this.assetPeriorityIds.indexOf(item.id);
    if (index !== -1) {
      this.assetPeriorityIds.splice(index, 1);
    }
    this.sortObject.searchBy.assetPeriorityId = this.assetPeriorityIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  onPeriorityDeselectAll(event) {
    this.assetPeriorityIds = [];
    this.sortObject.searchBy.assetPeriorityId = this.assetPeriorityIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onPerioritySelect(item: any) {

    this.assetPeriorityIds.push(item.id);
   this.sortObject.searchBy.assetPeriorityId = this.assetPeriorityIds;

    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
   
  }
  onPerioritySelectAll(items: any) {

   
    this.assetPeriorityIds=[];
    items.forEach(element => {
      this.assetPeriorityIds.push(element.id);
    });
    this.sortObject.searchBy.assetPeriorityId = this.assetPeriorityIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }

  onECRIDeselect(item: any) {
    const index = this.eCRIIds.indexOf(item.id);
    if (index !== -1) {
      this.eCRIIds.splice(index, 1);
    }
    this.sortObject.searchBy.eCRIId = this.eCRIIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
      .subscribe(data => {
        this.lstMasterAssets = data.results;
        this.count = data.count;
      }
      )

  }
  onECRIDeselectAll(event) {
    this.eCRIIds = [];
    this.sortObject.searchBy.eCRIId = this.eCRIIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  onECRISelect(item: any) {

    this.eCRIIds.push(item.id);
   this.sortObject.searchBy.eCRIId = this.eCRIIds;

    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
   
  }
  onECRISelectAll(items: any) {

   
    this.eCRIIds=[];
    items.forEach(element => {
      this.eCRIIds.push(element.id);
    });
    this.sortObject.searchBy.eCRIId = this.eCRIIds;
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );
  }
  clearSearch(){
this.sortObject.searchBy.brandId=[];
this.sortObject.searchBy.name=[];
this.sortObject.searchBy.code=[];
this.sortObject.searchBy.model=[];
this.sortObject.searchBy.originId=[];
this.sortObject.searchBy.eCRIId=[];
this.brandIds=[];
this.eCRIIds=[];
this.lstNames=[];
this.lstCode=[];
this.lstModels=[];
this.originIds=[];
this.selectedBrandItems='';
this.selectedCodeItems='';
this.selectedECRIItems='';
this.selectedModelItems=''
this.selectedNameItems='';
this.selectedOriginItems='';
    this.masterAssetService.SortMasterAssetafterSearch(this.sortObject, this.pageSize,this.pageNumber)
    .subscribe(data => {
      this.lstMasterAssets = data.results;
      this.count = data.count;
    }
    );

  }
}

