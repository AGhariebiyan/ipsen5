import { Company } from "~/app/models/Company.model";
import { Role } from "~/app/models/role.model";

export class WorksAt {
   id: string;
   company: Company;
   account: Account;
   role: Role;
   accepted: boolean;

   constructor(company, account, role, accepted) {
      this.company = company;
      this.account = account;
      this.role = role;
      this.accepted = accepted;
   }

}
