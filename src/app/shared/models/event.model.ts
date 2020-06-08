export class Event {
    id: string;
    eventDate: Date;
    eventName: string;
    eventDescription: string;
    eventLocationName: string;
    eventLocationStreet: string;
    eventLocationPostalCode: string;
    eventLocationRegion: string;
    eventLocationCountry: string;

    constructor(
        id: string,
        eventDate: Date, 
        eventName: string, 
        eventDescription: string, 
        eventLocationName: string, 
        eventLocationStreet: string, 
        eventLocationPostalCode: string, 
        eventLocationRegion: string, 
        eventLocationCountry: string) 
    {
        this.id = id;
        this.eventDate = eventDate;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventLocationName = eventLocationName;
        this.eventLocationStreet = eventLocationStreet;
        this.eventLocationPostalCode = eventLocationPostalCode;
        this.eventLocationRegion = eventLocationRegion;
        this.eventLocationCountry = eventLocationCountry;
    }
}
