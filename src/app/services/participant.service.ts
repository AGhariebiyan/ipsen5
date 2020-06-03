import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Participant } from "~/app/shared/models/participant";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    private endpoint = "/Participants";

    constructor(private http: HttpService) {
    }

    /**
     * @param participant
     *
     * Registers the user and returns if it was successful or not in the shape of a promise.
     */
    registerParticipant(participant: Participant): Promise<void> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

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
     * @param thisParticipant
     *
     * Gets all the participants in the backend and then searches for the participants that has to be deleted
     * via searchThisParticipant. After that handleRemove will delete the participant and tell if
     * @param participants
     */
    deleteParticipant(thisParticipant, participants): Promise<void> {
        return new Promise<void>((accept, reject) => {
            this.getAllParticipations().subscribe(result => {
                if (result.length == 0) {
                    reject();
                } else {
                    thisParticipant = this.searchThisParticipant(result, thisParticipant);
                    this.handleRemove(thisParticipant).then(() => {
                        accept();
                    }).catch(() => {
                        reject();
                    });
                }
            });
        });
    }

    searchThisParticipant(participants: Participant[], thisParticipant: Participant): Participant {
        for (let participant of participants) {
            if (participant.accountId === thisParticipant.accountId && participant.eventId === thisParticipant.eventId) {
                return participant;
            }
        }
        return null;
    }

    private handleRemove(participant: Participant): Promise<void> {
        return new Promise<void>((accept, reject) => {
            this.http.deleteData(this.endpoint + "/" + participant.id).subscribe(() => {
                accept();
            }, () => {
                 reject();
            });
        });
    }

    getParticipantsForEvent(eventId): Promise<Participant[]> {
        return new Promise<Participant[]>((accept, reject) => {
            let participants = [];
            this.getAllParticipations().subscribe(result => {
                for(let participant of result) {
                    if(participant.eventId == eventId) {
                        participants.push(participant);
                    }
                }
                accept(participants);
            }, () => {
                reject(participants);
            });
        });

    }

}
