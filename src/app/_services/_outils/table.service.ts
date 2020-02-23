import { Injectable } from "@angular/core";

@Injectable()
export class TableService {
  constructor() {}

  public getColumns(): string[] {
    return ["name", "surname", "age", "email", "roles", "actions"];
  }
}
