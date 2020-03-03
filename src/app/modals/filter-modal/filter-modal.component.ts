import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/_models/user";
import { ModalService } from "src/app/_services";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.component.html",
  styleUrls: ["./filter-modal.component.scss"]
})
export class FilterModalComponent implements OnInit {
  @Input("users") public users$: Observable<User[]>;
  @Input() public property: string;

  @Output() public filterByHeader = new EventEmitter<object>();
  @Output() public submitFilter = new EventEmitter<any>();

  constructor(public _modal: ModalService) {}

  ngOnInit() {}

  public filterByProperty(property: string, user: User): void {
    this.filterByHeader.emit({ property: property, user: user });
    this.closeModal();
  }

  public filter(event: any): void {
    // this.submitFilter.emit(event);
  }

  public closeModal(): void {
    this._modal.close();
  }
}
