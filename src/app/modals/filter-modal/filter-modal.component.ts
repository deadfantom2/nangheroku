import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/_models/user";
import { ModalService } from "src/app/_services";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.component.html",
  styleUrls: ["./filter-modal.component.scss"]
})
export class FilterModalComponent implements OnInit {
  @Input("users") users$: Observable<User[]>;

  public propertyHeader: string;
  public userValue: string;
  // public users$: Observable<User[]>;

  constructor(private _modal: ModalService) {}

  ngOnInit() {
    console.log(this.users$);
    //   this.propertyHeader = this.data.header;
    //   this.users$ = this.data.users;
  }

  // public filterByProperty(property: string, user: string) {
  //   console.log(property, user)
  //   this.propertyHeader = property
  //   this.userValue = user;
  // }

  // close() {
  //   this.dialogRef.close("Thanks for using me!");
  // }

  // submit(e) {
  //   console.log(e)
  // }

  fermerModal() {
    console.log("dfd");
    this._modal.cacheModal();
  }
}
