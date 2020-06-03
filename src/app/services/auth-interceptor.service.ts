import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { JwtService } from "~/app/services/jwt.service";

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private jwtService: JwtService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.jwtService.getToken();
        if (token != null) {
            const modifiedRequest = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });

            return next.handle(modifiedRequest);
        }

        return next.handle(req);
    }

}
