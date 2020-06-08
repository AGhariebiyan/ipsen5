import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";
import { RegisterService } from "~/app/services/register/register.service";

@Component({
  selector: "ns-registreren",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
    firstName: string = "";
    middleName: string = "";
    lastName: string = "";
    email: string = "";
    password: string = "";
    repeatEmail: string = "";
    repeatPassword: string = "";
    dialogs = require("tns-core-modules/ui/dialogs");

    constructor(private page: Page, private registerService: RegisterService, private router: Router) {
      page.actionBarHidden = true;
    }

    ngOnInit(): void {
    }

    // Check if all requirements are met for a new user.
    register(): void {
        if (!(this.isValidEmail(this.email) && this.isValidEmail(this.repeatEmail))) {
            this.showDialog("Ongeldig emailadres", "Het ingevoerde emailadres is ongeldig");
            this.clearEmailFields();

            return;
        } else if (this.email !== this.repeatEmail) {
            this.showDialog("Email komt niet overeen", "De twee email adressen komen niet overeen");
            this.clearPasswordFields();
            this.clearEmailFields();

            return;
        } else if (this.password !== this.repeatPassword) {
            this.showDialog("Wachtwoorden komen niet overeen", "De twee wachtwoorden komen niet overeen");
            this.clearPasswordFields();

            return;
        } else if (!this.isValidPassword(this.password)) {
            this.showDialog("Wachtwoord ongeldig", "Het wachtwoord moet minimaal 8 tekens bevatten");
            this.clearPasswordFields();

            return;
        } else if (!this.isValidName(this.firstName, this.middleName, this.lastName)) {
            this.showDialog("Ongeldige naam", "Deze naam is ongeldig, de lengte van de voornaam een achternaam moet minimaal 2 zijn.");
            this.clearNameFields();

            return;
        }

        // Register the user.
        const x = this.registerService.register(this.email, this.password, this.firstName, this.lastName, this.middleName)
            .subscribe((data) => {
                console.log(data);
                this.dialogs.confirm({
                    title: "Je account is aangemaakt",
                    message: "Er is een mail gestuurd om je e-mail te verifieren.\nJe kan pas inloggen als je e-mail is geverifieerd.\nJe wordt naar de login pagina geleid.",
                    okButtonText: "Ok"
                });
                this.clearAllFields();
                this.router.navigate(["start", "login"]);
            }, (error) => {
                if (error.error.error === "Email already exists") {
                    this.clearEmailFields();
                    this.clearPasswordFields();
                    this.showDialog("Email adres al gebruikt    ", "Dit email adres is al in gebruik");
                }
            }
        );

    }

    clearPasswordFields() {
        this.password = "";
        this.repeatPassword = "";
    }

    clearEmailFields() {
        this.email = "";
        this.repeatEmail = "";
    }

    clearNameFields() {
        this.firstName = "";
        this.lastName = "";
        this.middleName = "";
    }

    clearAllFields() {
        this.clearPasswordFields();
        this.clearEmailFields();
        this.clearNameFields();
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
    isValidName(firstName: string, middleName: string, lastName: string): boolean {
        if (lastName.length  < 2) {
            return false;
        }
        if (firstName.length < 2) {
            return false;
        }

        return true;
    }
}
