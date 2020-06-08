import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "~/app/services/account.service";
import { DialogService } from "~/app/services/dialog.service";
import { RouterExtensions } from "@nativescript/angular/router";

@Component({
  selector: "ns-edit-email",
  templateUrl: "./edit-email.component.html",
  styleUrls: ["./edit-email.component.css"]
})
export class EditEmailComponent implements OnInit {

  form: FormGroup;

  constructor(private accountService: AccountService,
              private dialogService: DialogService,
              private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.accountService.account.email, [
          Validators.required,
          Validators.email
      ]),
      repeatEmail: new FormControl("")
    }, [
        this.emailMatchValidator
    ]);
  }

  emailMatchValidator(g: FormGroup) {
    return g.get("email").value === g.get("repeatEmail").value ? null : {mismatch: true};
  }

  submitForm() {
    this.dialogService.showConfirm(
        "Weet je het zeker",
        "Weet je zeker dat je deze gegevens wilt bijwerken?").then(() => {

      this.accountService.updateEmail(
        this.form.value.email).subscribe(() => {
          this.dialogService.showDialog("Succesvol bijgewerkt!", "Je email is succesvol bijgewerkt\n" +
              "Je wordt nu teruggeleid.");
          this.routerExtensions.back();
        }
      );
    });
  }

}
