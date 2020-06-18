export class NewEvent {
    eventDate: Date;
    eventName: string;
    eventDescription: string;
    eventLocationName: string;
    eventLocationStreet: string;
    eventLocationPostalCode: string;
    eventLocationRegion: string;
    eventLocationCountry: string;

    constructor(
        eventDate: Date, 
        eventName: string, 
        eventDescription: string, 
        eventLocationName: string, 
        eventLocationStreet: string, 
        eventLocationPostalCode: string, 
        eventLocationRegion: string, 
        eventLocationCountry: string) 
    {
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