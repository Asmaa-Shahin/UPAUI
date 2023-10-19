import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle,
  ApexDataLabels, ApexLegend, ApexPlotOptions
} from "ng-apexcharts";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { CountAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { CategoryService } from 'src/app/shared/services/category.service';

export type TriangleChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-govpopulation',
  templateUrl: './govpopulation.component.html',
  styleUrls: ['./govpopulation.component.scss']
})
export class GovpopulationComponent  implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  @ViewChild("chart") chart: ChartComponent;
  public triangleChartOptions: Partial<TriangleChartOptions>;


  filterAassetCountParam = new FiletrAssetCountParam();
  lstCategories: ListCategoryVM[]=[];
  lstCountOfAssets: CountAssetsVM[] = [];
  categoryIds: number[] = [];
  selectedCategoryItems: any[];
  dropdownSettings: IDropdownSettings = {};

  constructor(private assetDetailService: AssetDetailService, private categoryService: CategoryService) {
  }

  governorateAssets() {
    var dataList = [];
   // this.assetDetailService.PyramidGovernorateChart()
    this.assetDetailService
    .PyramidGovernoratePopulationChartByParams(this.filterAassetCountParam) 
    .subscribe(orgChart => {
      

      
      orgChart.forEach(element => {
        dataList.push({
          "governorateName": element["governorateName"],
          "governorateNameAr": element["governorateNameAr"], "population": element["population"]
        });
      });
      this.triangleChartOptions = {
        series: [
          {
            name: "",
            data: dataList.map(a => a.population),
          }
        ],
        chart: {
          type: "bar",
          height: 800
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            distributed: true,
            barHeight: "80%",//((dataList.map(a =>a.population)/100)*100).toString(),
            isFunnel: true
          }
        },
        colors: [
          "rgb(0, 143, 251)  ",
          "rgb(254, 176, 25) ",
          "rgb(0, 143, 250) ",
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208) ",
          "rgb(0, 143, 251)  ",
          "rgb(254, 176, 25) ",
          "rgb(0, 143, 250) ",
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208) ",
          "rgb(0, 143, 251)  ",
          "rgb(254, 176, 25) ",
          "rgb(0, 143, 250) ",
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208) ",
          "#CA6CD8",
          "rgb(0, 143, 251)  ",
          "rgb(254, 176, 25) ",
          "rgb(0, 143, 250) ",
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208) ",
          "rgb(0, 143, 251)  ",
          "rgb(254, 176, 25) ",
          "rgb(0, 143, 250) ",
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208) ",
          "#4BC3E6"
        ],
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":" + val;
          },
          dropShadow: {
            enabled: false
          },
          style: {
            colors: ['#000'],
          }
        },
       
        xaxis: {
          categories: this.lang == "en" ? dataList.map(a => a.governorateName) : dataList.map(a => a.governorateNameAr),
        },
        legend: {
          show: false
        }
      };
    });
  }
  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    this.filterAassetCountParam = { name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10,  categoryId: [], count: [], sortStatus: 'descending' }
    this.loadCategories();
    this.loadCategoryDropDownSettings();
    this.governorateAssets();
  
  }


loadCategories()
{
  this.categoryService.GetCategories().subscribe((items) => {
    this.lstCategories = items;
  });
}
loadCategoryDropDownSettings()
{
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: this.lang == "en" ? 'name' : 'nameAr',
    selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
    unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
}
  onCategorySelect(item: any) {
    this.categoryIds.push(item.id);
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.governorateAssets();
  }
  onCategorySelectAll(items: any) {
    items.array.forEach(element => {
      this.categoryIds.push(element.id);
    });
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.governorateAssets();
  }
  onCategoryDeselect(item: any) {
    const index = this.categoryIds.indexOf(item.id);
    if (index !== -1) {
      this.categoryIds.splice(index, 1);
    }
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.governorateAssets();
  }
  onCategoryDeselectAll(item: any) {
    this.categoryIds = [];
    this.filterAassetCountParam.categoryId = this.categoryIds;
    this.governorateAssets();
  }


}
