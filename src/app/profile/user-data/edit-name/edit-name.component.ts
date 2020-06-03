import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "~/app/services/account.service";
import { DialogService } from "~/app/services/dialog.service";
import { RouterExtensions } from "@nativescript/angular/router";

@Component({
  selector: "ns-edit-name",
  templateUrl: "./edit-name.component.html",
  styleUrls: ["./edit-name.component.css"]
})
export class EditNameComponent implements OnInit {

  form: FormGroup;

  constructor(private accountService: AccountService, private dialogService: DialogService, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.accountService.account.firstName, Validators.required),
      middleName: new FormControl(this.accountService.account.middleName),
      lastName: new FormControl(this.accountService.account.lastName, Validators.required)
    });
  }

  submitForm() {
    this.dialogService.showConfirm(
        "Weet je het zeker",
        "Weet je zeker dat je deze gegevens wilt bijwerken?").then(() => {

          this.accountService.updateName(
            this.form.value.firstName,
            this.form.value.lastName,
            this.form.value.middleName).subscribe(() => {
              this.dialogService.showDialog("Succesvol bijgewerkt!", "Je naam is succesvol bijgewerkt");
              this.routerExtensions.back();
        });
    });
  }
}
