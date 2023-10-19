
export class ListBrandVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
}

export class CreateBrandVM {
    code: string;
    name: string;
    nameAr: string;
    governorateId: number;
    id: number;

}
export class BrandGroupVM {
    id: number;
    name: string;
    nameAr: string;
    assetList: ViewAssetForReportVM[];
}
export class ViewAssetForReportVM {
    id: number;
    code: string;
    createdBy: string;
    masterCode: string;
    purchaseDate: string;
    price: string;
    serialNumber: string;
    remarks: string;
    barcode: string;
    installationDate: string;
    warrantyExpires: string;
    room: string;
    floor: string;
    assetName: string;
    assetNameAr: string;
    supplierName: string;
    supplierNameAr: string;
    brandName: string;
    brandNameAr: string;
    hospitalId: number;
    departmentId: number;
    brandId: number;
    hospitalName: string;
    originName: string;
    categoryName: string;
    subCategoryName: string;
    governorateName: string;
    governorateNameAr: string;
    cityName: string;
    cityNameAr: string;
    orgName: string;
    orgNameAr: string;
    subOrgName: string;
    length: string;
    height: string;
    width: string;
    weight: string;
    modelNumber: string;
    versionNumber: string;
    description: string;
    descriptionAr: string;
    expectedLifeTime: string;
    hospitalNameAr: string;
    departmentName: string;
    departmentNameAr: string;
    buildName: string;
    buildNameAr: string;
    roomName: string;
    roomNameAr: string;
    floorName: string;
    floorNameAr: string;
    operationDate: string;
    receivingDate: string;
    poNumber: string;
    warrantyEnd: string;
    warrantyStart: string;
    depreciationRate: string;
    costCenter: string;
    assetImg: string;

    // new added
    barCode: string;
    masterAssetId: number;
    responseTime: string;
    hasSpareParts: boolean;
    isChecked: boolean;
    serial: string;
    qrFilePath: string;
    model: string;
    masterImg: string;
    endWarrantyDate: string;
    buildingName: string;
    buildingNameAr: string;

}
export class EditBrandVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
}







export class SortBrandVM {
    //   id: number;
    code: string;
    name: string;
    nameAr: string;
    sortStatus: string;
}

export class GenerateBrandCode {
    code: string;
}