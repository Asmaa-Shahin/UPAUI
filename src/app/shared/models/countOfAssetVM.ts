import { ListGovernorateVM } from "./governorateVM";
import { ListOrganizationVM } from "./organizationVM";

export class CreateCountOfAssetsVM {
    governorateId: number;
    organizationId: number;
    categoryId: number;
    brandId: number;
    count: number;
    governorateName: string;
    organizationName: string;
    categoryName: string;
    brandName: string;
    governorateNameAr: string;
    organizationNameAr: string;
    categoryNameAr: string;
    brandNameAr: string;
}

export class MainClass {
    data: CountAssetsVM[];
    pagesize: number;
    pageIndex: number;
    count: number;
}
export class CountAssetsVM {
    id: number;
    governorateName: string;
    governorateNameAr: string;
    organizationName: string;
    organizationNameAr: string
    brandName: string;
    brandNameAr: string;
    categoryName: string;
    categoryNameAr: string;
    governorateId: number;
    organizationId: number;
    categoryId: number;
    brandId: number;
    count: number;
    population:number;
}



export class EditCountOfAssetsVM {
    id: number;
    governorateId: number;
    organizationId: number;
    categoryId: number;
    brandId: number;
    count: number;
    governorateName: string;
    organizationName: string;
    categoryName: string;
    brandName: string;
    governorateNameAr: string;
    organizationNameAr: string;
    categoryNameAr: string;
    brandNameAr: string;
}


export class PivotedEntity {
    countAssets: number;
    categoryName: string;
    governorateName: string;
    categoryNameAr: string;
    governorateNameAr: string;
}

export class mainClass {
    results: CountAssetsVM[];
    pagesize: number;
    pageIndex: number;
    count: number;
}

export class ChartCountOfAssetDetailVM
{
    count : number;
    organizationObj :ListOrganizationVM[];
    governorateCount:number;

    listGovernorates:ListGovernorateVM[];
}