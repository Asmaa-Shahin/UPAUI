import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AssetCountParam, FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import {  CountAssetsVM} from 'src/app/shared/models/countOfAssetVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CountOfAssetService } from 'src/app/shared/services/countOfAsset.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-orggovernorate',
  templateUrl: './orggovernorate.component.html',
  styleUrls: ['./orggovernorate.component.scss']
})
export class OrggovernorateComponent  implements OnInit  {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  assetcountParam = new AssetCountParam();
  filterAassetCountParam = new FiletrAssetCountParam();
  lstCountOfAssets: CountAssetsVM[] = [];
  lstGovernorates: ListGovernorateVM[] = [];
  lstCategories!: ListCategoryVM[];
  lstOrganizations :ListOrganizationVM[]=[];
  lstBrands :ListBrandVM[]=[];
  categoryIds: number[] = [];
  selectedCategoryItems: any[];
  selectedBrandIds:number[]=[];
  dropdownSettings: IDropdownSettings = {};
  brandIds:number[]=[]

  constructor(
    private countAssetsService: CountOfAssetService,    private governorateService: GovernorateService,
    private categoryService: CategoryService,    private organizationService: OrganizationService,
    private brandService:BrandService
  ) {}

  ngOnInit(): void {
  
    this.filterAassetCountParam = {name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.governorateService.GetGovernorates().subscribe((items) => {
      this.lstGovernorates = items;
    });
    this.categoryService.GetCategories().subscribe((items) => {
      this.lstCategories = items;
    });
    this.brandService.GetBrands().subscribe((items) => {
      this.lstBrands = items;
    });

    this.organizationService.GetOrganizations().subscribe((items) => {
      this.lstOrganizations = items;
    });
    this.countAssetsService
      .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
      .subscribe((result) => {
        this.lstCountOfAssets = result;
       });       
  }

  findMatch2(gov, org) {
    return  this.lstCountOfAssets.filter(function (data) {
      return data.governorateId === gov.id && data.organizationId === org.id;
    }); 
  }

  onCategorySelect(item: any) {
    this.categoryIds.push(item.id);
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.countAssetsService
      .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
      .subscribe((result) => {
        this.lstCountOfAssets = result;
       });  
  }
  onCategorySelectAll(items: any) {
    items.array.forEach(element => {
      this.categoryIds.push(element.id);
    });
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.countAssetsService
      .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
      .subscribe((result) => {
        this.lstCountOfAssets = result;
       });  
  }
  onCategoryDeselect(item: any) {
    const index = this.categoryIds.indexOf(item.id);
    if (index !== -1) {
      this.categoryIds.splice(index, 1);
    }
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.countAssetsService
    .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
    .subscribe((result) => {
      this.lstCountOfAssets = result;
     });  
  }
  onCategoryDeselectAll(item: any) {
    this.categoryIds = [];
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.countAssetsService
      .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
      .subscribe((result) => {
        this.lstCountOfAssets = result;
       });  
  }
  onBrandDeselect(item: any) {
    const index = this.brandIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.brandIds.splice(index, 1);
    }
    this.filterAassetCountParam.brandId = this.brandIds;
    this.countAssetsService
    .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
    .subscribe((result) => {
      this.lstCountOfAssets = result;
     });  

  }
  onBrandDeselectAll(event) {
    this.brandIds = [];
    this.filterAassetCountParam.brandId = this.brandIds;
    this.countAssetsService
    .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
    .subscribe((result) => {
      this.lstCountOfAssets = result;
     });  
  }
  onBrandSelect(item: any) {
 

    this.brandIds.push(item.id);
 
    this.filterAassetCountParam.brandId = this.brandIds;
    this.countAssetsService
    .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
    .subscribe((result) => {
      this.lstCountOfAssets = result;
     });  
   
  }
  onBrandSelectAll(items: any) {

    
    this.brandIds=[];
    items.forEach(element => {
      this.brandIds.push(element.id);
    });
    this.filterAassetCountParam.brandId = this.brandIds;
    this.countAssetsService
    .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
    .subscribe((result) => {
      this.lstCountOfAssets = result;
     });  
  }
  // changeBrand()
  // {
  //  this.filterAassetCountParam.brandId = this.selectedBrandIds;
  //   this.countAssetsService
  //     .FilterCountOfAssetByOrganizationGovernorate(this.filterAassetCountParam)
  //     .subscribe((result) => {
  //       this.lstCountOfAssets = result;
  //      }); 
  // }

}
