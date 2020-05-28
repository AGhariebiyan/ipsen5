import { Injectable } from "@angular/core";
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

    constructor(private http: HttpService) { }

    registerParticipant(participant: Participant) {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
            this.http.postData(this.endpoint, participant, httpHeaders)
                .subscribe(() => {
                    dialogs.alert({
                        title: "Inschrijven",
                        message: "U bent nu ingeschreven voor het evenement.",
                        okButtonText: "Sluit"
                    });
                }, () => {
                    dialogs.alert({
                        title: "Inschrijven",
                        message: "Er ging iets mis, probeer het later opnieuw of neem contact op met de systeembeheerder.",
                        okButtonText: "Sluit"
                    });
            });
    }

    getAllParticipations(): Observable<Participant[]> {
        return this.http.getData(this.endpoint);
    }

}
