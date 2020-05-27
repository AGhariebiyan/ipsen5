import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Participant } from "~/app/shared/models/participant";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

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
        this.http.postData(this.endpoint, participant, httpHeaders).subscribe();
    }

    getAllParticipations(): Observable<Participant[]> {
        return this.http.getData(this.endpoint);
    }

}
