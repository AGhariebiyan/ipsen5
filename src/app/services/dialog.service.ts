import { Injectable } from "@angular/core";
import * as dialogs from "tns-core-modules/ui/dialogs" ;
@Injectable({
    providedIn: "root"
})
export class DialogService {

    showDialog(title: string, message: string){
        dialogs.alert({
            title,
            message,
            okButtonText: "Sluiten"
        });
    }

    showConfirm(title: string, message: string): Promise<boolean> {
        return new Promise<boolean>((accept, reject) => {

            dialogs.confirm({
                title,
                message,
                okButtonText: "Ja",
                cancelButtonText: "Nee"
            }).then(result => {
                if(result) {
                    accept();
                } else {
                    reject();
                }
            })

        });
    }

    showActions(title: string, message: string, actions: string[]): Promise<string> {
        return new Promise<string>((accept, reject) => {

            dialogs.action({
                title,
                message,
                actions,
                cancelButtonText: "Sluiten"
            }).then(result => {
                accept(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

}