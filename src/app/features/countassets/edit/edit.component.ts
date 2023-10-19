import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListBrandVM } from 'src/app/shared/models/brandVM';
import { ListCategoryVM } from 'src/app/shared/models/categoryVM';
import { EditCountOfAssetsVM } from 'src/app/shared/models/countOfAssetVM';
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  responsiveOptions: any[] | undefined;
  imgURL: string = "";
  imgOrgURL: string = "";
  editCountOfAssetObj: EditCountOfAssetsVM;

  lstGovernorates: ListGovernorateVM[] = [];
  lstOrganizations: ListOrganizationVM[] = [];
  lstCategories: ListCategoryVM[] = [];
  lstBrands: ListBrandVM[] = [];

  display: boolean = false;
  errorDisplay: boolean = false;
  errorMessage: string = "";


  countOfAssetId: number;

  public selectedIndex;


  constructor(
    private governorateService: GovernorateService, private organizationService: OrganizationService,
     private config: DynamicDialogConfig,private ref: DynamicDialogRef,
    private brandService: BrandService, private categoryService: CategoryService,
     private countOfAssetService: CountOfAssetService) { }

  ngOnInit(): void {
    this.editCountOfAssetObj = {
      id: 0,
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



    if (this.config.data != null) {
      this.countOfAssetId = this.config.data.id;
      this.countOfAssetService.GetCountOfAssetById(this.countOfAssetId).subscribe(editObj => {
        this.editCountOfAssetObj = editObj;

        this.lstGovernorates.forEach(element => {
          if (element.id == this.editCountOfAssetObj.governorateId) {
            document.getElementById(this.editCountOfAssetObj.governorateId.toString()).style.backgroundColor = '#fff';
            document.getElementById(this.editCountOfAssetObj.governorateId.toString()).style.color = '#11375E';

          }
          else {
            document.getElementById(element.id.toString()).style.backgroundColor = '#11375E'; 
            document.getElementById(element.id.toString()).style.color = '#fff'; 

          }
        });


        this.lstOrganizations.forEach(element => {
          if (element.id == this.editCountOfAssetObj.organizationId) {
            document.getElementById('org' + this.editCountOfAssetObj.organizationId.toString()).style.backgroundColor = '#fff';
            document.getElementById('org' + this.editCountOfAssetObj.organizationId.toString()).style.color = '#11375E';

          }
          else {
            document.getElementById('org' + element.id.toString()).style.backgroundColor = '#11375E';
            document.getElementById('org' + element.id.toString()).style.color = '#fff';

          }
        });


        this.lstBrands.forEach(element => {
          if (element.id == this.editCountOfAssetObj.brandId) {
            document.getElementById('brnd' + this.editCountOfAssetObj.brandId.toString()).style.backgroundColor = '#fff';
            document.getElementById('brnd' + this.editCountOfAssetObj.brandId.toString()).style.color = '#11375E';

          }
          else {
            document.getElementById('brnd' + element.id.toString()).style.backgroundColor = '#11375E';
            document.getElementById('brnd' + element.id.toString()).style.color = '#fff';

          }
        });



        this.lstCategories.forEach(element => {
          if (element.id == this.editCountOfAssetObj.categoryId) {
            document.getElementById('cat' + this.editCountOfAssetObj.categoryId.toString()).style.backgroundColor = '#fff';
            document.getElementById('cat' + this.editCountOfAssetObj.categoryId.toString()).style.color = '#11375E';

          }
          else {
            document.getElementById('cat' + element.id.toString()).style.backgroundColor = '#11375E';
            document.getElementById('cat' + element.id.toString()).style.color = '#fff';

          }
        });




      });
    }
  }

  getGovernorateName(id: number, name: string, nameAr: string) {
    if (this.lang == "en") {
      this.editCountOfAssetObj.governorateName = name;
    }
    else {
      this.editCountOfAssetObj.governorateNameAr = nameAr;
    }
    this.editCountOfAssetObj.governorateId = id;



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
      this.editCountOfAssetObj.organizationName = name;
    }
    else {
      this.editCountOfAssetObj.organizationNameAr = nameAr;
    }
    this.editCountOfAssetObj.organizationId = id;

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
      this.editCountOfAssetObj.brandName = name;
    }
    else {
      this.editCountOfAssetObj.brandNameAr = nameAr;
    }
    this.editCountOfAssetObj.brandId = id;

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
      this.editCountOfAssetObj.categoryName = name;
    }
    else {
      this.editCountOfAssetObj.categoryNameAr = nameAr;
    }
    this.editCountOfAssetObj.categoryId = id;

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
    this.editCountOfAssetObj.id = this.countOfAssetId;
    this.countOfAssetService.UpdateCountOfAsset(this.editCountOfAssetObj).subscribe(isSaved => {
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

  closeDialogue()
  {
    this.ref.close();
  }
}
