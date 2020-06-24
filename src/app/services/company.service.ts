import { Injectable } from "@angular/core";
import { environment } from "~/environments/environment.tns";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Company } from "~/app/models/Company.model";
import { AccountService } from "~/app/services/account.service";
import { WorksAt } from "~/app/models/WorksAt.model";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/internal/operators";
import { HttpService } from "~/app/services/http.service";
import { Role } from "~/app/models/role.model";

@Injectable({
    providedIn: "root"
})

export class CompanyService {

    private endpoint = "/companies";

    constructor(private http: HttpService,
                private accountService: AccountService) {
    }

    getCompany(id: string) {
        return this.http.getData<Company>(this.endpoint);
    }

    getWorksAt(id: string): WorksAt {
        const jobs: WorksAt[] = this.accountService.account.jobs.filter((job) => {
            return job.id === id;
        });
        if (jobs.length === 1) {
            return jobs[0];
        }
    }

    updateJobDescription(worksAt: WorksAt) {
        return this.http.putData("/accounts/" + this.accountService.account.id + "/jobs/" + worksAt.id, worksAt, this.http.jsonHeader);
    }

    updateCompany(company: Company) {
        return this.http.putData(this.endpoint + "/" +  company.id, company, this.http.jsonHeader);
    }

    deleteCompany(companyId: string) {
        return this.http.deleteData(this.endpoint + "/" + companyId).pipe(tap((data) => {
            this.accountService.removeJobFromList(companyId);
        }));
    }

    getCompanies(): Promise<Company[]> {
        return new Promise<Company[]>((accept, reject) => {
            this.http.getData<Company[]>(this.endpoint)
                .subscribe((companies) => {
                    accept(companies);
                }, (error) => {
                    reject(error);
                });
        });

    }

    createCompany(company: Company) {
        return this.http.postData<Company>(this.endpoint, company, this.http.jsonHeader);
    }

    registerCEO(company) {
        const account = this.accountService. account;
        const role = new Role("CEO", "Eigenaar van het bedrijf.", true);
        const worksAt = new WorksAt(company, account, role);
        this.http.postData<WorksAt>("/accounts/" +  account.id + "/jobs", worksAt, this.http.jsonHeader).subscribe((result) => {
            result.company.image = company.image;
            this.updateJobs(result);
        }, (error) => {
            console.log("Error: \n" + error);
        });
    }

    private updateJobs(result) {
        this.accountService.account.jobs.push(result);
        this.accountService.updateObservable(this.accountService.account);
    }
}
