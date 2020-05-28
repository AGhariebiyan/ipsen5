import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "~/app/StartPagina/start-pagina/register/register.component";
import { AppModule } from "~/app/app.module";

describe("Testing Registercomponent", () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ],
            imports: [
                AppModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("All fields should be empty after init component", () => {
        if (component.firstName !== "") { fail(); }
        if (component.lastName !== "") { fail(); }
        if (component.middleName !== "") { fail(); }
        if (component.email !== "") { fail(); }
        if (component.repeatEmail !== "") { fail(); }
        if (component.password !== "") { fail(); }
        if (component.repeatPassword !== "") { fail(); }
        if (component.firstName !== "") { fail(); }
    });

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
        if (component.firstName !== "") { fail(); }
    });

    it("Dialog should be present when emails do not match", () => {
        fillIn();
        component.repeatEmail = "another@gmail.com";
        component.register();
        if (component.email !== "") { fail(); }
        if (component.repeatEmail !== "") { fail(); }
    });

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
