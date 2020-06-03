export class Event {
    eventId: string;
    eventDate: Date;
    eventName: string;
    eventDescription: string;
    locationName: string;
    locationStreet: string;
    locationPostalCode: string;
    locationRegion: string;
    locationCountry: string;

    constructor(
        eventId: string,
        eventDate: Date, 
        eventName: string, 
        eventDescription: string, 
        locationName: string, 
        locationStreet: string, 
        locationPostalCode: string, 
        locationRegion: string, 
        locationCountry: string) 
    {
        this.eventId = eventId;
        this.eventDate = eventDate;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.locationName = locationName;
        this.locationStreet = locationStreet;
        this.locationPostalCode = locationPostalCode;
        this.locationRegion = locationRegion;
        this.locationCountry = locationCountry;
    }
}
