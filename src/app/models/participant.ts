export class Participant {

    id: string;
    eventId: string;
    accountId: string;

    constructor(eventId: string, accountId: string) {
        this.eventId = eventId;
        this.accountId = accountId;
    }

}
