// import { EditRoleVM } from "./roleVM";

export class ListUsersVM {
    id: string;
    userName: string;
    categoryRoleName: string;
    phoneNumber: string;
    email: string;
    displayName: string;
}
export class CreateUserVM {
    userName: string;
    email: string;
    email2: string;
    passwordHash: string;
    phoneNumber: string;
    roleId: string;
    roleCategoryId: number;
    governorateId: number;
    cityId: number;
    organizationId: number;
    subOrganizationId: number;
    hospitalId: number;
    roleIds: string[];
    //  userRoleIds: EditRoleVM[];
    supplierId: 0;
    commetieeMemberId: 0
}


export class EditUserVM {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    roleId: string;
    roleCategoryId: number;
    governorateId: number;
    cityId: number;
    organizationId: number;
    subOrganizationId: number;
    hospitalId: number;
    roleIds: string[];
    supplierId: 0;
    commetieeMemberId: 0;
}
export class User {
    userName: string;
    password: string;
    isRemembered: boolean;
}
export class LoggedUser {
    id: string;
    isRemembered: boolean;
    userName: string;
    email: string;
    userNameAr: string;
    roleName: string;
    roleNames: string[];
    displayName: string;
    token: string;
    message:string;
    governorateId: number;
      cityId: number;
    organizationId: number; 
     subOrganizationId: number;
    hospitalId: number;
    govName: string;
    orgName: string;
    govNameAr: string;
    orgNameAr: string;
    strInsituteAr:string;
    strInsitute:string;
    strLogo:string;
}

export class selectedHospitalType {
    id: number;
    name: string;
}

export class SortUsersVM {
    id: string;
    userName: string;
    categoryRoleName: string;
    phoneNumber: string;
    email: string;
    displayName: string;
    displayNameAr: string;

    sortStatus: string;
}