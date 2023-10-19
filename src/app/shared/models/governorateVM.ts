import { ViewAssetForReportVM } from "./assetDetailVM";

export class ListGovernorateVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    population: string;
    area: string;
    logo:string;

}

export class GroupGovernorateVM
{
    id:number;
    name:string;
    nameAr:string;
    assetList:ViewAssetForReportVM[];
}
export class ListGovernorateVM2 {
    governorateId: number;
    governorateName: string;
    governorateNameAr: string;
    logo: string;
}
export class CreateGovernorateVM {
    code: string;
    name: string;
    nameAr: string;
    population: number;
    area: number;
}

export class EditGovernorateVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    population: number;
    area: number;
}


export class GovernorateVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
}

