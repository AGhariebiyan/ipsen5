import { Company } from "~/app/models/Company.model";

export class NewsItem {
    id: string;
    title: string;
    content: string;
    date: Date;
    deleted: boolean;
    published: boolean;
    accountId: string;
    companyId: string;
    featured: boolean;

    constructor(title: string, content: string, date: Date, deleted: boolean,
                published: boolean, accountId: string, featured: boolean, id?: string) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.deleted = deleted;
        this.published = published;
        this.accountId = accountId;
        // this.companyId = companyId;
        this.featured = featured;
        this.id = id;
    }
}
