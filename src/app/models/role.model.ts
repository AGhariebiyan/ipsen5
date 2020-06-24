

export class Role {
    id: string;
    title: string;
    description: string;
    canEditCompany: boolean;

    constructor(title: string, description: string, canEditCompany: boolean) {
        this.title = title;
        this.description = description;
        this.canEditCompany = canEditCompany;
    }
}
