import { Injectable } from "@angular/core";
import * as imagepiceker from "nativescript-imagepicker";
import { ImageAsset } from "@nativescript/core/image-asset";
import * as bghttp from "nativescript-background-http";
import { environment } from "~/environments/environment.tns";
import { Task } from "nativescript-background-http";
import { JwtService } from "~/app/services/jwt.service";
import { Observable, Subscriber } from "rxjs";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { AccountService } from "~/app/services/account.service";
import { tap } from "rxjs/internal/operators";
import { Account } from "~/app/models/Account.model";

export enum UploadStatus {
    PROGRESS,
    ERROR,
    RESPONDED,
    COMPLETE
}

export interface UploadResponse {
    state: UploadStatus;
    data: any;
}

@Injectable({
    providedIn: "root"
})

export class ImageService {

    constructor(private jwtService: JwtService,
                private accountService: AccountService) {
    }

    uploadProfilePicture(imageSrc: ImageAsset): Observable<UploadResponse> {
        const request = {
            url: environment.apiUrl + "/api/images/profile",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                Authorization : "Bearer " + this.jwtService.getToken()
            },
            description: "User profile picture"
        };

        return this.uploadPicture(imageSrc, request, "picture").pipe(
            tap((data) => {
                if (data.state === UploadStatus.RESPONDED) {
                    this.accountService.account.image = JSON.parse(data.data.data);
                    this.accountService.updateObservable(this.accountService.account);
                }
            })
        );
    }

    uploadCompanyProfilePicture(companyId: string, imageSrc: ImageAsset): Observable<UploadResponse> {
        const request = {
            url: environment.apiUrl + "/api/images/companies/" + companyId,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                Authorization : "Bearer " + this.jwtService.getToken()
            },
            description: "Company profile picture"
        };

        return this.uploadPicture(imageSrc, request, "picture");
    }

    selectSingleImage(): Promise<ImageAsset> {
        const context = imagepiceker.create({
            mode: "single"
        });

        return context.authorize().then(() => {
            return context.present();
        }).then((selection: ImageAsset[]) => {

            const imageSrc = selection.length > 0 ? selection[0] : null;

            return imageSrc;
        });
    }

    getCompanyImageUrl(id: string) {
        if (id !== null) {
            return environment.apiUrl + "/api/images/" + id;
        } else {
            return "~/assets/default-company-image.png";
        }
    }

    getUserImageUrl(id: string) {
        if (id !== null) {
            return environment.apiUrl + "/api/images/" + id;
        } else {
            return "~/assets/default-user-image.png";
        }
    }

    private uploadPicture(imageSrc: ImageAsset, request: any, fieldName): Observable<UploadResponse> {
        const session = bghttp.session("image-upload");

        let params;
        if (isAndroid) {
             params = [
                { name: fieldName, filename: imageSrc.android, mimeType: "image/*" }
            ];
        } else if (isIOS) {
            params = [
                { name: fieldName, filename: imageSrc.ios, mimeType: "image/*" }
            ];
        }

        const uploadStatus = new Observable<UploadResponse>((subscriber: Subscriber<UploadResponse>) => {
            let task: Task;
            task = session.multipartUpload(params, request);
            task.on("progress", () => subscriber.next({state: UploadStatus.PROGRESS, data: null}));
            task.on("error", () => subscriber.next({state: UploadStatus.ERROR, data: null}));
            task.on("responded", (data) => {
                subscriber.next({state: UploadStatus.RESPONDED, data});
            });
            task.on("complete", (data) => {
                subscriber.next({state: UploadStatus.COMPLETE, data});
            });

        });

        return uploadStatus;
    }
}
