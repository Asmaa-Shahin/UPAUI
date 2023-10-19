import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ChartFilter, HospitalAssetAge } from 'src/app/shared/models/assetDetailVM';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};
@Component({
  selector: 'app-asset-age-groups',
  templateUrl: './asset-age-groups.component.html',
  styleUrls: ['./asset-age-groups.component.scss']
})
export class AssetAgeGroupsComponent {
  @ViewChild("chart") chart: ChartComponent;
  lstHospitalAssetAges:HospitalAssetAge[];
  public chartOptions: Partial<ChartOptions>;
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
  constructor(private assetDetailService:AssetDetailService,private organizationService:OrganizationService,private categoryService:CategoryService,private brandService:BrandService) {
  
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
  this.getAssetAge();
}
onOrgDeselect(item: any) {
  const index = this.organizationIds.indexOf(item.id);
  console.log(item);
  if (index !== -1) {
    this.organizationIds.splice(index, 1);
  }
  this.chartFilter.organizationIds = this.organizationIds;
  this.getAssetAge();

}
onOrgDeselectAll(event) {
  this.organizationIds = [];
  this.chartFilter.organizationIds = this.organizationIds;
 this.getAssetAge();
}
onOrgSelect(item: any) {


  this.organizationIds.push(item.id);

  this.chartFilter.organizationIds = this.organizationIds;

  this.getAssetAge();
 
}
onOrgSelectAll(items: any) {

  
  this.organizationIds=[];
  items.forEach(element => {
    this.organizationIds.push(element.id);
  });
  this.chartFilter.organizationIds = this.organizationIds;
  this.getAssetAge();
}


onBrandDeselect(item: any) {
  const index = this.brandIds.indexOf(item.id);
  console.log(item);
  if (index !== -1) {
    this.brandIds.splice(index, 1);
  }
  this.chartFilter.brandIds = this.brandIds;
  this.getAssetAge();

}
onBrandDeselectAll(event) {
  this.brandIds = [];
  this.chartFilter.brandIds = this.brandIds;
 this.getAssetAge();
}
onBrandSelect(item: any) {


  this.brandIds.push(item.id);

  this.chartFilter.brandIds = this.brandIds;

  this.getAssetAge();
 
}
onBrandSelectAll(items: any) {

  
  this.brandIds=[];
  items.forEach(element => {
    this.brandIds.push(element.id);
  });
  this.chartFilter.brandIds = this.brandIds;
  this.getAssetAge();
}



onCatDeselect(item: any) {
  const index = this.categoryIds.indexOf(item.id);
  console.log(item);
  if (index !== -1) {
    this.categoryIds.splice(index, 1);
  }
  this.chartFilter.categoryIds = this.categoryIds;
  this.getAssetAge();

}
onCatDeselectAll(event) {
  this.categoryIds = [];
  this.chartFilter.categoryIds = this.categoryIds;
 this.getAssetAge();
}
onCatSelect(item: any) {


  this.categoryIds.push(item.id);

  this.chartFilter.categoryIds = this.categoryIds;

  this.getAssetAge();
 
}
onCatSelectAll(items: any) {

  
  this.categoryIds=[];
  items.forEach(element => {
    this.categoryIds.push(element.id);
  });
  this.chartFilter.categoryIds = this.categoryIds;
  this.getAssetAge();
}
getAssetAge(){

  this.assetDetailService.GetAssetsByAgeGroup(this.chartFilter).subscribe(data => {
    this.lstHospitalAssetAges = data;
    this.chartOptions = {

      series: [
        {
          name: "Count Of Assets",
          data:  this.lang === "ar" ? this.lstHospitalAssetAges.map(h => h.count).reverse():this.lstHospitalAssetAges.map(h => h.count),
        }
      ],
 
      annotations: {
        points: [
          {
            x: "Age of Assets",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Age of Assets"
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          // endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false,
       
      },   
     
      stroke: {
        width: 2
      },
  
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
    
      xaxis: {
        
        labels: {
          rotate: -45
        },
        categories: this.lang === "ar" ? this.lstHospitalAssetAges.map(h => h.ageGroup).reverse() : this.lstHospitalAssetAges.map(h => h.ageGroup),
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Count Of Assets"
        },
            
        opposite:this.lang=="en"? false:true,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };
  })
 
}


}







