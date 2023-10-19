import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';




import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels
} from "ng-apexcharts";
import { DrawChartForGovAndPopulation } from 'src/app/shared/models/DrawChartVM';
import { MaxValidator } from '@angular/forms';
import { max } from 'rxjs';
import { ChartFilter } from 'src/app/shared/models/assetDetailVM';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { BrandService } from 'src/app/shared/services/brand.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
 // xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;

  //yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  dataLabels: ApexDataLabels;
  yaxis:  ApexYAxis | ApexYAxis[];
  xaxis: any; //ApexXAxis;
  stroke: any; // ApexStroke;
 // dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};
export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-gov-population-number',
  templateUrl: './gov-population-number.component.html',
  styleUrls: ['./gov-population-number.component.scss']
})
export class GovPopulationNumberComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  showPi:boolean=false;
  showCoulmn:boolean=true;
  public chartOptions2: Partial<ChartOptions2>;
  lstgovpopulation:DrawChartForGovAndPopulation[];
  lang = localStorage.getItem("lang");
  chartFilter:ChartFilter;
  organizationIds:number[]=[];
  categoryIds:number[]=[];
  brandIds:number[]=[];
  lstBrands:ListBrandVM[]=[];
  lstOrganizations:ListOrganizationVM[];
  lstCategories:ListCategoryVM[];
  selectedBrandItems:any;
  selectedCategoryItems:any;
  selectedOrganizationItems:any;
  dropdownSettings: IDropdownSettings = {};
  // lstGov:string[];
  // lstNumberOfpopulation:number[];
  constructor(private assetDetailService: AssetDetailService,private organizationService:OrganizationService,private categoryService:CategoryService,private brandService:BrandService) {

 
   
    
  }
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.lang == "en" ? 'name' : 'nameAr',
      selectAllText: this.lang == "en" ? 'Select All' : "اختر الكل",
      unSelectAllText: this.lang == "en" ? 'UnSelect All' : 'إلغاء تحديد الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.chartFilter={brandIds:[],categoryIds:[],organizationIds:[]}
    this.organizationService.GetOrganizations().subscribe(data=>{

      this.lstOrganizations=data;
    });
    this.chartFilter={brandIds:[],categoryIds:[],organizationIds:[]}
    this.brandService.GetBrands().subscribe(data=>{

      this.lstBrands=data;
    });
    this.chartFilter={brandIds:[],categoryIds:[],organizationIds:[]}
    this.categoryService.GetCategories().subscribe(data=>{

      this.lstCategories=data;
    });
    this.getGovPopulationNumber();
this.median([2,4,3,5,6]);
//console.log(this.median([2,4,3,5,6]));
  }


  openCoulmnChart(){
    this.showCoulmn=true;
    this.showPi=false;
  }
  openPiChart(){
    this.showCoulmn=false;
    this.showPi=true;
  }

  onOrgDeselect(item: any) {
    const index = this.organizationIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.organizationIds.splice(index, 1);
    }
    this.chartFilter.organizationIds = this.organizationIds;
    this.getGovPopulationNumber();

  }
  onOrgDeselectAll(event) {
    this.organizationIds = [];
    this.chartFilter.organizationIds = this.organizationIds;
   this.getGovPopulationNumber();
  }
  onOrgSelect(item: any) {
 

    this.organizationIds.push(item.id);
 
    this.chartFilter.organizationIds = this.organizationIds;
 
    this.getGovPopulationNumber();
   
  }
  onOrgSelectAll(items: any) {

    
    this.organizationIds=[];
    items.forEach(element => {
      this.organizationIds.push(element.id);
    });
    this.chartFilter.organizationIds = this.organizationIds;
    this.getGovPopulationNumber();
  }


  onBrandDeselect(item: any) {
    const index = this.brandIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.brandIds.splice(index, 1);
    }
    this.chartFilter.brandIds = this.brandIds;
    this.getGovPopulationNumber();

  }
  onBrandDeselectAll(event) {
    this.brandIds = [];
    this.chartFilter.brandIds = this.brandIds;
   this.getGovPopulationNumber();
  }
  onBrandSelect(item: any) {
 

    this.brandIds.push(item.id);
 
    this.chartFilter.brandIds = this.brandIds;
 
    this.getGovPopulationNumber();
   
  }
  onBrandSelectAll(items: any) {

    
    this.brandIds=[];
    items.forEach(element => {
      this.brandIds.push(element.id);
    });
    this.chartFilter.brandIds = this.brandIds;
    this.getGovPopulationNumber();
  }


  
  onCatDeselect(item: any) {
    const index = this.categoryIds.indexOf(item.id);
    console.log(item);
    if (index !== -1) {
      this.categoryIds.splice(index, 1);
    }
    this.chartFilter.categoryIds = this.categoryIds;
    this.getGovPopulationNumber();

  }
  onCatDeselectAll(event) {
    this.categoryIds = [];
    this.chartFilter.categoryIds = this.categoryIds;
   this.getGovPopulationNumber();
  }
  onCatSelect(item: any) {
 

    this.categoryIds.push(item.id);
 
    this.chartFilter.categoryIds = this.categoryIds;
 
    this.getGovPopulationNumber();
   
  }
  onCatSelectAll(items: any) {

    
    this.categoryIds=[];
    items.forEach(element => {
      this.categoryIds.push(element.id);
    });
    this.chartFilter.categoryIds = this.categoryIds;
    this.getGovPopulationNumber();
  }
  getGovPopulationNumber() {
   
    let median=[];
    var dataList = [];
    let average=[];

    this.assetDetailService.DrawChartForGovAndPopulation(this.chartFilter).subscribe(data => {
      const lstgovpopulation = data;

      if (data && data.length > 0) {
        data.forEach(element => {
          // Check if the expected properties exist in each item
          //console.log(data);
          dataList.push({
            "governorateName": element["governorateName"],
            "numberOfPopulationsforEachAsset": element["numberOfPopulationsforEachAsset"],
            "governorateNameAr": element["governorateNameAr"],
           
          });
         
        });
       

        for (let index = 0; index < data.length; index++) {
          median.push(Math.round(this.median(dataList.map(a => a.numberOfPopulationsforEachAsset))));
          average.push(Math.round(this.average(dataList.map(a => a.numberOfPopulationsforEachAsset))));
        }
    
 
      // console.log(this.median(dataList.map(a => a.numberOfPopulationsforEachAsset)));
        if (Array.isArray(dataList) && dataList.length > 0) {
          if(this.lang=="en"){
            dataList.sort((a, b) => b.numberOfPopulationsforEachAsset - a.numberOfPopulationsforEachAsset);
    
          }
     else{

     }

          // Map the sorted data to numberOfPopulationsforEachAsset
          this.chartOptions2 = {
            series:  dataList.map(a => Math.round(a.numberOfPopulationsforEachAsset))
            ,
            chart: {
              type: "donut",
              width: 600, // Set the desired width of the chart
              height: 600,
            },
            labels: this.lang == "en"? dataList.map(a => a.governorateName):dataList.map(a => a.governorateNameAr),
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                   
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
          this.chartOptions = {
            series: [
              {
                name: " Capita / CT",
                type: "column",
                data:  dataList.map(a => a.numberOfPopulationsforEachAsset)
              },
            
                {
                  name: "median ",
                  type: "line",
                  data: median,
                  
                },
                {
                  name: "average ",
                  type: "line",
                  data: average,
                },
              // ... other series definitions ...
            ],
            chart: {
              height: 350,
              type: "line",
              
            },
            plotOptions: {
              bar: {
                horizontal: false, // Make the columns vertical
                columnWidth: "40%", // Adjust the column width as needed
              // You can also set the ending shape of the columns
              },
            },
            dataLabels: {
              enabled: false
            },
           
            stroke: {
              width: 4
            },          
            labels: this.lang == "en"? dataList.map(a => a.governorateName):dataList.map(a => a.governorateNameAr),
            xaxis: {
              labels: {
                show: true,
                rotate:this.lang=="en"? -45:45,
                rotateAlways: true,
                minHeight: 20,
                maxHeight: 50,
                
                position: 'bottom',
                textDirection: 'rtl' ,
             
                style: {
                 
                }
              },
              categories: this.lang == "en"? dataList.map(a => a.governorateName):dataList.map(a => a.governorateNameAr),
              tickPlacement: 'on'
            },
           
            yaxis: [
              {
                title: {
                  text: "captia/ct",
                  style:{
                    cssClass: 'apexcharts-yaxis-title',
                  }
                   
                },
               
                opposite:this.lang=="en"? false:true,
                labels: {
                
                  align: 'right',
                  offsetX: 10,
                  formatter: function (value) {
                    // Check if the value is greater than or equal to 1 million
                    if (Math.abs(value) >= 1000000) {
                      // Format the value in millions with one decimal place
                      return (value / 1000000).toFixed(1) + 'M';
                    } else {
                      // Format smaller values normally
                      return value.toString();
                    }
                  }
                
                }
              },
           
              // {
              //   opposite: true,
              //   title: {
              //     text: "median"
              //   },
     
              // }
              
            ]
            
          };
        }
      }
      ;
   
    // Now, log it again to check its value after the loop
   
   
    });
  }
  median(arr) {
    const mid = Math.floor(arr.length / 2);
    const sortedArr = arr.sort((a, b) => a - b);
  
    if (arr.length % 2 === 0) {
       return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
       return sortedArr[mid];
    }
 }
 average(numbers) {
  // Calculate the sum of the numbers in the array
  let sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  // Divide the sum by the total number of elements in the array
  let avg = sum / numbers.length;

  // Return the average
  return avg;
}



  // Example usage:

 
}
