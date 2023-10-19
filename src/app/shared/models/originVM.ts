export class ListOriginVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
}

export class CreateOriginVM {
    code: string;
    name: string;
    nameAr: string;
    governorateId: number;

}

export class EditOriginVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
}



export class SortOriginVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    sortStatus: string;
}


export class MainClass {
results:ListOriginVM[];
count:number;
}

