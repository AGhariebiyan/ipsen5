import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "~/app/services/account.service";
import { DialogService } from "~/app/services/dialog.service";
import { RouterExtensions } from "@nativescript/angular/router";

@Component({
  selector: "ns-edit-bio",
  templateUrl: "./edit-bio.component.html",
  styleUrls: ["./edit-bio.component.css"]
})
export class EditBioComponent implements OnInit {

  form: FormGroup;

  constructor(private accountService: AccountService, private dialogService: DialogService, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl(this.accountService.account.description ? this.accountService.account.description : "", [])
    });
  }

  submitForm() {
    if (this.form.value.description === "") {
      this.dialogService.showConfirm("Je hebt niks ingevuld",
          "weet je zeker dat je je bio leeg wilt maken?").then(() => {
            this.update();
      });
    } else {
      this.dialogService.showConfirm(
          "Weet je het zeker",
          "Weet je zeker dat je deze gegevens wilt bijwerken?").then(() => {

          this.update();
      });
    }

  }

  private update() {
    console.log("Current bio", this.form.value.description);
    this.accountService.updateBio(
        this.form.value.description).subscribe(() => {
          this.dialogService.showDialog("Succesvol bijgewerkt!", "Je bio is succesvol bijgewerkt\n" +
              "Je wordt nu naar login omgeleid.");
          this.routerExtensions.back();
        }
    );
  }

}
