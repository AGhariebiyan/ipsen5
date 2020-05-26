import { Company } from "~/app/models/Company.model";

export class NewsItem {
    id: string;
    title: string;
    content: string;
    date: Date;
    deleted: boolean;
    published: boolean;
    account: string;
    company: string;
    featured: boolean;

    constructor(id: string, title: string, content: string, date: Date, deleted: boolean,
                published: boolean, account: string, company: string, featured: boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.deleted = deleted;
        this.published = published;
        this.account = account;
        this.company = company;
        this.featured = featured;
    }
}
