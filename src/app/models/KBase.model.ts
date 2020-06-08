export class KBase {
    id: string;
    title: string;
    content: string;
    date: Date;
    published: boolean;
    accountId: string;

    constructor(title: string, content: string, date: Date,
                published: boolean, accountId: string, id?: string) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.published = published;
        this.accountId = accountId;
        this.id = id;
    }
}
