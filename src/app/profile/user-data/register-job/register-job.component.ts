import { Component, OnInit } from '@angular/core';
import { CompanyService } from "~/app/services/company.service";
import { DialogService } from "~/app/services/dialog.service";
import { Role } from "~/app/models/role.model";
import { JobRequest } from "~/app/models/JobRequest";
import { Company } from "~/app/models/Company.model";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { ImageService } from "~/app/services/image.service";

@Component({
  selector: 'ns-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['./register-job.component.css']
})
export class RegisterJobComponent implements OnInit {

  private _jobRequest: JobRequest;
    inProgress = false;

  constructor(private companyService: CompanyService,
              private dialogService: DialogService,
              private routerExtensions: RouterExtensions,
              private activeRoute: ActivatedRoute,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this._jobRequest = new JobRequest("", "", false, null);
     this.activeRoute.queryParams.subscribe(params => {
         this._jobRequest.company = JSON.parse(params['company']);
     }).unsubscribe();
  }

  get jobRequest() {
    return this._jobRequest;
  }

  goBack() {
      this.routerExtensions.back();
  }

  confirm() {
      if(this.validateData()) {
          this.companyService.requestJob(this._jobRequest).subscribe(() => {
              this.dialogService.showDialog("Bedrijf toevoegen", "Er is een aanvraag verstuurt ter verificatie.")
                  .then(() => this.goBack());
          }, () => {
              this.dialogService.showAlert("Let op!", "Er ging iets is, probeer het later opnieuw of neem " +
                  "contact op met de systeembeheerder.")
          })
      }
  }

    private validateData() {
        for (const key of Object.keys(this._jobRequest)) {
            const value = this._jobRequest[key];
            if (value == null || value.toString().trim() == "") {
                this.dialogService.showDialog("Let op!", "Er mogen geen waardes leeg zijn!");
                return false;
            }
        } return true;
    }
}
