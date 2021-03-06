import { Injectable } from "@angular/core";

@Injectable()
export class TableService {
  constructor() {}

  public getColumns(): object {
    return [
      { property: "name", text: "Name" },
      { property: "surname", text: "Surname" },
      { property: "age", text: "Age" },
      { property: "email", text: "Email" },
      { property: "roles", text: "Roles" },
      { property: "isVerified", text: "Activation" },
      { property: "socialAuth", text: "Sociale Auth" },
      { property: "createdAt", text: "Creation date" },
      { property: "", text: "Actions" }
    ];
  }
}
