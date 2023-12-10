// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Domain: 'http://localhost:42082/',
  getMacAddress: 'http://localhost:42082/api/Error/GetMacAddress',


  Login: "http://localhost:42082/api/Account/login",
  SortAssetDetail: "http://localhost:42082/api/AssetDetails/SortAssetDetail",
  ListGovernorates: "http://localhost:42082/api/Governorate/ListGovernorates",
  FilterDataByDepartmentBrandSupplierIdAndPaging: "http://localhost:42082/api/AssetDetails/FilterDataByDepartmentBrandSupplierIdAndPaging",
  GroupAssetDetailsByBrand: "http://localhost:42082/api/AssetDetails/GroupAssetDetailsByBrand",
  GroupAssetDetailsByGovernorate: "http://localhost:42082/api/AssetDetails/GroupAssetDetailsByGovernorate",
  GroupAssetDetailsByOrganization: "http://localhost:42082/api/AssetDetails/GroupAssetDetailsByOrganization",
  GroupAssetDetailsByHospital: "http://localhost:42082/api/AssetDetails/GroupAssetDetailsByHospital",
  GroupAssetDetailsBySubOrganization: "http://localhost:42082/api/AssetDetails/GroupAssetDetailsBySubOrganization",
  ListGovernoratesModel: "http://localhost:42082/api/Governorate/ListGovernoratesModel",
  ListOrganizations: "http://localhost:42082/api/Organization/ListOrganizations",
  GenerateOrgcode: "http://localhost:42082/api/Organization/GenerateOrgcode",
  ListCategories: "http://localhost:42082/api/Category/ListCategories",
  ListBrands: "http://localhost:42082/api/Brand/ListBrands",
  ListMasterAssetsWithNofilter: "http://localhost:42082/api/MasterAsset/ListMasterAssetsWithNofilter",
  GetAssetsByBrandId: "http://localhost:42082/api/AssetDetails/GetAssetsByBrandId",
  GetAssetsByGovId: "http://localhost:42082/api/AssetDetails/GetAssetsByGovId",
  GetAssetsByHosId: "http://localhost:42082/api/AssetDetails/GetAssetsByHosId",
  GetAssetsBySubOrgId: "http://localhost:42082/api/AssetDetails/GetAssetsBySubOrgId",
  GetAssetsByOrgId: "http://localhost:42082/api/AssetDetails/GetAssetsByOrgId",
  GetAssetsByUserIdAndPaging: 'http://localhost:42082/api/AssetDetails/GetAssetsByUserIdAndPaging/',
  SortAssetDetailAfterSearch: "http://localhost:42082/api/AssetDetails/SortAssetDetailAfterSearch",
  SortMasterAssetafterSearch: "http://localhost:42082/api/MasterAsset/SortMasterAssetafterSearch",

  GetCountOfAssetByOrganizationGovernorate: "http://localhost:42082/api/CountOfAsset/GetCountOfAssetByOrganizationGovernorate",
  GetCountOfAssetByCategoryGovernorate: "http://localhost:42082/api/CountOfAsset/GetCountOfAssetByCategoryGovernorate",
  CategoryPivotTable: "http://localhost:42082/api/CountOfAsset/CategoryPivotTable",
  CreateCountOfAssets: "http://localhost:42082/api/CountOfAsset/CreateCountOfAssets",
  SaveRecordCountOfAssets: "http://localhost:42082/api/CountOfAsset/SaveRecordCountOfAssets",
  UpdateCountOfAsset: "http://localhost:42082/api/CountOfAsset/UpdateCountOfAsset",
  GetCountOfAssetById: "http://localhost:42082/api/CountOfAsset/GetCountOfAssetById/",
  DeleteCountOfAsset: "http://localhost:42082/api/CountOfAsset/DeleteCountOfAsset/",
  GetCountOfAssets: "http://localhost:42082/api/CountOfAsset?",

  SortAssetsWithoutSearch: "http://localhost:42082/api/AssetDetails/SortAssetsWithoutSearch/",
  GetHospitalByGovId: "http://localhost:42082/api/Hospital/GetHospitalByGovId/",
setting:"http://localhost:42082/api/Settings/Login",
  AddOrganization: "http://localhost:42082/api/Organization/AddOrganization",
  GetOrganizationById: "http://localhost:42082/api/Organization/GetById/",
  UpdateOrganization: "http://localhost:42082/api/Organization/UpdateOrganization",
  DeleteOrganization: "http://localhost:42082/api/Organization/DeleteOrganization/",

  ListSubOrganizations: "http://localhost:42082/api/SubOrganization/ListSubOrganizations",
  GenerateSubcode: "http://localhost:42082/api/SubOrganization/GenerateSubcode",
  AddSubOrganization: "http://localhost:42082/api/SubOrganization/AddSubOrganization",
  GetSubOrganizationById: "http://localhost:42082/api/SubOrganization/GetById/",
  GetSubOrganizationByOrgId: "http://localhost:42082/api/SubOrganization/GetSubOrganizationByOrgId/",
  UpdateSubOrganization: "http://localhost:42082/api/SubOrganization/UpdateSubOrganization",
  DeleteSubOrganization: "http://localhost:42082/api/SubOrganization/DeleteSubOrganization/",
  GetOrganizationBySubId: "http://localhost:42082/api/SubOrganization/GetOrganizationBySubId/",
  DrawChart:"http://localhost:42082/api/AssetDetails/DrawingChart",
  DrawChartByGov:"http://localhost:42082/api/AssetDetails/DrawingChartByGov",
  DrawChartForGovAndPopulation:"http://localhost:42082/api/AssetDetails/DrawChartForGovAndPopulation",
  AddGovernorate: "http://localhost:42082/api/Governorate/AddGovernorate",
  GetGovernorateById: "http://localhost:42082/api/Governorate/GetById/",
  GetGovernorateByName: "http://localhost:42082/api/Governorate/GetGovernorateByName/",
  UpdateGovernorate: "http://localhost:42082/api/Governorate/UpdateGovernorate",
  DeleteGovernorate: "http://localhost:42082/api/Governorate/DeleteGovernorate/",

  ListCities: "http://localhost:42082/api/City/ListCities",
  AddCity: "http://localhost:42082/api/City/AddCity",
  GetCityById: "http://localhost:42082/api/City/GetById/",
  UpdateCity: "http://localhost:42082/api/City/UpdateCity",
  DeleteCity: "http://localhost:42082/api/City/DeleteCity/",
  getCityIdByName: 'http://localhost:42082/api/City/GetCityIdByName/',
  GetCitiesByGovernorateId: "http://localhost:42082/api/City/GetCitiesByGovernorateId/",
  GetAllLstHospitals: "http://localhost:42082/api/Hospital/GetAllLstHospitals",
  ListHospitals: "http://localhost:42082/api/Hospital/ListHospitals",
  GetHospitalById: "http://localhost:42082/api/Hospital/GetById/",
  UpdateHospital: "http://localhost:42082/api/Hospital/UpdateHospital/",
  DeleteHospital: "http://localhost:42082/api/Hospital/DeleteHospital/",
  AddHospital: "http://localhost:42082/api/Hospital/AddHospital",
  GenerateHospitalCode: "http://localhost:42082/api/Hospital/GenerateHospitalCode",
  AutoCompleteHospitalName:"http://localhost:42082/api/Hospital/AutoCompleteHospitalName/",
  GetHospitalDetailById: "http://localhost:42082/api/Hospital/GetHospitalDetailById/",
  GetHospitalsByUserId: "http://localhost:42082/api/Hospital/GetHospitalsByUserId/",
  GetHospitalsByCityId: "http://localhost:42082/api/Hospital/GetHospitalsByCityId/",
  GetHospitalsBySubOrganizationId: "http://localhost:42082/api/Hospital/GetHospitalsBySubOrganizationId/",
  GetHospitalByAssetId:"http://localhost:42082/api/Hospital/GetHospitalByAssetId/",

  GetHospitalAssetsByGovIdAndDeptIdAndHospitalId2: "http://localhost:42082/api/AssetDetails/GetHospitalAssetsByGovIdAndDeptIdAndHospitalId/",




  ListECRIs: "http://localhost:42082/api/ECRI/ListECRIs",
  AddECRI: "http://localhost:42082/api/ECRI/AddECRI",
  GetECRIById: "http://localhost:42082/api/ECRI/GetById/",
  UpdateECRI: "http://localhost:42082/api/ECRI/UpdateECRI",
  DeleteECRI: "http://localhost:42082/api/ECRI/DeleteECRI/",


  AddCategory: "http://localhost:42082/api/Category/AddCategory/",
  GetCategoryById: "http://localhost:42082/api/Category/GetById/",
  GetCategoryByCategoryTypeId: "http://localhost:42082/api/Category/GetCategoryByCategoryTypeId/",
  UpdateCategory: "http://localhost:42082/api/Category/UpdateCategory/",
  DeleteCategory: "http://localhost:42082/api/Category/DeleteCategory/",
  GenerateCategoryCode: "http://localhost:42082/api/Category/GenerateCategoryCode",



  ListSubCategories: "http://localhost:42082/api/SubCategory/ListSubCategories",
  GetSubCategoryByCategoryId: "http://localhost:42082/api/SubCategory/GetSubCategoryByCategoryId/",
  AddSubCategory: "http://localhost:42082/api/SubCategory/AddSubCategory/",
  GetSubCategoryById: "http://localhost:42082/api/SubCategory/GetById/",
  UpdateSubCategory: "http://localhost:42082/api/SubCategory/UpdateSubCategory/",
  DeleteSubCategory: "http://localhost:42082/api/SubCategory/DeleteSubCategory/",
  GenerateSubCategoryCode: "http://localhost:42082/api/SubCategory/GenerateSubCategoryCode",

  
  ListOrigins: "http://localhost:42082/api/Origin/ListOrigins",
  GetOrigins: "http://localhost:42082/api/Origin/GetOrigins",
  AddOrigin: "http://localhost:42082/api/Origin/AddOrigin/",
  GetOriginById: "http://localhost:42082/api/Origin/GetById/",
  UpdateOrigin: "http://localhost:42082/api/Origin/UpdateOrigin/",
  DeleteOrigin: "http://localhost:42082/api/Origin/DeleteOrigin/",
  SortOrigins: 'http://localhost:42082/api/Origin/SortOrigins/',

  GetBrandById: "http://localhost:42082/api/Brand/GetById/",
  AddBrand: "http://localhost:42082/api/Brand/AddBrand",
  UpdateBrand: "http://localhost:42082/api/Brand/UpdateBrand/",
  DeleteBrand: "http://localhost:42082/api/Brand/DeleteBrand/",
  GenerateBrandCode: "http://localhost:42082/api/Brand/GenerateBrandCode",



  ListAssetPeriorities: "http://localhost:42082/api/AssetPeriority/ListAssetPeriorities",
  FilterCountOfAssets: "http://localhost:42082/api/CountOfAsset/FilterCountOfAssets",
  FilterCountOfAssetByOrganizationGovernorate: "http://localhost:42082/api/CountOfAsset/FilterCountOfAssetByOrganizationGovernorate",

  GetAssetsByAgeGroup: "http://localhost:42082/api/AssetDetails/GetAssetsByAgeGroup",

  ListSuppliers: "http://localhost:42082/api/Supplier/ListSuppliers",
  AddSupplier: "http://localhost:42082/api/Supplier/AddSupplier",
  GetSupplierById: "http://localhost:42082/api/Supplier/GetById/",
  UpdateSupplier: "http://localhost:42082/api/Supplier/UpdateSupplier",
  DeleteSupplier: "http://localhost:42082/api/Supplier/DeleteSupplier/",
  CreateSupplierAttachment: "http://localhost:42082/api/Supplier/CreateSupplierAttachment/",
  GetSupplierAttachmentsBySupplierId: "http://localhost:42082/api/Supplier/GetSupplierAttachmentsBySupplierId/",
  SortSuppliers: "http://localhost:42082/api/Supplier/SortSuppliers",
  GenerateSupplierCode: "http://localhost:42082/api/Supplier/GenerateSupplierCode",




  GetAllAssets: "http://localhost:42082/api/AssetDetails/GetAllAssets",
  GetLastDocumentForAssetDetailId: 'http://localhost:42082/api/AssetDetails/GetLastDocumentForAssetDetailId/',
  SortAssets: 'http://localhost:42082/api/AssetDetails/SortAssets/',
  CreateAssetDetailAttachments: "http://localhost:42082/api/AssetDetails/CreateAssetDetailAttachments",
  GetAttachmentByAssetDetailId: "http://localhost:42082/api/AssetDetails/GetAttachmentByAssetDetailId/",
  DeleteAssetDetailAttachment: "http://localhost:42082/api/AssetDetails/DeleteAssetDetailAttachment/",
  UpdateAsset: "http://localhost:42082/api/AssetDetails/UpdateAssetDetail",
  AddAsset: "http://localhost:42082/api/AssetDetails/AddAssetDetail",
  DeleteAsset: "http://localhost:42082/api/AssetDetails/DeleteAssetDetail/",
  GenerateAssetDetailBarcode: "http://localhost:42082/api/AssetDetails/GenerateAssetDetailBarcode",
  GetAssetById: "http://localhost:42082/api/AssetDetails/GetById/",
  GetHospitalAssets: "http://localhost:42082/api/AssetDetails/GetHospitalAssets/",
  AutoCompleteAssetSerial: "http://localhost:42082/api/AssetDetails/AutoCompleteAssetSerial/",
  AutoCompleteAssetBarCode: "http://localhost:42082/api/AssetDetails/AutoCompleteAssetBarCode/",
  ViewAssetById: "http://localhost:42082/api/AssetDetails/ViewAssetDetailById/",
  PyramidGovernorateChart: "http://localhost:42082/api/AssetDetails/PyramidGovernorateChart",

  PyramidGovernorateChartByParams: "http://localhost:42082/api/AssetDetails/PyramidGovernorateChartByParams",
  PyramidGovernoratePopulationChartByParams: "http://localhost:42082/api/AssetDetails/PyramidGovernoratePopulationChartByParams",
  GetAssetsCountByOrganizationsAndCategories: "http://localhost:42082/api/AssetDetails/GetAssetsCountByOrganizationsAndCategories",


  


  DeleteMasterAssetImage: "http://localhost:42082/api/MasterAsset/DeleteMasterAssetImage/",
  GetLastDocumentForMsterAssetId: "http://localhost:42082/api/MasterAsset/GetLastDocumentForMsterAssetId/",
  AddMasterAsset: "http://localhost:42082/api/MasterAsset/AddMasterAsset",
  DeleteMasterAsset: "http://localhost:42082/api/MasterAsset/DeleteMasterAsset/",
  CreateMasterAssetAttachments: "http://localhost:42082/api/MasterAsset/CreateMasterAssetAttachments",
  GetAttachmentByMasterAssetId: "http://localhost:42082/api/MasterAsset/GetAttachmentByMasterAssetId/",
  DeleteMasterAssetAttachmentById: "http://localhost:42082/api/MasterAsset/DeleteMasterAssetAttachment/",
  SortMasterAssets: "http://localhost:42082/api/MasterAsset/SortMasterAssets/",
  UpdateMasterAsset: "http://localhost:42082/api/MasterAsset/UpdateMasterAsset",
  UpdateMasterAssetImageAfterInsert: "http://localhost:42082/api/MasterAsset/UpdateMasterAssetImageAfterInsert",
  GenerateMasterAssetcode: "http://localhost:42082/api/MasterAsset/GenerateMasterAssetcode",
  ListMasterAssets: "http://localhost:42082/api/MasterAsset/ListMasterAssets",
  GetMasterAssetById: "http://localhost:42082/api/MasterAsset/GetMasterAssetById/",
  AutoCompleteMasterAssetName: "http://localhost:42082/api/MasterAsset/AutoCompleteMasterAssetName/",
  DistinctAutoCompleteMasterAssetName: "http://localhost:42082/api/MasterAsset/DistinctAutoCompleteMasterAssetName/",
  ViewMasterAssetById: "http://localhost:42082/api/MasterAsset/ViewMasterAsset/",
  ListMasterAssetsByHospitalId: "http://localhost:42082/api/MasterAsset/ListMasterAssetsByHospitalId/",


  SortAssetsafterSearch: "http://localhost:42082/api/AssetDetails/SortAssetsafterSearch",
};

