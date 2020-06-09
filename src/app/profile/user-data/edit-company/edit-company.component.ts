import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CompanyService } from "~/app/services/company.service";
import { WorksAt } from "~/app/models/WorksAt.model";
import { ImageService, UploadResponse, UploadStatus } from "~/app/services/image.service";
import { RouterExtensions } from "nativescript-angular";
import { ImageAsset } from "@nativescript/core/image-asset/image-asset";
import { DialogService } from "~/app/services/dialog.service";
import { Image } from "~/app/models/image.model";

@Component({
  selector: "ns-edit-company",
  templateUrl: "./edit-company.component.html",
  styleUrls: ["./edit-company.component.css"]
})
export class EditCompanyComponent implements OnInit {

  worksAt: WorksAt;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private imageService: ImageService,
              private routerExtensions: RouterExtensions,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.worksAt = this.companyService.getWorksAt(params.id);
    });
  }

  editImage() {
    this.imageService.selectSingleImage().then((imageAsset: ImageAsset) => {
      this.dialogService.showConfirm(
          "Weet je het zeker?",
          "Weet je zeker dat je dit als afbeelding wilt?").then((confirmed) => {
        if (confirmed) {
          this.imageService.uploadCompanyProfilePicture(this.worksAt.company.id, imageAsset)
              .subscribe((data: UploadResponse) => {
            if (data.state === UploadStatus.RESPONDED) {
              console.log("Image data", data.data.data);
              this.worksAt.company.image = JSON.parse(data.data.data);
            } else if (data.state === UploadStatus.COMPLETE) {
              this.dialogService.showDialog("Succesvol bijgewerkt", `De afbeelding voor ${this.worksAt.company.name} is bijgewerkt.`);
            }
          });
        }
      });
    });
  }

  goBack() {
    this.routerExtensions.back();
  }
}
