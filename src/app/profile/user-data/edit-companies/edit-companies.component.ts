import { Component, OnInit } from '@angular/core';
import { AccountService } from "~/app/services/account.service";
import { ImageService } from "~/app/services/image.service";
import { DialogService } from "~/app/services/dialog.service";
import { CompanyService } from "~/app/services/company.service";
import { Company } from "~/app/models/Company.model";
import { RouterExtensions } from '@nativescript/angular';
import { NavigationExtras } from "@angular/router";

@Component({
  selector: 'ns-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.css']
})
export class EditCompaniesComponent implements OnInit {
  private companies: Company[];

  constructor(private accountService: AccountService,
              private imageService: ImageService,
              private dialogService: DialogService,
              private companyService: CompanyService,
              private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {

  }

  addCompany() {
    this.companyService.getCompaniesForRegistration().then(companies => {
      this.companies = companies;
      let companyNames = [];

      if(companies.length == 0) {
        this.dialogService.showAlert("Let op!", "We konden geen bedrijven vinden, probeer het later opnieuw");
      } else {
        for(let company of companies) {
          companyNames.push(company.name);
        }
        this.showCompaniesPopup(companyNames);
      }

    }).catch(() => this.dialogService.showAlert("Let op!", "Er ging iets mis, probeer het later opnieuw."));
  }

  showCompaniesPopup(companyNames) {
    this.dialogService.showActions("Voeg bedrijf toe", "Selecteer een bedrijf", companyNames)
        .then(result => {
          this.processResult(result);
        })
  }

  private processResult(result: string) {
      if(result == null || result.trim() === "") {
          return;
      } else {
          let company = this.findCompany(result);
          let navigateExtras: NavigationExtras = {
              queryParams: {
                  company: JSON.stringify(company)
              }
          };
          this.routerExtensions.navigate(['mydata/register-job'], navigateExtras);
      }
  }

  private findCompany(result): Company {
      for(let company of this.companies) {
        if(company.name === result) {
            return company;
        }
      }
  }
}
