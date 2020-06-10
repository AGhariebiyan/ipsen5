import { Image } from "~/app/models/image.model";

export class Company {
    id: string;
    image: Image;
    name: string;
    active: boolean;
    address: string;
}
