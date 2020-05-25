import { Company } from "~/app/models/Company.model";

export class NewsItem {
    private _id: number;
    private _title: string;
    private _content: string;
    private _date: Date;
    private _deleted: boolean;
    private _published: boolean;
    private _account: number;
    private _company: number;
    private _featured: boolean;

    constructor(id: number, title: string, content: string, date: Date, deleted: boolean,
                published: boolean, account: number, company: number, featured: boolean) {
        this._id = id;
        this._title = title;
        this._content = content;
        this._date = date;
        this._deleted = deleted;
        this._published = published;
        this._account = account;
        this._company = company;
        this._featured = featured;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get deleted(): boolean {
        return this._deleted;
    }

    set deleted(value: boolean) {
        this._deleted = value;
    }

    get published(): boolean {
        return this._published;
    }

    set published(value: boolean) {
        this._published = value;
    }

    get account(): number {
        return this._account;
    }

    set account(value: number) {
        this._account = value;
    }

    get company(): number {
        return this._company;
    }

    set company(value: number) {
        this._company = value;
    }

    get featured(): boolean {
        return this._featured;
    }

    set featured(value: boolean) {
        this._featured = value;
    }
}
