import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CompanyService } from "~/app/services/company.service";
import { WorksAt } from "~/app/models/WorksAt.model";
import { ImageService, UploadResponse, UploadStatus } from "~/app/services/image.service";
import { RouterExtensions } from "nativescript-angular";
import { ImageAsset } from "@nativescript/core/image-asset/image-asset";
import { DialogService } from "~/app/services/dialog.service";
import { Image } from "~/app/models/image.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Company } from "~/app/models/Company.model";
import { compareNumbers } from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: "ns-edit-company",
  templateUrl: "./edit-company.component.html",
  styleUrls: ["./edit-company.component.css"]
})
export class EditCompanyComponent implements OnInit {

  roleForm: FormGroup;
  companyForm: FormGroup;
  worksAt: WorksAt;
  editingRole: boolean = false;
  editingCompany: boolean = false;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private imageService: ImageService,
              private routerExtensions: RouterExtensions,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.worksAt = this.companyService.getWorksAt(params.id);
      this.createRoleForm();
      this.createCompanyForm();
    });

  }

  createRoleForm() {
    this.roleForm = new FormGroup({
      jobDescription: new FormControl(this.worksAt.role.title)
    });
  }

  createCompanyForm() {
    this.companyForm = new FormGroup({
      companyName: new FormControl(this.worksAt.company.name, [
        Validators.required
      ])
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

  toggleEditRole() {
    this.editingRole = !this.editingRole;
  }

  toggleEditCompany() {
    this.editingCompany = !this.editingCompany;
    console.log("Changed editing company to: ", this.editingCompany);
  }

  goBack() {
    this.routerExtensions.back();
  }

  saveRole() {
    this.worksAt.role.title = this.roleForm.value.jobDescription;
    this.companyService.updateJobDescription(this.worksAt).subscribe(() => {
      this.dialogService.showDialog("Succesvol bijgewerkt", "Succesvol bijgewerkt");
      this.editingRole = false;
      this.editingCompany = false;
    });
  }

  saveCompany() {
    const company: Company = this.worksAt.company;
    company.name = this.companyForm.value.companyName;
    this.companyService.updateCompany(company).subscribe(() => {
      this.dialogService.showDialog("Succesvol bijgewerkt", "Succesvol bijgewerkt");
      this.editingRole = false;
      this.editingCompany = false;
    }, (error) => {
      this.dialogService.showDialog("Something went wrong", error);
    });
  }

  deleteCompany(id: string) {
    this.dialogService.showConfirm("Weet je zeker",
        "Het verwijderen van een bedrijf kan niet ongedaan worden gemaakt!\n Alle werknemers worden verwijderd.").then((accept: boolean) => {
          if (accept) {
            this.companyService.deleteCompany(id).subscribe((data) => {
                this.dialogService.showDialog("Bedrijf verwijderd", "Het bedrijf is verwijderd");
                this.routerExtensions.back();
            }, (error) => {
                this.dialogService.showAlert("Mislukt", "Het is niet gelukt het bedrijf te verwijdern");
            });
          }
    });
  }
}
