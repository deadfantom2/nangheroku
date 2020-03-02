import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  public type: string;
  public id: string;
  public cache: string = "cache";
  public notification = new EventEmitter();

  constructor() {
    console.log(this.cache);
    console.log("modal uplaods");
  }

  cacheModal() {
    this.cache = "cache";
    this.id = null;
    this.type = null;
  }

  afficheModal(type: string, id: string) {
    console.log("toto from on of modal service");
    this.cache = "";
    this.id = id;
    this.type = type;

    console.log(id);
    console.log(this.type);
    console.log(this.cache);
    console.log(this.notification);
  }
}
