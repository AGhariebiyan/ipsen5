import { Component, OnInit } from "@angular/core";
import { ImageAsset } from "@nativescript/core/image-asset/image-asset";
import { ImageService, UploadResponse, UploadStatus } from "~/app/services/image.service";
import { DialogService } from "~/app/services/dialog.service";
import { AccountService } from "~/app/services/account.service";

@Component({
  selector: "ns-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.css"]
})
export class OptionsComponent implements OnInit {

  constructor(private imageService: ImageService,
              private dialogService: DialogService,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

  selectImage() {
    this.imageService.selectSingleImage().then((image: ImageAsset) => {
      this.dialogService.showConfirm("Weet je het zeker", "Weet je zeker dat je deze foto als profielfoto wilt instellen?").then((result: boolean) => {
        this.imageService.uploadProfilePicture(image).subscribe((status: UploadResponse) => {
          if (status.state === UploadStatus.COMPLETE) {
            this.dialogService.showDialog("Succesvol bijgewerkt", "Je profielfoto is bijgewerkt");
          } else if (status.state === UploadStatus.ERROR) {
            this.dialogService.showDialog("Er ging iets mis", "Je profielfoto kon niet worden bijgewerkt");
          }
        });
      });
    });
  }
}
