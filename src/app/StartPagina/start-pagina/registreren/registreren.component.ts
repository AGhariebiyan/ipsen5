import { Component, OnInit } from "@angular/core";
import { Page } from "@nativescript/core/ui/page/page";
import { RegisterService } from "~/app/services/register.service";
import { first } from "rxjs/internal/operators";
import { Router } from "@angular/router";

@Component({
  selector: "ns-registreren",
  templateUrl: "./registreren.component.html",
  styleUrls: ["./registreren.component.css"]
})
export class RegistrerenComponent implements OnInit {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    repeatEmail: string;
    repeatPassword: string;
    dialogs = require("tns-core-modules/ui/dialogs");

    constructor(private page: Page, private registerService: RegisterService, private router: Router) {
      page.actionBarHidden = true;
    }

    ngOnInit(): void {
    }

    register(): void {
        if (!(this.isValidEmail(this.email) && this.isValidEmail(this.repeatEmail))) {
            this.showDialog("Ongeldig emailadres", "Het ingevoerde emailadres is ongeldig");

            return;
        } else if (this.email !== this.repeatEmail) {
            this.showDialog("Email komt niet overeen", "De 2 email adressen komen niet overeen");

            return;
        } else if (this.password !== this.repeatPassword) {
            this.showDialog("Wachtwoorden komen niet overeen", "De twee wachtwoorden komen niet overeen");

            return;
        } else if (!this.isValidPassword(this.password)) {
            this.showDialog("Wachtwoord ongeldig", "Het wachtwoord moet minimaal 8 tekens bevatten");

            return;
        } else if (!this.isValidName(this.firstName, this.middleName, this.lastName)) {
            this.showDialog("Ongeldige naam", "Deze naam is ongeldig");

            return;
        }

        this.registerService.register(this.email, this.password, this.firstName, this.lastName, this.middleName).subscribe(
            (data) => {
                this.router.navigate(["loggedIn"]);
            }, (error) => {

            }
        );
    }

    showDialog(title: string, message: string) {
        this.dialogs.alert({
            title,
            message,
            okButtonText: "Sluiten"
        });
    }

    isValidEmail(email: string) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(email);
    }

    // TODO implement better password logic?
    isValidPassword(password: string) {
        return password.length >= 8;
    }

    // Todo implement better name checking.
    isValidName(firstName: string, middleName: string, lastName: string) {
        return true;
    }}

