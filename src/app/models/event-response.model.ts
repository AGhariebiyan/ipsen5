import { Participant } from "~/app/models/participant";

export interface EventResponse {
    id: string;
    eventName: string;
    eventDescription: string;
    eventLocationName: string;
    eventLocationStreet: string;
    eventLocationPostalCode: string;
    eventLocationRegion: string;
    eventLocationCountry: string;
    eventDate: string;
    participants: Participant[];
}
