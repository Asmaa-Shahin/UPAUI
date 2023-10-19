import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AssetCountParam } from 'src/app/shared/models/assetcountparam';
import { CountAssetsVM, EditCountOfAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { CountOfAssetService } from 'src/app/shared/services/countOfAsset.service';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { DeleteconfirmComponent } from '../deleteconfirm/deleteconfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { ListGovernorateVM, ListGovernorateVM2 } from 'src/app/shared/models/governorateVM';
import { environment } from 'src/environments/environment';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  lang = localStorage.getItem("lang");
  assetcountParam = new AssetCountParam();
  lstCountOfAssets: CountAssetsVM[];
  lstGovernorates:ListGovernorateVM2[]=[];
  countOfAssetObj: EditCountOfAssetsVM;
  governorateNames: SelectItem[] = [];
  count: number;
  imgURL: string = "";

  constructor(private countAssetsService: CountOfAssetService, private governorateService:GovernorateService,
     private dialog: MatDialog, public dialogService: DialogService, private route: Router) {

  }
  ngOnInit(): void {

    this.assetcountParam = { pageIndex: 1, pageSize: 10, brandId: 0, search: '', sort: '', typeId: 0, count: 0 }

    this.governorateService.ListGovernoratesModel().subscribe(items => {
      this.lstGovernorates = items;
      this.imgURL = `${environment.Domain}UploadedAttachments/GovernorateLogo/`;  
    });

    

  }
  clicktbl($event) {

    this.assetcountParam.pageIndex = ($event.first + 10) / 10;
    this.assetcountParam.pageSize = $event.rows;


    this.countAssetsService.GetCountOfAssets(this.assetcountParam).subscribe(result => {
      this.lstCountOfAssets = result.data;
      this.count = result.count;
    });

  }
  addCountAsset() {
    const dialogRef2 = this.dialogService.open(CreateComponent, {
      header: this.lang == "en" ? 'Add' : "إضافة بيان جهاز",
      width: '95%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 50
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reload();
    });
  }
  deleteCountOfAsset(id: number) {
    this.countAssetsService.GetCountOfAssetById(id).subscribe((data) => {
      this.countOfAssetObj = data;
      const orgDialog = this.dialog
        .open(DeleteconfirmComponent, {
          width: '50%',
          autoFocus: true,
          data: {
            id: this.countOfAssetObj.id,
            governorateName: this.countOfAssetObj.governorateName,
            governorateNameAr: this.countOfAssetObj.governorateNameAr,
            organizationName: this.countOfAssetObj.organizationName,
            organizationNameAr: this.countOfAssetObj.organizationNameAr,
            brandName: this.countOfAssetObj.brandName,
            brandNameAr: this.countOfAssetObj.brandNameAr,
            categoryName: this.countOfAssetObj.categoryName,
            categoryNameAr: this.countOfAssetObj.categoryNameAr
          },
        });
    });
    // this.route.navigate(['/dash/brands']);
  }
  editCountOfAsset(id: number) {
    const ref = this.dialogService.open(EditComponent, {
       header: this.lang == "en" ? "Edit " : "تعديل",
      data: {
        id: id
      },
      width: '95%',
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 40
      }
    });
    ref.onClose.subscribe(() => {
      this.reload();
    });
  }
  reload() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }
}
