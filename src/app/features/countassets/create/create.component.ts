import { Component, OnInit } from '@angular/core';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { CreateCountOfAssetsVM } from 'src/app/shared/models/countOfAssetVM';
import { ListGovernorateVM } from 'src/app/shared/models/governorateVM';
import { ListOrganizationVM } from 'src/app/shared/models/organizationVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { BrandService } from 'src/app/shared/services/brand.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CountOfAssetService } from 'src/app/shared/services/countOfAsset.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  responsiveOptions: any[] | undefined;
  imgURL: string = "";
  imgOrgURL: string = "";
  addCountOfAssetObj: CreateCountOfAssetsVM;
  lstCountOfAssets: CreateCountOfAssetsVM[] = [];

  lstGovernorates: ListGovernorateVM[] = [];
  lstOrganizations: ListOrganizationVM[] = [];
  lstCategories: ListCategoryVM[] = [];
  lstBrands: ListBrandVM[] = [];

  display: boolean = false;
  errorDisplay: boolean = false;
  errorMessage: string = "";


  public selectedIndex;


  constructor(
    private governorateService: GovernorateService, private organizationService: OrganizationService,
    private brandService: BrandService, private categoryService: CategoryService, private countOfAssetService: CountOfAssetService) { }

  ngOnInit(): void {
    this.addCountOfAssetObj = {
      brandId: 0, categoryId: 0, governorateId: 0, organizationId: 0, count: 0,
      governorateName: '', organizationName: '', categoryName: '', brandName: '',
      governorateNameAr: '', organizationNameAr: '', categoryNameAr: '', brandNameAr: '',
    };
    this.onLoad();


    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  onLoad() {
    this.organizationService.GetOrganizations().subscribe(items => {
      this.lstOrganizations = items;
      this.imgOrgURL = `${environment.Domain}UploadedAttachments/OrgLogo/`;
    });
    this.governorateService.GetGovernorates().subscribe(items => {
      this.lstGovernorates = items;
      this.imgURL = `${environment.Domain}UploadedAttachments/GovernorateLogo/`;
    });
    this.brandService.GetBrands().subscribe(items => {
      this.lstBrands = items;
    });
    this.categoryService.GetCategories().subscribe(items => {
      this.lstCategories = items;
    });
  }

  getGovernorateName(id: number, name: string, nameAr: string) {
    if (this.lang == "en") {
      this.addCountOfAssetObj.governorateName = name;
    }
    else {
      this.addCountOfAssetObj.governorateNameAr = nameAr;
    }
    this.addCountOfAssetObj.governorateId = id;



    this.lstGovernorates.forEach(element => {
      if (element.id == id) {
        document.getElementById(id.toString()).style.backgroundColor = '#fff';
        document.getElementById(id.toString()).style.color = '#11375E';

      }
      else {
        document.getElementById(element.id.toString()).style.backgroundColor = '#11375E';
        document.getElementById(element.id.toString()).style.color = '#fff';

      }
    });


  }

  getOrganizationName(id: number, name: string, nameAr: string) {
    if (this.lang == "en") {
      this.addCountOfAssetObj.organizationName = name;
    }
    else {
      this.addCountOfAssetObj.organizationNameAr = nameAr;
    }
    this.addCountOfAssetObj.organizationId = id;




    this.lstOrganizations.forEach(element => {
      if (element.id == id) {

        document.getElementById('org' + id.toString()).style.backgroundColor = '#fff';
        document.getElementById('org' + id.toString()).style.color = '#11375E';
      }
      else {
        document.getElementById('org' + element.id.toString()).style.backgroundColor = '#11375E';
        document.getElementById('org' + element.id.toString()).style.color = '#fff';

      }
    });
  }

  getBrandName(id: number, name: string, nameAr: string) {
    if (this.lang == "en") {
      this.addCountOfAssetObj.brandName = name;
    }
    else {
      this.addCountOfAssetObj.brandNameAr = nameAr;
    }
    this.addCountOfAssetObj.brandId = id;

    this.lstBrands.forEach(element => {
      if (element.id == id) {
        document.getElementById('brnd' + id.toString()).style.backgroundColor = '#fff';
        document.getElementById('brnd' + id.toString()).style.color = '#11375E';
      }
      else {
        document.getElementById('brnd' + element.id.toString()).style.backgroundColor = '#11375E';
        document.getElementById('brnd' + element.id.toString()).style.color = '#fff';

      }
    });

  }
  getCategoryName(id: number, name: string, nameAr: string) {
    if (this.lang == "en") {
      this.addCountOfAssetObj.categoryName = name;
    }
    else {
      this.addCountOfAssetObj.categoryNameAr = nameAr;
    }
    this.addCountOfAssetObj.categoryId = id;

    this.lstCategories.forEach(element => {
      if (element.id == id) {
        document.getElementById('cat' + id.toString()).style.backgroundColor = '#fff';
        document.getElementById('cat' + id.toString()).style.color = '#11375E';
      }
      else {
        document.getElementById('cat' + element.id.toString()).style.backgroundColor = '#11375E';
        document.getElementById('cat' + element.id.toString()).style.color = '#fff';

      }
    });
  }

  saveCountOfAsset() {
    // this.countOfAssetService.SaveCountOfAssets(this.lstCountOfAssets).subscribe(isSaved => {
    //   this.display = true;
    // })
    this.countOfAssetService.SaveRecordCountOfAssets(this.addCountOfAssetObj).subscribe(isSaved => {
      this.display = true;
      this.onLoad();
    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'asset') {
            this.errorMessage = error.error.message;
          }
        }
        if (this.lang == 'ar') {
          if (error.error.status == 'asset') {
            this.errorMessage = error.error.messageAr;
          }
        }
        return false;
      });

  }

  addCountOfAsset() {
    var isItemExist = this.lstCountOfAssets.find(x => x.governorateId === this.addCountOfAssetObj.governorateId && x.organizationId == this.addCountOfAssetObj.organizationId
      && x.categoryId == this.addCountOfAssetObj.categoryId && x.brandId == this.addCountOfAssetObj.brandId);
    if (!isItemExist)
      this.lstCountOfAssets.push(this.addCountOfAssetObj);
    else {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "Item already exist";
      }
      else {
        this.errorMessage = "هذا العنصر موجود";
      }
    }

    document.getElementById(this.addCountOfAssetObj.governorateId.toString()).style.backgroundColor = "";
    document.getElementById('cat' + this.addCountOfAssetObj.categoryId.toString()).style.backgroundColor = "";
    document.getElementById('org' + this.addCountOfAssetObj.organizationId.toString()).style.backgroundColor = "";
    document.getElementById('brnd' + this.addCountOfAssetObj.brandId.toString()).style.backgroundColor = "";
    this.addCountOfAssetObj = {
      brandId: 0, categoryId: 0, governorateId: 0, organizationId: 0, count: 0,
      governorateName: '', organizationName: '', categoryName: '', brandName: '',
      governorateNameAr: '', organizationNameAr: '', categoryNameAr: '', brandNameAr: '',
    };
  }

  // removeItemFromList(item) {
  //   const index: number = this.lstCountOfAssets.indexOf(item);
  //   if (index !== -1) {
  //     this.lstCountOfAssets.splice(index, 1);
  //   }
  // }
}
