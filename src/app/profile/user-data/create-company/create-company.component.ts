import { Component, OnInit } from '@angular/core';
import { NewEvent } from "~/app/models/new-event.model";
import { RouterExtensions } from '@nativescript/angular';
import { Image } from "~/app/models/image.model";
import { ImageAsset } from "@nativescript/core/image-asset";
import { ImageService, UploadResponse, UploadStatus } from "~/app/services/image.service";
import { DialogService } from "~/app/services/dialog.service";
import { Company } from "~/app/models/Company.model";
import { CompanyService } from "~/app/services/company.service";

@Component({
    selector: 'ns-create-company',
    templateUrl: './create-company.component.html',
    styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
    private _company: Company;
    private imageSrc: ImageAsset;
    private imageSet: boolean;
    private static instance;

    constructor(private routerExtensions: RouterExtensions,
                private imageService: ImageService,
                private dialogService: DialogService,
                private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this._company = new Company(null, "", false, "");
        this.imageSet = false;
    }

    get company(): Company {
        return this._company;
    }

    confirm() {
        if (this.validateData()) {
            this.companyService.createCompany(this._company).subscribe( () => {
                this.dialogService.showAlert("Bedrijf registreren", "Het registreren is geslaagd.").then(() => {
                   this.goBack()
                });
            }, () => {
                this.dialogService.showAlert("Let op!", "Er ging iets mis, probeer het later opnieuw.")
            });
        }
    }

    selectImage() {
        this.imageService.selectSingleImage().then((image: ImageAsset) => {
            this.imageSrc = image;
            CreateCompanyComponent.instance = this;
            image.getImageAsync(this.setImage);
        });
    }

    setImage(image: Image, error) {
        CreateCompanyComponent.instance._company.image = image;
        CreateCompanyComponent.instance.imageSet = true;
    }

    goBack() {
        this.routerExtensions.back();
    }

    getImage() {
        return this._company.image;
    }

    validateData(): boolean {
        for (const key of Object.keys(this._company)) {
            const value = this._company[key];
            if (value == null || value.toString().trim() == "") {
                this.dialogService.showDialog("Let op!", "Er mogen geen waardes leeg zijn!");
                return false;
            }
        } return true;
    }

}
