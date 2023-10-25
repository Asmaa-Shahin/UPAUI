export const environment = {
  production: true,
  Domain: 'http://10.10.0.78/UPAAPI/',
  Login: "http://10.10.0.78/UPAAPI/api/Account/login",
  SortAssetDetail: "http://10.10.0.78/UPAAPI/api/AssetDetails/SortAssetDetail",
  ListGovernorates: "http://10.10.0.78/UPAAPI/api/Governorate/ListGovernorates",
  FilterDataByDepartmentBrandSupplierIdAndPaging: "http://10.10.0.78/UPAAPI/api/AssetDetails/FilterDataByDepartmentBrandSupplierIdAndPaging",
  GroupAssetDetailsByBrand: "http://10.10.0.78/UPAAPI/api/AssetDetails/GroupAssetDetailsByBrand",
  GroupAssetDetailsByGovernorate: "http://10.10.0.78/UPAAPI/api/AssetDetails/GroupAssetDetailsByGovernorate",
  GroupAssetDetailsByOrganization: "http://10.10.0.78/UPAAPI/api/AssetDetails/GroupAssetDetailsByOrganization",
  GroupAssetDetailsByHospital: "http://10.10.0.78/UPAAPI/api/AssetDetails/GroupAssetDetailsByHospital",
  GroupAssetDetailsBySubOrganization: "http://10.10.0.78/UPAAPI/api/AssetDetails/GroupAssetDetailsBySubOrganization",
  ListGovernoratesModel: "http://10.10.0.78/UPAAPI/api/Governorate/ListGovernoratesModel",
  ListOrganizations: "http://10.10.0.78/UPAAPI/api/Organization/ListOrganizations",
  GenerateOrgcode: "http://10.10.0.78/UPAAPI/api/Organization/GenerateOrgcode",
  ListCategories: "http://10.10.0.78/UPAAPI/api/Category/ListCategories",
  ListBrands: "http://10.10.0.78/UPAAPI/api/Brand/ListBrands",
  ListMasterAssetsWithNofilter: "http://10.10.0.78/UPAAPI/api/MasterAsset/ListMasterAssetsWithNofilter",
  GetAssetsByBrandId: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsByBrandId",
  GetAssetsByGovId: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsByGovId",
  GetAssetsByHosId: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsByHosId",
  GetAssetsBySubOrgId: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsBySubOrgId",
  GetAssetsByOrgId: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsByOrgId",
  GetAssetsByUserIdAndPaging: 'http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsByUserIdAndPaging/',
  SortAssetDetailAfterSearch: "http://10.10.0.78/UPAAPI/api/AssetDetails/SortAssetDetailAfterSearch",
  SortMasterAssetafterSearch: "http://10.10.0.78/UPAAPI/api/MasterAsset/SortMasterAssetafterSearch",

  GetCountOfAssetByOrganizationGovernorate: "http://10.10.0.78/UPAAPI/api/CountOfAsset/GetCountOfAssetByOrganizationGovernorate",
  GetCountOfAssetByCategoryGovernorate: "http://10.10.0.78/UPAAPI/api/CountOfAsset/GetCountOfAssetByCategoryGovernorate",
  CategoryPivotTable: "http://10.10.0.78/UPAAPI/api/CountOfAsset/CategoryPivotTable",
  CreateCountOfAssets: "http://10.10.0.78/UPAAPI/api/CountOfAsset/CreateCountOfAssets",
  SaveRecordCountOfAssets: "http://10.10.0.78/UPAAPI/api/CountOfAsset/SaveRecordCountOfAssets",
  UpdateCountOfAsset: "http://10.10.0.78/UPAAPI/api/CountOfAsset/UpdateCountOfAsset",
  GetCountOfAssetById: "http://10.10.0.78/UPAAPI/api/CountOfAsset/GetCountOfAssetById/",
  DeleteCountOfAsset: "http://10.10.0.78/UPAAPI/api/CountOfAsset/DeleteCountOfAsset/",
  GetCountOfAssets: "http://10.10.0.78/UPAAPI/api/CountOfAsset?",

  SortAssetsWithoutSearch: "http://10.10.0.78/UPAAPI/api/AssetDetails/SortAssetsWithoutSearch/",
  GetHospitalByGovId: "http://10.10.0.78/UPAAPI/api/Hospital/GetHospitalByGovId/",
setting:"http://10.10.0.78/UPAAPI/api/Settings/Login",
  AddOrganization: "http://10.10.0.78/UPAAPI/api/Organization/AddOrganization",
  GetOrganizationById: "http://10.10.0.78/UPAAPI/api/Organization/GetById/",
  UpdateOrganization: "http://10.10.0.78/UPAAPI/api/Organization/UpdateOrganization",
  DeleteOrganization: "http://10.10.0.78/UPAAPI/api/Organization/DeleteOrganization/",

  ListSubOrganizations: "http://10.10.0.78/UPAAPI/api/SubOrganization/ListSubOrganizations",
  GenerateSubcode: "http://10.10.0.78/UPAAPI/api/SubOrganization/GenerateSubcode",
  AddSubOrganization: "http://10.10.0.78/UPAAPI/api/SubOrganization/AddSubOrganization",
  GetSubOrganizationById: "http://10.10.0.78/UPAAPI/api/SubOrganization/GetById/",
  GetSubOrganizationByOrgId: "http://10.10.0.78/UPAAPI/api/SubOrganization/GetSubOrganizationByOrgId/",
  UpdateSubOrganization: "http://10.10.0.78/UPAAPI/api/SubOrganization/UpdateSubOrganization",
  DeleteSubOrganization: "http://10.10.0.78/UPAAPI/api/SubOrganization/DeleteSubOrganization/",
  GetOrganizationBySubId: "http://10.10.0.78/UPAAPI/api/SubOrganization/GetOrganizationBySubId/",
  DrawChart:"http://10.10.0.78/UPAAPI/api/AssetDetails/DrawingChart",
  DrawChartByGov:"http://10.10.0.78/UPAAPI/api/AssetDetails/DrawingChartByGov",
  DrawChartForGovAndPopulation:"http://10.10.0.78/UPAAPI/api/AssetDetails/DrawChartForGovAndPopulation",
  AddGovernorate: "http://10.10.0.78/UPAAPI/api/Governorate/AddGovernorate",
  GetGovernorateById: "http://10.10.0.78/UPAAPI/api/Governorate/GetById/",
  GetGovernorateByName: "http://10.10.0.78/UPAAPI/api/Governorate/GetGovernorateByName/",
  UpdateGovernorate: "http://10.10.0.78/UPAAPI/api/Governorate/UpdateGovernorate",
  DeleteGovernorate: "http://10.10.0.78/UPAAPI/api/Governorate/DeleteGovernorate/",

  ListCities: "http://10.10.0.78/UPAAPI/api/City/ListCities",
  AddCity: "http://10.10.0.78/UPAAPI/api/City/AddCity",
  GetCityById: "http://10.10.0.78/UPAAPI/api/City/GetById/",
  UpdateCity: "http://10.10.0.78/UPAAPI/api/City/UpdateCity",
  DeleteCity: "http://10.10.0.78/UPAAPI/api/City/DeleteCity/",
  getCityIdByName: 'http://10.10.0.78/UPAAPI/api/City/GetCityIdByName/',
  GetCitiesByGovernorateId: "http://10.10.0.78/UPAAPI/api/City/GetCitiesByGovernorateId/",
  GetAllLstHospitals: "http://10.10.0.78/UPAAPI/api/Hospital/GetAllLstHospitals",
  ListHospitals: "http://10.10.0.78/UPAAPI/api/Hospital/ListHospitals",
  GetHospitalById: "http://10.10.0.78/UPAAPI/api/Hospital/GetById/",
  UpdateHospital: "http://10.10.0.78/UPAAPI/api/Hospital/UpdateHospital/",
  DeleteHospital: "http://10.10.0.78/UPAAPI/api/Hospital/DeleteHospital/",
  AddHospital: "http://10.10.0.78/UPAAPI/api/Hospital/AddHospital",
  GenerateHospitalCode: "http://10.10.0.78/UPAAPI/api/Hospital/GenerateHospitalCode",
  AutoCompleteHospitalName:"http://10.10.0.78/UPAAPI/api/Hospital/AutoCompleteHospitalName/",
  GetHospitalDetailById: "http://10.10.0.78/UPAAPI/api/Hospital/GetHospitalDetailById/",
  GetHospitalsByUserId: "http://10.10.0.78/UPAAPI/api/Hospital/GetHospitalsByUserId/",
  GetHospitalsByCityId: "http://10.10.0.78/UPAAPI/api/Hospital/GetHospitalsByCityId/",
  GetHospitalsBySubOrganizationId: "http://10.10.0.78/UPAAPI/api/Hospital/GetHospitalsBySubOrganizationId/",
  GetHospitalByAssetId:"http://10.10.0.78/UPAAPI/api/Hospital/GetHospitalByAssetId/",

  GetHospitalAssetsByGovIdAndDeptIdAndHospitalId2: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetHospitalAssetsByGovIdAndDeptIdAndHospitalId/",




  ListECRIs: "http://10.10.0.78/UPAAPI/api/ECRI/ListECRIs",
  AddECRI: "http://10.10.0.78/UPAAPI/api/ECRI/AddECRI",
  GetECRIById: "http://10.10.0.78/UPAAPI/api/ECRI/GetById/",
  UpdateECRI: "http://10.10.0.78/UPAAPI/api/ECRI/UpdateECRI",
  DeleteECRI: "http://10.10.0.78/UPAAPI/api/ECRI/DeleteECRI/",


  AddCategory: "http://10.10.0.78/UPAAPI/api/Category/AddCategory/",
  GetCategoryById: "http://10.10.0.78/UPAAPI/api/Category/GetById/",
  GetCategoryByCategoryTypeId: "http://10.10.0.78/UPAAPI/api/Category/GetCategoryByCategoryTypeId/",
  UpdateCategory: "http://10.10.0.78/UPAAPI/api/Category/UpdateCategory/",
  DeleteCategory: "http://10.10.0.78/UPAAPI/api/Category/DeleteCategory/",
  GenerateCategoryCode: "http://10.10.0.78/UPAAPI/api/Category/GenerateCategoryCode",



  ListSubCategories: "http://10.10.0.78/UPAAPI/api/SubCategory/ListSubCategories",
  GetSubCategoryByCategoryId: "http://10.10.0.78/UPAAPI/api/SubCategory/GetSubCategoryByCategoryId/",
  AddSubCategory: "http://10.10.0.78/UPAAPI/api/SubCategory/AddSubCategory/",
  GetSubCategoryById: "http://10.10.0.78/UPAAPI/api/SubCategory/GetById/",
  UpdateSubCategory: "http://10.10.0.78/UPAAPI/api/SubCategory/UpdateSubCategory/",
  DeleteSubCategory: "http://10.10.0.78/UPAAPI/api/SubCategory/DeleteSubCategory/",
  GenerateSubCategoryCode: "http://10.10.0.78/UPAAPI/api/SubCategory/GenerateSubCategoryCode",

  
  ListOrigins: "http://10.10.0.78/UPAAPI/api/Origin/ListOrigins",
  GetOrigins: "http://10.10.0.78/UPAAPI/api/Origin/GetOrigins",
  AddOrigin: "http://10.10.0.78/UPAAPI/api/Origin/AddOrigin/",
  GetOriginById: "http://10.10.0.78/UPAAPI/api/Origin/GetById/",
  UpdateOrigin: "http://10.10.0.78/UPAAPI/api/Origin/UpdateOrigin/",
  DeleteOrigin: "http://10.10.0.78/UPAAPI/api/Origin/DeleteOrigin/",
  SortOrigins: 'http://10.10.0.78/UPAAPI/api/Origin/SortOrigins/',

  GetBrandById: "http://10.10.0.78/UPAAPI/api/Brand/GetById/",
  AddBrand: "http://10.10.0.78/UPAAPI/api/Brand/AddBrand",
  UpdateBrand: "http://10.10.0.78/UPAAPI/api/Brand/UpdateBrand/",
  DeleteBrand: "http://10.10.0.78/UPAAPI/api/Brand/DeleteBrand/",
  GenerateBrandCode: "http://10.10.0.78/UPAAPI/api/Brand/GenerateBrandCode",



  ListAssetPeriorities: "http://10.10.0.78/UPAAPI/api/AssetPeriority/ListAssetPeriorities",
  FilterCountOfAssets: "http://10.10.0.78/UPAAPI/api/CountOfAsset/FilterCountOfAssets",
  FilterCountOfAssetByOrganizationGovernorate: "http://10.10.0.78/UPAAPI/api/CountOfAsset/FilterCountOfAssetByOrganizationGovernorate",

  GetAssetsByAgeGroup: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsByAgeGroup",

  ListSuppliers: "http://10.10.0.78/UPAAPI/api/Supplier/ListSuppliers",
  AddSupplier: "http://10.10.0.78/UPAAPI/api/Supplier/AddSupplier",
  GetSupplierById: "http://10.10.0.78/UPAAPI/api/Supplier/GetById/",
  UpdateSupplier: "http://10.10.0.78/UPAAPI/api/Supplier/UpdateSupplier",
  DeleteSupplier: "http://10.10.0.78/UPAAPI/api/Supplier/DeleteSupplier/",
  CreateSupplierAttachment: "http://10.10.0.78/UPAAPI/api/Supplier/CreateSupplierAttachment/",
  GetSupplierAttachmentsBySupplierId: "http://10.10.0.78/UPAAPI/api/Supplier/GetSupplierAttachmentsBySupplierId/",
  SortSuppliers: "http://10.10.0.78/UPAAPI/api/Supplier/SortSuppliers",
  GenerateSupplierCode: "http://10.10.0.78/UPAAPI/api/Supplier/GenerateSupplierCode",




  GetAllAssets: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAllAssets",
  GetLastDocumentForAssetDetailId: 'http://10.10.0.78/UPAAPI/api/AssetDetails/GetLastDocumentForAssetDetailId/',
  SortAssets: 'http://10.10.0.78/UPAAPI/api/AssetDetails/SortAssets/',
  CreateAssetDetailAttachments: "http://10.10.0.78/UPAAPI/api/AssetDetails/CreateAssetDetailAttachments",
  GetAttachmentByAssetDetailId: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAttachmentByAssetDetailId/",
  DeleteAssetDetailAttachment: "http://10.10.0.78/UPAAPI/api/AssetDetails/DeleteAssetDetailAttachment/",
  UpdateAsset: "http://10.10.0.78/UPAAPI/api/AssetDetails/UpdateAssetDetail",
  AddAsset: "http://10.10.0.78/UPAAPI/api/AssetDetails/AddAssetDetail",
  DeleteAsset: "http://10.10.0.78/UPAAPI/api/AssetDetails/DeleteAssetDetail/",
  GenerateAssetDetailBarcode: "http://10.10.0.78/UPAAPI/api/AssetDetails/GenerateAssetDetailBarcode",
  GetAssetById: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetById/",
  GetHospitalAssets: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetHospitalAssets/",
  AutoCompleteAssetSerial: "http://10.10.0.78/UPAAPI/api/AssetDetails/AutoCompleteAssetSerial/",
  AutoCompleteAssetBarCode: "http://10.10.0.78/UPAAPI/api/AssetDetails/AutoCompleteAssetBarCode/",
  ViewAssetById: "http://10.10.0.78/UPAAPI/api/AssetDetails/ViewAssetDetailById/",
  PyramidGovernorateChart: "http://10.10.0.78/UPAAPI/api/AssetDetails/PyramidGovernorateChart",

  PyramidGovernorateChartByParams: "http://10.10.0.78/UPAAPI/api/AssetDetails/PyramidGovernorateChartByParams",
  PyramidGovernoratePopulationChartByParams: "http://10.10.0.78/UPAAPI/api/AssetDetails/PyramidGovernoratePopulationChartByParams",
  GetAssetsCountByOrganizationsAndCategories: "http://10.10.0.78/UPAAPI/api/AssetDetails/GetAssetsCountByOrganizationsAndCategories",


  


  DeleteMasterAssetImage: "http://10.10.0.78/UPAAPI/api/MasterAsset/DeleteMasterAssetImage/",
  GetLastDocumentForMsterAssetId: "http://10.10.0.78/UPAAPI/api/MasterAsset/GetLastDocumentForMsterAssetId/",
  AddMasterAsset: "http://10.10.0.78/UPAAPI/api/MasterAsset/AddMasterAsset",
  DeleteMasterAsset: "http://10.10.0.78/UPAAPI/api/MasterAsset/DeleteMasterAsset/",
  CreateMasterAssetAttachments: "http://10.10.0.78/UPAAPI/api/MasterAsset/CreateMasterAssetAttachments",
  GetAttachmentByMasterAssetId: "http://10.10.0.78/UPAAPI/api/MasterAsset/GetAttachmentByMasterAssetId/",
  DeleteMasterAssetAttachmentById: "http://10.10.0.78/UPAAPI/api/MasterAsset/DeleteMasterAssetAttachment/",
  SortMasterAssets: "http://10.10.0.78/UPAAPI/api/MasterAsset/SortMasterAssets/",
  UpdateMasterAsset: "http://10.10.0.78/UPAAPI/api/MasterAsset/UpdateMasterAsset",
  UpdateMasterAssetImageAfterInsert: "http://10.10.0.78/UPAAPI/api/MasterAsset/UpdateMasterAssetImageAfterInsert",
  GenerateMasterAssetcode: "http://10.10.0.78/UPAAPI/api/MasterAsset/GenerateMasterAssetcode",
  ListMasterAssets: "http://10.10.0.78/UPAAPI/api/MasterAsset/ListMasterAssets",
  GetMasterAssetById: "http://10.10.0.78/UPAAPI/api/MasterAsset/GetMasterAssetById/",
  AutoCompleteMasterAssetName: "http://10.10.0.78/UPAAPI/api/MasterAsset/AutoCompleteMasterAssetName/",
  DistinctAutoCompleteMasterAssetName: "http://10.10.0.78/UPAAPI/api/MasterAsset/DistinctAutoCompleteMasterAssetName/",
  ViewMasterAssetById: "http://10.10.0.78/UPAAPI/api/MasterAsset/ViewMasterAsset/",
  ListMasterAssetsByHospitalId: "http://10.10.0.78/UPAAPI/api/MasterAsset/ListMasterAssetsByHospitalId/",


  SortAssetsafterSearch: "http://10.10.0.78/UPAAPI/api/AssetDetails/SortAssetsafterSearch",
};