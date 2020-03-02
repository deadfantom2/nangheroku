import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  @Input('users') users$: Observable<User[]>;

  public propertyHeader: string;
  public userValue: string;
  // public users$: Observable<User[]>;

  constructor(
    // public dialogRef: MatDialogRef<FilterModalComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.users$)
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

}
