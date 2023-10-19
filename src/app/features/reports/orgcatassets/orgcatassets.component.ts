import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
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
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BehaviorSubject, count } from 'rxjs';
import { DrawBarChart2 } from 'src/app/shared/models/DrawChartVM';
import { FiletrAssetCountParam } from 'src/app/shared/models/assetcountparam';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { CountAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';

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
  selector: 'app-orgcatassets',
  templateUrl: './orgcatassets.component.html',
  styleUrls: ['./orgcatassets.component.scss']
})
export class OrgcatassetsComponent implements OnInit {
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
  listGov:ListGovernorateVM[];
  lisGovOrg:DrawBarChart2;

  constructor(private assetDetailService: AssetDetailService,private governorateService:GovernorateService, private categoryService: CategoryService) {
  
  
  }
  governorateAssets() {
    
    var governorateName :any=new BehaviorSubject(null);;
    var assetCount ;
    this.assetDetailService
    
    .DrawingChart()
    .subscribe(orgChart => {
      console.log(orgChart)

      orgChart.forEach(element => {
        var organizationName = this.lang == "en" ? element.organizationName : element.organizationNameAr;
      
        categories.push(organizationName);
    
      })});
    var seriesData = [];
        var categories = [];
        this.governorateService.GetGovernorates().subscribe(data=>{
          data.forEach(
            ele=> {
              const originalGovernorateName = this.lang == "en" ? ele.name : ele.nameAr;
              governorateName.next(originalGovernorateName);
              const lisGovOrg = {
                governorateName: originalGovernorateName,
                assetCount: [] // Initialize assetCount as an array
              };
          
             
          
              this.assetDetailService.DrawingChart().subscribe(orgChart => {
               
                const assetCounts = [];
      
                // Initialize assetCount for this iteration
               
                orgChart.forEach(element => {
                  let assetCount = 0;
                  element.listBars.forEach(govData => {
                    if (originalGovernorateName == govData.governorateName || originalGovernorateName == govData.governorateNameAr) {
                      assetCount = govData.assetCount; // Accumulate assetCount for this organization
                    

                    }
                 
              
                 
                  });
                  assetCounts.push(assetCount);
               
                  lisGovOrg.assetCount=assetCounts;  
                  console.log(lisGovOrg.assetCount);
                  });
               
                
                   
              
                  console.log(lisGovOrg);
                  seriesData.push({
                    name: lisGovOrg.governorateName,
                    data: lisGovOrg.assetCount
                  });
                  console.log(seriesData);
                  
      this.chartOptions = {
        series:seriesData,
        chart: {
          type: "bar",
          height: 350
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
          categories: categories
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
            formatter: function(val) {
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
  
  
  

//   governorateAssets() {
//     var dataList = [];
//     var series1 = [];
//     this.assetDetailService
//       .DrawingChart()
//       .subscribe(orgChart => {

//         orgChart.forEach(element => {
//           dataList.push({
//             "count": element["count"],
//             "organizationName": element["organizationName"],
//             "organizationNameAr": element["organizationNameAr"],
//             "listBars": element["listBars"]
//           });
//         });
// console.log(dataList);
//         // console.log("list", dataList)
//         var lstGovs = [];
//         dataList.forEach(element => {
//           lstGovs.push(element.listBars);
//         });

//         lstGovs.forEach(element => {
//           element.forEach(e=>    series1.push(e))
//       ;
//         });

// console.log("series1",series1)
// console.log(series1?.map(i => i.governorateName));

//         this.chartOptions = {
//           series: [
//             {
//               name: this.lang == "en" ? series1?.map(i => i.governorateName)?.toString() : series1?.map(i => i.governorateNameAr)?.toString(),
//               type: "column",
//               data: series1?.map(a => a.assetCount),
//             }
//           ],
//           chart: {
//             type: "bar",
//             height: 350
//           },
//           plotOptions: {
//             bar: {
//               horizontal: false,
//               columnWidth: "70%",
    
//             }
//           },
//           dataLabels: {
//             enabled: true
//           },
//           stroke: {
//             show: true,
//             width: 2,
//             colors: ["transparent"]
//           },
//           xaxis: {
//             categories:this.lang == "en" ? dataList.map(a => a.organizationName) : dataList.map(a => a.organizationNameAr),
//           },
//           yaxis: {
//             title: {
//               text: "$ (thousands)"
//             }
//           },
//           fill: {
//             opacity: 1
//           },
//           tooltip: {
//             y: {
//               formatter: function(val) {
//                 return "$ " + val + " thousands";
//               }
//             }
//           }
//         };





//       });
//   }
  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
  this.filterAassetCountParam ={name:[], govId:[],subOrgId:[],orgId:[],code:[],pageIndex: 1, pageSize: 10, brandId: [],  search: '', sort: '', skip: 0, take: 10,  categoryId: [], count: [], sortStatus: 'descending' }
    this.loadCategories();
    this.loadCategoryDropDownSettings();
    this.governorateAssets();
    this.lisGovOrg=
    {governorateName:'',
  assetCount:[]}

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

