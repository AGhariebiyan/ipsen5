import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Participant } from "~/app/shared/models/participant";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    private endpoint = "/Participants";

    constructor(private http: HttpService) { }

    registerParticipant(participant: Participant) {
        const httpParams = new HttpParams();
        httpParams.append('participant', JSON.stringify(participant));
        const httpHeaders = new HttpHeaders({
            contentType: 'application/json'
        });
        return this.http.postData(this.endpoint, httpParams, httpHeaders);
    }

}
