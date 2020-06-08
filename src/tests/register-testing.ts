import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "~/app/StartPagina/start-pagina/register/register.component";
import { AppModule } from "~/app/app.module";
import { RegisterService } from "~/app/services/register/register.service";
import { TestingRegisterService } from "~/app/services/register/testing-register.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "~/environments/environment.tns";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpClientModule } from "@angular/common/http";

describe("Testing Registercomponent", () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    // tslint:disable-next-line:prefer-const
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
               AppModule,
                HttpClientTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /**
     * Standard test to see if the component  gets created.
     */
    it("should create", () => {
        expect(component).toBeTruthy();
    });

    /**
     * Test to see if all fields are empty at initiation of the component.
     */
    it("All fields should be empty after init component", () => {
        if (component.firstName !== "") { fail(); }
        if (component.lastName !== "") { fail(); }
        if (component.middleName !== "") { fail(); }
        if (component.email !== "") { fail(); }
        if (component.repeatEmail !== "") { fail(); }
        if (component.password !== "") { fail(); }
        if (component.repeatPassword !== "") { fail(); }
    });

    /**
     * Test to see if all fields are emptry after using emptyAll()
     */
    it("Every field should be empty after calling emptyAll", () => {
        fillIn();
        component.clearAllFields();
        if (component.firstName !== "") { fail(); }
        if (component.lastName !== "") { fail(); }
        if (component.middleName !== "") { fail(); }
        if (component.email !== "") { fail(); }
        if (component.repeatEmail !== "") { fail(); }
        if (component.password !== "") { fail(); }
        if (component.repeatPassword !== "") { fail(); }
    });

    /**
     * Check to see if systems catches 2 different emails.
     */
    it("email field should be cleared when emails do not match", () => {
        fillIn();
        component.repeatEmail = "another@gmail.com";
        component.register();
        if (component.email !== "") { fail(); }
        if (component.repeatEmail !== "") { fail(); }
    });

    /**
     * Test to see if the system catches short names.
     */
    it("Firstname and lastname should not be allowed to have one char length", () => {
       fillIn();
       component.firstName = "A";
       component.lastName = "B";
       component.register();
       if (component.firstName !== "") { fail(); }
       if (component.lastName !== "") { fail(); }
       if (component.middleName !== "") { fail(); }

    });

    /**
     * Test to see if the system catches different passwords.
     */
    it("Password field should be cleared when passwords do not match", () => {
        fillIn();
        component.repeatPassword = "iuieuriuei";
        component.register();
        if (component.password !== "") { fail(); }
        if (component.repeatPassword !== "") { fail(); }
    });

    /**
     * Test to see if the system catches too short of a password.
     */
    it("Password fields should be cleared when password is too short", () => {
        fillIn();
        component.password = "1234567";
        component.repeatPassword = "1234567";
        component.register();
        if (component.password !== "") { fail(); }
        if (component.repeatPassword !== "") { fail(); }
    });

    /**
     * Test to see if when the correct arguments are given, the system will navigate to login.
     */
    it("Should navigate to login", inject([Router], (router: Router) => {
        spyOn(router, "navigate").and.stub();
        fillIn();
        httpMock = TestBed.get(HttpTestingController);
        component.register();
        const registerRequest = httpMock.expectOne(environment.apiUrl + "/api/auth/register");
        registerRequest.flush(null, {status: 201, statusText: "Succes"});
        expect(router.navigate).toHaveBeenCalledWith(["start", "login"]);
    }));

    /**
     * Test to check if the system catches used email address.
     */
    it("Should error when email is in use", () => {
       fillIn();
       httpMock = TestBed.get(HttpTestingController);
       component.register();
       const registerRequest = httpMock.expectOne(environment.apiUrl + "/api/auth/register");
       registerRequest.flush({
                error: "Email already exists"
            },
            {status: 400, statusText: "Bad Request"});

       if (component.email !== "") { fail(); }
       if (component.repeatEmail !== "") { fail(); }
    });

    /**
     * Test to see if the system catches invalid email.
     */
    it("Should clear email fields when they are invalid", () => {
        fillIn();
        component.email = "oetzelive.nl";
        component.repeatEmail = "oetzelive.nl";
        component.register();
        if (component.email !== "") { fail(); }
        if (component.repeatEmail !== "") { fail(); }
    });

    /**
     * Function to fill in all fields with correct data;
     */
    function fillIn() {
        component.email = "oetze@live.nl";
        component.repeatEmail = "oetze@live.nl";
        component.password = "12345678";
        component.repeatPassword = "12345678";
        component.firstName = "Oetze";
        component.middleName = "van den";
        component.lastName = "Broek";
    }

});
