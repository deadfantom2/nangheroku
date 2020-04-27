import { Component, OnInit, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent implements OnInit {
  @Input("validator-type") type: AbstractControl; // getEmail or getPassword

  @Input() minSize: String; // 11 or 4
  @Input() maxSize: String; // 50 or 100

  @Input("message-type") message: String; // Email or Password or Name or Surname etc...

  constructor() {}

  ngOnInit(): void {}
}
