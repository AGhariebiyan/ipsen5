import { Company } from "~/app/models/Company.model";

export class JobRequest {
    title: string;
    description: string;
    canEditCompany: boolean;
    company: Company;

    constructor(title, description, canEditCompany, company) {
        this.title = title;
        this.description = description;
        this.canEditCompany = canEditCompany;
        this.company = company;
    }

}
