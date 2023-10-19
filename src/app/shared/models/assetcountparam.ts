export class AssetCountParam {
    brandId?:number;
    typeId?:number;
    sort = 'name';
    pageIndex = 1;
    pageSize = 10;
    search: string;
    count:number;
}


export class FiletrAssetCountParam {

name:string[]
    pageIndex ;
    pageSize ;
 categoryId :number[];
   govId :number[];
        orgId :number[];
     subOrgId :number[];
            code :number[];
       brandId :number[];
       count :number[];
         sort:string;
         sortStatus:string;
        search:string;
        skip: number;
         take:number ;
}