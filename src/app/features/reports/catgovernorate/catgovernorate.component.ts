import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
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
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
@Component({
  selector: 'app-catgovernorate',
  templateUrl: './catgovernorate.component.html',
  styleUrls: ['./catgovernorate.component.scss']
})
export class CatgovernorateComponent {
  assetcountParam = new FiletrAssetCountParam();
  lang = localStorage.getItem("lang");
  lstCountOfAssets: CountAssetsVM[] = [];
  lstGovernorates: ListGovernorateVM[] = [];
  lstCategories: ListCategoryVM[] = [];
  dropdownSettings: IDropdownSettings = {};
  brandIds: number[] = [];
  lstBrands: ListBrandVM[] = [];
  selectedBrandItems: any[] = [];
  orgIds: number[] = [];
  selectedOrgItems: any[] = [];
  lstOrganization: ListOrganizationVM[] = [];
  constructor(
    private countAssetsService: CountOfAssetService,
    private governorateService: GovernorateService,
    private categoryService: CategoryService,
   private brandService:BrandService,
   private organizationService:OrganizationService
  ) {}

  ngOnInit(): void {
    this.assetcountParam = {name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.brandService.GetBrands().subscribe(brands => {
      this.lstBrands = brands
    });
    this.organizationService.GetOrganizations().subscribe(org => {
      this.lstOrganization = org
    });
    this.governorateService.GetGovernorates().subscribe((items) => {
      this.lstGovernorates = items;
    });
    this.categoryService.GetCategories().subscribe((items) => {
      this.lstCategories = items;
    });
    this.countAssetsService
      .GetCountOfAssetByCategoryGovernorate(this.assetcountParam)
      .subscribe((result) => {
        this.lstCountOfAssets = result; });
  }
  exportToExcel2(data: any[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
  
    // Add headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
  
    // Add data
    data.forEach((item) => {
      const row: any = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });
  
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 20;
  
    // Create pivot table
    const pivotWorksheet = workbook.addWorksheet('Pivot Table');
    pivotWorksheet.columns = [
      { header: 'Country', key: 'Country', width: 15 },
      { header: 'Category', key: 'Category', width: 15 },
      { header: 'Revenue', key: 'Revenue', width: 15 }
    ];
  
    // Add data to pivot table
    pivotWorksheet.addRows(data);
  
    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  onBrandSelect(item: any) {
    this.brandIds.push(item.id);
    this.assetcountParam.brandId = this.brandIds;
    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    })
   
  }
  onBrandSelectAll(items: any) {

    items.forEach(element => {
      this.brandIds.push(element.id);
    });
    this.assetcountParam.brandId = this.brandIds;
    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    });
  }
  onBrandDeselect(item: any) {
    const index = this.brandIds.indexOf(item.id);
    if (index !== -1) {
      this.brandIds.splice(index, 1);
    }
    this.assetcountParam.brandId = this.brandIds;
    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    });

  }
  onBrandDeselectAll(event) {
    this.brandIds = [];
    this.assetcountParam.brandId = this.brandIds;

    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    });
  }
  onOrgSelect(item: any) {
    this.orgIds.push(item.id);
    this.assetcountParam.orgId = this.orgIds;
    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    })
   
  }
  onOrgSelectAll(items: any) {

    items.forEach(element => {
      this.orgIds.push(element.id);
    });
    this.assetcountParam.orgId = this.orgIds;
    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    });
  }
  onOrgDeselect(item: any) {
    const index = this.orgIds.indexOf(item.id);
    if (index !== -1) {
      this.orgIds.splice(index, 1);
    }
    this.assetcountParam.orgId = this.orgIds;
    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    });

  }
  onOrgDeselectAll(event) {
    this.brandIds = [];
    this.assetcountParam.orgId = this.orgIds;

    this.countAssetsService.GetCountOfAssetByCategoryGovernorate(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result;
      
    });
  }
  generatePivote(){
    const data = [
      { 'Country': 'USA', 'Category': 'Electronics', 'Revenue': 2000 },
      { 'Country': 'USA', 'Category': 'Clothing', 'Revenue': 1500 },
      { 'Country': 'Canada', 'Category': 'Electronics', 'Revenue': 2500 },
      { 'Country': 'Canada', 'Category': 'Clothing', 'Revenue': 1800 },
      { 'Country': 'USA', 'Category': 'Electronics', 'Revenue': 2200 },
      { 'Country': 'Canada', 'Category': 'Clothing', 'Revenue': 1600 },
      { 'Country': 'USA', 'Category': 'Clothing', 'Revenue': 1700 },
      { 'Country': 'Canada', 'Category': 'Electronics', 'Revenue': 2100 }
    ];
    this.exportToExcel2(data,"myData")
  }
  generateExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pivot Table');
  
    // Adding headers to the worksheet
    worksheet.addRow(['Category', ...this.lstGovernorates.map(gov => this.lang == 'en' ? gov.name : gov.nameAr)]);
  
    // Adding data to the worksheet
    this.lstCategories.forEach(cat => {
      const row:any[] = [this.lang == 'en' ? cat.name : cat.nameAr];
      this.lstGovernorates.forEach(gov => {
        const matches = this.findMatch(gov, cat);
        const count = matches.length > 0 ? matches[0].count : 0;
        row.push(count);
      });
      worksheet.addRow(row);
    });
  
    // Save the workbook to an Excel file
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'pivot_table.xlsx');
    });
  }

 
  findMatch(gov, cat) {
    return  this.lstCountOfAssets.filter(function (data) {
      return data.governorateId === gov.id && data.categoryId === cat.id;
    }); 
  }
}
