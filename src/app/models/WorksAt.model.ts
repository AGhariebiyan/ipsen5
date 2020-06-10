import { Company } from "~/app/models/Company.model";
import { Role } from "~/app/models/role.model";

export class WorksAt {
   id: string;
   company: Company;
   account: Account;
   role: Role;
}
