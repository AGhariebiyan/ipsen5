import { Injectable } from "@angular/core";
import { environment } from "~/environments/environment.tns";
import { HttpClient } from "@angular/common/http";
import { Company } from "~/app/models/Company.model";
import { AccountService } from "~/app/services/account.service";
import { WorksAt } from "~/app/models/WorksAt.model";

@Injectable({
    providedIn: "root"
})

export class CompanyService {

    constructor(private http: HttpClient,
                private accountService: AccountService) {
    }

    getCompany(id: string){
        return this.http.get<Company>(environment.apiUrl + "/api/companies");
    }

    getWorksAt(id: string): WorksAt {
        const jobs: WorksAt[] = this.accountService.account.jobs.filter((job) => {
            return job.id === id;
        });
        if(jobs.length === 1) {
            return jobs[0];
        }
    }
}
