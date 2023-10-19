import { Component, OnInit, ViewChild } from '@angular/core';

import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { DrawBarChart2 } from 'src/app/shared/models/DrawChartVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { CountAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type StackedChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;

  legend: ApexLegend;
};
@Component({
  selector: 'app-govorgasset',
  templateUrl: './govorgasset.component.html',
  styleUrls: ['./govorgasset.component.scss']
})
export class GovorgassetComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  public stackedChartOptions: Partial<StackedChartOptions>;

  filterAassetCountParam = new FiletrAssetCountParam();
  lstCategories: ListCategoryVM[] = [];
  lstCountOfAssets: CountAssetsVM[] = [];
  categoryIds: number[] = [];
  selectedCategoryItems: any[];
  dropdownSettings: IDropdownSettings = {};
  listGov: ListGovernorateVM[];
  lisGovOrg: DrawBarChart2;
  constructor(private organizationService: OrganizationService, private assetDetailService: AssetDetailService, private governorateService: GovernorateService, private categoryService: CategoryService) {


  }
  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    this.filterAassetCountParam ={ name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10, categoryId: [], count: [], sortStatus: 'descending' }
    this.loadCategories();
    this.loadCategoryDropDownSettings();
    this.governorateAssets();
    this.lisGovOrg =
    {
      governorateName: '',
      assetCount: []
    }

  }
  governorateAssets() {

    var organizationName: any = new BehaviorSubject(null);;
    var assetCount;
    this.assetDetailService

      .DrawingChartByGov()
      .subscribe(govChart => {

        console.log(govChart);
        govChart.forEach(element => {
          var governorateName = this.lang == "en" ? element.governorateName : element.governorateNameAr;

          categories.push(governorateName);
        })
      });
    var seriesData = [];
    var categories = [];
    this.organizationService.GetOrganizations().subscribe(data => {
      data.forEach(
        ele => {
          const originalOrganizationName = this.lang == "en" ? ele.name : ele.nameAr;
          organizationName.next(originalOrganizationName);
          const lisGovOrg = {
            organizationName: originalOrganizationName,
            assetCount: [] // Initialize assetCount as an array
          };



          this.assetDetailService.DrawingChartByGov().subscribe(govChart => {

            const assetCounts = [];

            // Initialize assetCount for this iteration
          
            govChart.forEach(element => {
              let assetCount = 0;
              element.listBars.forEach(orgData => {
            
                if (originalOrganizationName == orgData.organizationName || originalOrganizationName == orgData.organizationNameAr) {
                  assetCount = orgData.assetCount; // Accumulate assetCount for this organization
                }
              });
              assetCounts.push(assetCount);

              lisGovOrg.assetCount = assetCounts;
              console.log(lisGovOrg.assetCount);
            });
            console.log(lisGovOrg);
            seriesData.push({
              name: lisGovOrg.organizationName,
              data: lisGovOrg.assetCount
            });
            console.log(seriesData);

            this.chartOptions = {
              series: seriesData,
              chart: {
                type: "bar",
                height: 350,
                offsetX:20 
              },

              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"]
              },
              xaxis: {
                categories: categories,
                labels: {
                  style: {
                     // colors: 'blue',  // Change label text color to blue
                      fontSize: '12px', // Change label font size to 12px
                  }
              }
              },
              yaxis: {
                title: {
                  text: ""
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return " " + val + "";
                  }
                }
              }
            };
            console.log(this.chartOptions.series);
          });
        });
    });
  }
  loadCategories() {
    this.categoryService.GetCategories().subscribe((items) => {
      this.lstCategories = items;
    });
  }
  loadCategoryDropDownSettings() {
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
