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




@Component({
  selector: 'app-chartdashboard',
  templateUrl: './chartdashboard.component.html',
  styleUrls: ['./chartdashboard.component.scss'],
})
export class ChartdashboardComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
 
  constructor() {
  }

  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
  }
  
}

