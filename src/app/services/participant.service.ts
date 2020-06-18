import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Participant } from "~/app/models/participant";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { AccountService } from "~/app/services/account.service";

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    private endpoint = "/Participants";

    constructor(private http: HttpService, private accountService: AccountService) {
    }

    /**
     * @param eventId
     *
     * Registers the user and returns if it was successful or not in the shape of a promise.
     */
    registerParticipant(eventId: string): Promise<void> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let participant = new Participant(eventId, this.accountService.account.id);

        return new Promise<void>((accept, reject) => {
            this.http.postData(this.endpoint, participant, httpHeaders)
                .subscribe(() => {
                    accept();
                }, () => {
                    reject();
                });
        });
    }

    getAllParticipations(): Observable<Participant[]> {
        return this.http.getData(this.endpoint);
    }

    /**
     *
     * Gets all the participants in the backend and then searches for the participants that has to be deleted
     * via searchThisParticipant. After that handleRemove will delete the participant and tell if
     * @param eventId
     */
    deleteParticipant(eventId: string): Promise<void> {
        let participant = new Participant(eventId, this.accountService.account.id);
        return new Promise<void>((accept, reject) => {
            this.http.deleteData(this.endpoint + "/deleteThisParticipant/" + participant.eventId + "/" +
                participant.accountId).subscribe(() => accept(), () => reject());
        });
    }

    /**
     * @author Valerie Timmerman
     * @param eventId id of the event to get participants for
     *
     * Gets all the participants and then check if the event id is the same as the event id we want participants for,
     * if this happens the participant is added to a list of participant for this event. It then returns this list in a
     * promise when everything is done.
     */
    getParticipantsForEvent(eventId): Promise<Participant[]> {
        return new Promise<Participant[]>((accept, reject) => {
            this.http.getData<Participant[]>(this.endpoint + "/getForEvent/" + eventId).subscribe(result => {
                accept(result);
            }, error => {
                reject(error);
            })
        });

    }

    isInThisEvent(event) {

    }

}
