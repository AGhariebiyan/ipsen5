import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { DialogService } from '../../../services/dialog.service';
import { AuthenticationService } from '../../../services/authentication.service';



export const samePassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.value.password;
    const password2 = control.value.password2;

    return  password === password2 ? { 'validated': true } : null;
};

@Component({
  selector: 'ns-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

    password: string;
    password2: string;

    form: FormGroup;

    constructor(private accountService: AccountService, private dialogService: DialogService, private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            password: new FormControl(this.password,[
                Validators.required,
                Validators.minLength(8)]),
            password2: new FormControl(this.password2, Validators.required)
        });
    }

    submitForm() {
        this.dialogService.showConfirm(
            "Weet je het zeker",
            "Weet je zeker dat je je wachtwoord wilt wijzigen?").then(() => {

                this.accountService.updatePassword(
                    this.form.value.password).subscribe(() => {
                        this.dialogService.showDialog("Je wachtwoord is succesvol gewijzigd", "Je wordt uitgelogd");
                        this.authService.logout();
                    });
            });
    }

}
