import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Image } from "~/app/models/image.model";
import { ImageAsset } from "@nativescript/core/image-asset";
import { ImageService, UploadResponse, UploadStatus } from "~/app/services/image.service";
import { DialogService } from "~/app/services/dialog.service";
import { Company } from "~/app/models/Company.model";
import { CompanyService } from "~/app/services/company.service";
import { Observable } from "rxjs";

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
    private inProgress: boolean = false;

    constructor(private routerExtensions: RouterExtensions,
                private imageService: ImageService,
                private dialogService: DialogService,
                private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this._company = new Company(null, "", true, "");
        this.imageSet = false;
    }

    get company(): Company {
        return this._company;
    }

    /**
     * @author Valerie Timmerman
     *
     * Handles the creation of the company.
     */
    confirm() {
        this.inProgress = true;
        this.dialogService.showConfirm("Bedrijf registeren", "Weet u zeker dat dit bedrijf wilt aanmaken?")
            .then(result => {
                if(result) this.processConfirmation();
            });
    }

    selectImage() {
        this.imageService.selectSingleImage().then((image: ImageAsset) => {
            this.imageSrc = image;
            CreateCompanyComponent.instance = this;
            image.getImageAsync(this.setImage);
        });
    }

    /**
     * @author Valerie Timmerman
     * @param image
     * @param error
     *
     * Callback for getImageAsync, this will set the image for the preview as long as there are no errors.
     */
    setImage(image: Image, error) {
        if(error) {
            this.dialogService.showAlert("Let op!", "De opgegeven afbeelding werd niet gevonden.")
        } else {
            CreateCompanyComponent.instance._company.image = image;
            CreateCompanyComponent.instance.imageSet = true;
        }
    }

    goBack() {
        this.routerExtensions.back();
    }

    getImage() {
        return this._company.image;
    }

    /**
     * @author Valerie Timmerman
     *
     * Checks if none of the data within the company model is empty
     */
    validateData(): boolean {
        for (const key of Object.keys(this._company)) {
            const value = this._company[key];
            if (value == null || value.toString().trim() == "") {
                this.dialogService.showDialog("Let op!", "Er mogen geen waardes leeg zijn!");
                return false;
            }
        } return true;
    }

    uploadPicture(company: Company): Observable<Image> {
        return new Observable((subscriber) => {
            this.imageService.uploadCompanyProfilePicture(company.id, this.imageSrc).subscribe((status: UploadResponse) => {
                if (status.state === UploadStatus.RESPONDED) {
                    const image: Image = JSON.parse(status.data.data);
                    subscriber.next(image);
                }
                if (status.state === UploadStatus.COMPLETE) {
                    this.dialogService.showAlert("Bedrijf registreren", "Het registreren is geslaagd.").then(() => {
                        this.goBack();
                    });
                }
            }, () => {
                this.dialogService.showAlert("Let op!", "Het bedrijf is geregistreerd, maar de afbeelding kon niet " +
                    "correct worden geupload.").then(() => {
                    subscriber.next(null);
                    this.goBack();
                });
            });
        });
    }

    private processConfirmation() {
        if (this.validateData()) {
            this.companyService.createCompany(this._company).subscribe( result => {
                let company = new Company(null, "", true, "");
                Object.assign(company, result);
                this.uploadPicture(company).subscribe((image: Image) => {
                    company.image = image;
                    this.companyService.registerCEO(company);
                });

            }, () => {
                this.dialogService.showAlert("Let op!", "Er ging iets mis, probeer het later opnieuw.")
            });
        }
    }
}
