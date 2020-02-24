import { Injectable } from "@angular/core";

@Injectable()
export class TableService {
  constructor() { }

  public getColumns(): Object {
    return [
      { property: "name", text: "Name" },
      { property: "surname", text: "Surname" },
      { property: "age", text: "Age" },
      { property: "email", text: "Email" },
      { property: "roles", text: "Roles" },
      { property: "isVerified", text: "Activation" },
      { property: "createdAt", text: "Creation date" },
      { property: "", text: "Actions" },
    ];
  }
}
