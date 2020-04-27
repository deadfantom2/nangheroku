import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/_models/user";
import { ModalService } from "src/app/_services";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.component.html",
  styleUrls: ["./filter-modal.component.scss"],
})
export class FilterModalComponent implements OnInit {
  @Input("users") public users$: Observable<User[]>;
  @Input() public property: string;

  @Output() public filterByHeader = new EventEmitter<object>();
  @Output() public submitFilter = new EventEmitter<any>();

  constructor(public _modal: ModalService) {}

  ngOnInit() {
    // console.log("users$: ", this.users$);
  }

  public filterByProperty(event: any, property: string): void {
    console.log(event, property);
    this.filterByHeader.emit({
      property: property,
      userPropertyValue: this._getActiveChekboxContent(event.target.elements),
    });
    this.closeModal();
  }

  public _getActiveChekboxContent(checkboxes: any) {
    console.log("checkboxes1: ", checkboxes);
    console.log(
      "checkboxes2: ",
      [...checkboxes]
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)
    );
    return [...checkboxes]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
  }

  public closeModal(): void {
    this._modal.close();
  }
}
