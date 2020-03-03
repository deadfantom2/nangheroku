import { Injectable } from "@angular/core";

@Injectable()
export class ModalService {

  public type: string;
  public header: string;
  public cache: string = "cache";

  constructor() {
  }

  public open(header: string, type: string): void {
    this.type = type;
    this.header = header;
    this.cache = "";
  }

  public close(): void {
    this.type = null;
    this.header = null;
    this.cache = "cache";
  }

}
