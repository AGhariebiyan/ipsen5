export class Event {
    date: string
    name: string
    description: string
    
    constructor(date: string, name: string, description: string) {
        this.date = date;
        this.name = name;
        this.description = description;
    }
}