import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  data: String;

  constructor() { }

  ngOnInit(): void {
    this.data = "DATA FROM USER-EDIT COMPONENT"
  }

}
