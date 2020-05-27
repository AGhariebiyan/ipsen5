import { EventEmitter, Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Participant } from "~/app/shared/models/participant";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    private endpoint = "/Participants";

    constructor(private http: HttpService) {
    }

    registerParticipant(participant: Participant): Promise<void> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return new Promise<void>((accept, reject) => {
            this.http.postData(this.endpoint, participant, httpHeaders)
                .subscribe(() => {
                    dialogs.alert({
                        title: "Inschrijven",
                        message: "U bent nu ingeschreven voor het evenement.",
                        okButtonText: "Sluit"
                    });
                    accept();
                }, () => {
                    this.handleError();
                    reject();
                });
        });
    }

    getAllParticipations(): Observable<Participant[]> {
        return this.http.getData(this.endpoint);
    }

    deleteParticipant(thisParticipant): Promise<void> {
        return new Promise<void>((accept, reject) => {
            this.getAllParticipations().subscribe(result => {
                if (result.length == 0) {
                    this.handleError();
                } else {
                    for (let participant of result) {
                        if (participant.accountId === thisParticipant.accountId && participant.eventId === thisParticipant.eventId) {
                            this.handleRemove(participant).then(() => {
                                accept();
                            }).catch(() => {
                                reject()
                            });
                        }
                    }
                }
            });
        });
    }

    handleError() {
        dialogs.alert({
            title: "Let op!",
            message: "Er ging iets mis, probeer het later opnieuw.",
            okButtonText: "Sluit"
        });
    }

    private handleRemove(participant: Participant): Promise<void> {
        return new Promise<void>((accept, reject) => {
            this.http.deleteData(this.endpoint + "/" + participant.id).subscribe(() => {
                dialogs.alert({
                    title: "Uitschrijven",
                    message: "U bent nu uitgeschreven voor het evenement.",
                    okButtonText: "Sluit"
                });
                accept();
            }, () => {
                 this.handleError();
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
