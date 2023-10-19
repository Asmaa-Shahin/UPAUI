export class DrawChart{

  organizationId:number ;
 organizationName:string;
 organizationNameAr:string ;

 listBars :DrawBarChart[];
}
export class DrawBarChart{
  governorateId:number;
   governorateName:string;
    governorateNameAr :string;

    assetCount :number; 


}

export class DrawChartByGov{

  governorateId:number ;
  governorateName:string;
  governorateNameAr:string ;

 listBars :DrawBarChartByGov[];
}
export class DrawBarChartByGov{
  organizationId:number;
   organizationName:string;
    organizationNameAr :string;

    assetCount :number; 


}

export class DrawBarChart2{

   governorateName:string;


    assetCount :number []; 


}


export class DrawBarChartByGov2{

  organizationName:string;


   assetCount :number []; 


}
export class DrawChartForGovAndPopulation{

  governorateName:string;
  governorateNameAr:string;

  NumberOfPopulationsforEachAsset :number ; 


}