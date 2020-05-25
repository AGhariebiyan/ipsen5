import { Company } from "~/app/models/Company.model";

export class NewsItem {
    Id: string;
    Title: string;
    Content: string;
    Date: Date;
    Deleted: boolean;
    Published: boolean;
    AccountId: number;
    CompanyId: number;
    Featured: boolean;

    constructor(title: string, content: string, date: Date, deleted: boolean,
                published: boolean, account: number, company: number, featured: boolean) {

        this.Title = title;
        this.Content = content;
        this.Date = date;
        this.Deleted = deleted;
        this.Published = published;
        this.AccountId = account;
        this.CompanyId = company;
        this.Featured = featured;
    }
}
