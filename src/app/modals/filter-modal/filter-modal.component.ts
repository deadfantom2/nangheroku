import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  public property: string;
  public userValue: string;
  public users$: Observable<User[]>;

  constructor(public dialogRef: MatDialogRef<FilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.property = this.data.header;
    this.users$ = this.data.users;
  }

  public filterByProperty(property: string, name: string) {
    this.property = property
    this.userValue = name;
  }


  close() {
    this.dialogRef.close("Thanks for using me!");
  }

}
