import { Component } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Table } from 'primeng/table';
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { CountAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CountOfAssetService } from 'src/app/shared/services/countOfAsset.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
@Component({
  selector: 'app-totalassets',
  templateUrl: './totalassets.component.html',
  styleUrls: ['./totalassets.component.scss']
})
export class TotalassetsComponent {
  lang = localStorage.getItem("lang");
  assetcountParam = new FiletrAssetCountParam();
  assetcountParam2 = new FiletrAssetCountParam();
  lstCountOfAssets: CountAssetsVM[] = [];
  lstCountOfAssets2: CountAssetsVM[] = [];
  lstGovernorates: ListGovernorateVM[] = [];
  lstCategories: ListCategoryVM[] = [];
  lstOrganization: ListOrganizationVM[] = [];
  lstBrands: ListBrandVM[] = [];
  lstCount: number[] = [];
  selectedGovernorates: any[];
  selectedCategoryItems: any[];
  count: number;
  sortStatus: string = "descending"
  sort1: string;
  customers!: any[];

  representatives!: any;
  govIds: number[] = [];
  orgIds: number[] = [];
  countIds: number[] = [];
  categoryIds: number[] = [];
  brandIds: number[] = [];
  CountIds: number[] = [];
  statuses!: any[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  countDropDownSettings: IDropdownSettings = {};
  selectedGovItems: any[] = [];
  selectedOrgItems: any[] = [];
  selectedBrandItems: any[] = [];
  selectedCountItems: any[] = [];
  loading: boolean = true;
  numbersList: { id: number, name: string }[] = [];
  activityValues: number[] = [0, 100];
  constructor(private countAssetsService: CountOfAssetService, private governorateService: GovernorateService, private organizationService: OrganizationService, private categoryService: CategoryService, private brandService: BrandService) {

  }
  ngOnInit(): void {
    this.assetcountParam = {name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
    this.assetcountParam2 = { name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }


    this.countAssetsService.FilterCountOfAssets(this.assetcountParam2).subscribe(filter => {
      this.lstCountOfAssets2 = filter.results;
      this.lstCount = this.lstCountOfAssets2.map(element => element.count);
      this.lstCount = this.lstCount.filter((count, index) => this.lstCount.indexOf(count) === index);
      this.numbersList = this.lstCount.map((count, index) => ({
        id: index, name:
          count.toString()
        //  this.lang=="en"?count.toString():(+count).toLocaleString("ar-SA") 
      }));
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.countDropDownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.onLoad();
  }
  highlightCoulmn(){
   
    this.assetcountParam.pageIndex =1;
    this.assetcountParam.pageSize =10;
  }
  onLoad() {
    this.governorateService.GetGovernorates().subscribe(govs => {
      this.lstGovernorates = govs;
    });
    this.categoryService.GetCategories().subscribe(catg => {
      this.lstCategories = catg
    });
    this.organizationService.GetOrganizations().subscribe(org => {
      this.lstOrganization = org
    });
    this.brandService.GetBrands().subscribe(brands => {
      this.lstBrands = brands
    });
  }

  clicktbl($event) {
    this.assetcountParam.pageIndex = ($event.first + 10) / 10;
    this.assetcountParam.pageSize = $event.rows;
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }
  sort(field) {
    if (this.sortStatus == "descending") {
      this.sortStatus = "ascending";
      this.assetcountParam.sortStatus = this.sortStatus;
    }
    else {
      this.sortStatus = "descending"
      this.assetcountParam.sortStatus = this.sortStatus;
    }
    this.sort1 = field.currentTarget.id;
    this.assetcountParam.sort = field.currentTarget.id;
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }



  onItemSelect(item: any) {
    this.govIds.push(item.id);

    this.assetcountParam.govId = this.govIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }
  onOrgSelect(item: any) {
    this.orgIds.push(item.id);

    this.assetcountParam.orgId = this.orgIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
    this.count = this.lstCountOfAssets.length;
  }
  onBrandSelect(item: any) {
    this.brandIds.push(item.id);
    this.assetcountParam.brandId = this.brandIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    })
    this.count = this.lstCountOfAssets.length;
  }
  onCategorySelect(item: any) {
    this.categoryIds.push(item.id);
    this.assetcountParam.categoryId = this.categoryIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
    this.count = this.lstCountOfAssets.length;

  }
  onCountSelect(item: any) {
    this.countIds.push(item.name);
    this.assetcountParam.count = this.countIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
    this.count = this.lstCountOfAssets.length;

  }
  onSelectAll(items: any) {
    items.forEach(element => {
      this.govIds.push(element.id);
    });
    this.assetcountParam.govId = this.govIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }
  onOrgSelectAll(items: any) {

    items.forEach(element => {
      this.orgIds.push(element.id);
    });

    this.assetcountParam.orgId = this.orgIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }
  onBrandSelectAll(items: any) {

    items.forEach(element => {
      this.brandIds.push(element.id);
    });
    this.assetcountParam.brandId = this.brandIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }
  onCategorySelectAll(items: any) {
    items.forEach(element => {
      this.categoryIds.push(element.id);
    });


    this.assetcountParam.categoryId = this.categoryIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;

    })
  }
  onCountSelectAll(items: any) {
    items.forEach(element => {
      this.countIds.push(element.id);
    });
    this.assetcountParam.count = this.countIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });

  }
  onItemDeselect(item: any) {
    const index = this.govIds.indexOf(item.id);
    if (index !== -1) {
      this.govIds.splice(index, 1);
    }
    this.assetcountParam.govId = this.govIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }

  onOrgDeselect(item: any) {
    const index = this.orgIds.indexOf(item.id);
    if (index !== -1) {
      this.orgIds.splice(index, 1);
    }
    this.assetcountParam.orgId = this.orgIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });

  }
  onBrandDeselect(item: any) {
    const index = this.brandIds.indexOf(item.id);
    if (index !== -1) {
      this.brandIds.splice(index, 1);
    }
    this.assetcountParam.brandId = this.brandIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {

      this.lstCountOfAssets = result.results;

      this.count = result.count;

    })

  }
  onCategoryDeselect(item: any) {
    const index = this.categoryIds.indexOf(item.id);
    if (index !== -1) {
      this.categoryIds.splice(index, 1);
    }
    this.assetcountParam.categoryId = this.categoryIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
      this.count = result.count;
    });
  }
  onCountDeselect(item: any) {
    const index = this.countIds.indexOf(item.id);
    if (index !== -1) {
      this.countIds.splice(index, 1);
    }
    this.assetcountParam.count = this.countIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {

      this.lstCountOfAssets = result.results;

      this.count = result.count;

    })

  }
  onDeselectAll() {
    this.govIds = [];
    this.assetcountParam.govId = this.govIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {

      this.lstCountOfAssets = result.results;

    })
  }
  onOrgDeselectAll() {
    this.orgIds = [];
    this.assetcountParam.orgId = this.orgIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
    })
  }
  onBrandDeselectAll() {
    this.brandIds = [];
    this.assetcountParam.brandId = this.brandIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
    });
  }
  onCategoryDeselectAll() {
    this.categoryIds = [];
    this.assetcountParam.categoryId = this.categoryIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
    });
  }
  onCountDeselectAll() {
    this.countIds = [];
    this.assetcountParam.count = this.countIds;
    this.highlightCoulmn();
    this.countAssetsService.FilterCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.results;
    });
  }
  clear(table: Table) {
    this.highlightCoulmn();
    table.clear();
  }

  // getSeverity(name: string): string {
  //   switch (name) {
  //     case 'Cairo':
  //       return 'danger';
  //     case 'Giza':
  //       return 'success';
  //     // Add more mappings as needed
  //     default:
  //       return 'info';
  //   }
  // }
}
